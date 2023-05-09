import { View, StyleSheet, AccessibilityInfo, Platform } from 'react-native';
import Instructions from '../../components/Instructions';
import OptionTask from '@screens/Task/components/Option';
import * as Haptics from 'expo-haptics';
import Option from './components/Option';
import AnswerBox from './components/AnswerBox';
import Modal from '@screens/Task/components/Modal';
import LottieView from 'lottie-react-native';
import Pressable from '@components/Pressable';
import { AntDesign } from '@expo/vector-icons';

import { useEffect, useRef, useState } from 'react';
import useTheme from '@hooks/useTheme';
import usePlaySound from '@hooks/usePlaySound';
import usePreTask from '@hooks/Task/PreTask/usePreTask';
import useTextToSpeech from '@hooks/useTextToSpeech';
import useMediaQuery from '@hooks/useMediaQuery';

import { Theme } from '@theme';
import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface';

import { shuffleList } from '@utils/shuffleList';

interface Props {
	route: any;
}

const CONFIRM_TEXT_STYLE_DEFAULT = (theme: Theme) => {
	return {
		fontFamily: theme.fontWeight.regular,
		fontSize: theme.fontSize.xl
	};
};

const AudioOrder = ({ route }: Props) => {
	const { question } = route.params as {
		question: PreTaskQuestion;
		taskOrder: number;
	};
	const theme = useTheme();
	const [allOptionsInBox, setAllOptionsInBox] = useState(false);
	const [confirmContainerStyle, setConfirmContainerStyle] = useState({});
	const [confirmTextStyle, setConfirmTextStyle] = useState(
		CONFIRM_TEXT_STYLE_DEFAULT(theme)
	);
	const [optionsList, setOptionsList] = useState([] as string[]);
	const [answerList, setAnswerList] = useState([] as string[]);
	const [showModal, setShowModal] = useState(false);
	const playSoundSuccess = usePlaySound(require('@sounds/success.wav'));
	const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'));
	const { speak: speakOption, playing: playingOption } = useTextToSpeech();
	const { speak: speakQuestion, playing: playingQuestion } = useTextToSpeech();
	const { nextQuestion } = usePreTask();
	const animationsRef = useRef<LottieView[]>([]);
	const currentPlatform = Platform.OS;
	const { isPhone, isTablet, isDesktop } = useMediaQuery();
	const styles = getStyles(theme);
	const correctOrder = question.options
		.filter((option) => option.correct)[0]
		.content.split(' ');

	const onPressConfirm = () => {
		const isCorrect = answerList.every(
			(answer, index) => answer.toLowerCase() === correctOrder[index].toLowerCase()
		);

		if (isCorrect) {
			playSoundSuccess();
			setConfirmContainerStyle({ backgroundColor: theme.colors.green });
			nextQuestion();
		} else {
			playSoundWrong();
			setConfirmContainerStyle({ backgroundColor: theme.colors.red });
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			setShowModal(true);
			resetStates();
		}
	};

	const resetStates = () => {
		setTimeout(() => {
			setOptionsList(shuffleList(correctOrder));
			setAnswerList([]);
			setConfirmContainerStyle({});
			setAllOptionsInBox(false);
		}, 1000);
	};

	const onPressOption = (index: number) => {
		speakOption(optionsList[index]);
		setAnswerList([...answerList, optionsList[index]]);
		setOptionsList(optionsList.filter((_, i) => i !== index));

		if (answerList.length + 1 === correctOrder.length) {
			setAllOptionsInBox(true);
		}
	};

	const onPressPlayAudio = () => {
		speakQuestion(question.content, 'en');
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const toggleAnimation = () => {
		if (playingQuestion) {
			animationsRef.current?.forEach((animation) => animation.play());
		} else {
			animationsRef.current?.forEach((animation) => animation.pause());
			animationsRef.current?.forEach((animation) => animation.reset());
		}
	};

	const onAnswerPress = (index: number) => {
		setOptionsList([...optionsList, answerList[index]]);
		setAnswerList(answerList.filter((_, i) => i !== index));
		setAllOptionsInBox(false);
	};

	useEffect(() => {
		setOptionsList(shuffleList(correctOrder));
		setAnswerList([]);
		AccessibilityInfo.announceForAccessibility(question.content);
		speakQuestion(question.content, 'en');
	}, []);

	useEffect(() => {
		toggleAnimation();
	}, [playingQuestion]);

	return (
		<>
			<View style={styles.container}>
				<View>
					<Instructions text="Escucha y selecciona las palabras en el orden correcto" />
					<Pressable
						style={styles.playerContainer}
						onPress={onPressPlayAudio}
					>
						<AntDesign
							name="caretright"
							size={30}
							color={theme.colors.black}
						/>
						<View style={styles.animationContainer}>
							{
								currentPlatform !== 'web' && (
									[...Array(isPhone ? 4 : isTablet ? 8 : 16)].map((_, index) => {
										return (
											<LottieView
												key={index}
												ref={(animation) => {
													if (animation)
														animationsRef.current[index] =
															animation;
												}}
												source={require('@animations/audioWave.json')}
												loop={false}
												style={styles.animation}
											/>
										);
									})
								)
							}
						</View>
					</Pressable>
					{/* <Text style={styles.question}>{question.content}</Text> */}
					<AnswerBox
						answerList={answerList}
						onAnswerPress={onAnswerPress}
					/>
					<View style={styles.optionsContainer}>
						{optionsList.map((option, index) => {
							return (
								<Option
									key={index}
									text={option}
									onPress={() => {
										onPressOption(index);
									}}
								/>
							);
						})}
					</View>
				</View>
				{allOptionsInBox && (
					<View>
						<OptionTask
							text="Confirmar"
							onPress={() => {
								onPressConfirm();
							}}
							containerStyle={confirmContainerStyle}
							textStyle={confirmTextStyle}
						/>
						<View style={styles.safeSpace} />
					</View>
				)}
			</View>
			<Modal
				showModal={showModal}
				closeModal={() => {
					closeModal();
				}}
				help={correctOrder.join(' ')}
			/>
		</>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			height: '100%',
			justifyContent: 'space-between'
		},
		imageContainer: {
			marginHorizontal: 20,
			height: 200,
			borderRadius: theme.borderRadius.medium,
			overflow: 'hidden'
		},
		image: {
			width: '100%',
			height: '100%'
		},
		optionsContainer: {
			marginTop: 30,
			flexDirection: 'row',
			marginHorizontal: 20,
			flexWrap: 'wrap'
		},
		question: {
			fontSize: theme.fontSize.xxl,
			color: theme.colors.black,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium,
			marginHorizontal: 20
		},
		separator: {
			width: 10
		},
		safeSpace: {
			height: 80
		},
		playerContainer: {
			height: 55,
			backgroundColor: theme.colors.white,
			borderRadius: theme.borderRadius.medium,
			marginBottom: 20,
			marginHorizontal: 20,
			paddingHorizontal: 10,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			...theme.shadow
		},
		animationContainer: {
			flexDirection: 'row'
		},
		animation: {
			height: 72
		}
	});

export default AudioOrder;
