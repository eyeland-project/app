import {
	View,
	StyleSheet,
	AccessibilityInfo,
	Platform
} from 'react-native';
import Instructions from '../components/Instructions';
import Option from '@screens/Task/components/Option';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Haptics from 'expo-haptics';
import Modal from '@screens/Task/components/Modal';
import LottieView from 'lottie-react-native';
import Pressable from '@components/Pressable';

import useTextToSpeech from '@hooks/useTextToSpeech';
import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface';
import { useEffect, useRef, useState } from 'react';
import usePlaySound from '@hooks/usePlaySound';
import usePreTask from '@app/core/hooks/Task/PreTask/usePreTask';

interface Props {
	route: any;
}

const AudioMultipleChoice = ({ route }: Props) => {
	const { question } = route.params as { question: PreTaskQuestion };
	const [containerStyleOptions, setContainerStyleOptions] = useState([{}]);
	const [textStyleOptions, setTextStyleOptions] = useState([{}]);
	const [showModal, setShowModal] = useState(false);
	const [optionIndex, setOptionIndex] = useState<number>(0);
	const theme = useTheme();
	const playSoundSuccess = usePlaySound(require('@sounds/success.wav'));
	const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'));
	const { nextQuestion } = usePreTask();
	const { speak: speakQuestion, playing: playingQuestion } = useTextToSpeech();
	const { speak: speakOption, playing: playingOption } = useTextToSpeech();
	const animationRef = useRef<LottieView>(null);
	const styles = getStyles(theme);
	const currentPlatform = Platform.OS;

	const toggleAnimation = () => {
		if (playingQuestion) {
			animationRef.current?.play();
		} else {
			animationRef.current?.pause();
			animationRef.current?.reset();
		}
	};

	const onPressOption = (index: number, correct: boolean) => {
		setOptionIndex(index);
		speakOption(question.options[index].content);
		const newContainerStyleOptions = [...containerStyleOptions];
		const newTextStyleOptions = [...textStyleOptions];

		const color = correct ? theme.colors.green : theme.colors.red;
		playSound(correct);
		newContainerStyleOptions[index] = { backgroundColor: color };
		newTextStyleOptions[index] = { color: theme.colors.white };

		if (!correct) {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
		}

		setContainerStyleOptions(newContainerStyleOptions);
		setTextStyleOptions(newTextStyleOptions);

		if (correct) {
			nextQuestion();
		} else {
			setShowModal(true);
			resetContainerStyleOptions();
		}
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const playSound = (correct: boolean) => {
		if (correct) {
			playSoundSuccess();
		} else {
			playSoundWrong();
		}
	};

	const onPressPlayAudio = () => {
		speakQuestion(question.content, 'en');
	};

	const resetContainerStyleOptions = () => {
		setTimeout(() => {
			setContainerStyleOptions([{}]);
		}, 1000);
	};

	useEffect(() => {
		AccessibilityInfo.announceForAccessibility(question.content);
		speakQuestion(question.content, 'en');
	}, []);

	useEffect(() => {
		toggleAnimation();
	}, [playingQuestion]);

	return (
		<>
			<View style={styles.container}>
				<Instructions text="Selecciona la opción correcta" />
				<Pressable onPress={onPressPlayAudio}>
					{
						currentPlatform === 'web' ? (
							<LottieView
								source={require('@animations/audioButton.json')}
								loop
								style={styles.animation}
								ref={animationRef}
							/>
						) : (
							<AntDesign
								name="sound"
								size={100}
								color={theme.colors.black}
								style={styles.animation}
							/>
						)
					}
				</Pressable>
				<View style={styles.optionsContainer}>
					{question.options.map((option, index) => (
						<Option
							key={index}
							text={option.content}
							onPress={() => {
								onPressOption(index, option.correct);
							}}
							containerStyle={containerStyleOptions[index]}
							textStyle={textStyleOptions[index]}
						/>
					))}
				</View>
			</View>
			<Modal
				showModal={showModal}
				closeModal={closeModal}
				help={question.options[optionIndex].feedback}
			/>
		</>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			height: '100%'
		},
		animation: {
			width: 200,
			height: 200,
			alignSelf: 'center',
			marginTop: 20
		},
		optionsContainer: {
			marginTop: 60
		},
		question: {
			fontSize: theme.fontSize.xxl,
			color: theme.colors.black,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium,
			marginHorizontal: 20
		}
	});

export default AudioMultipleChoice;
