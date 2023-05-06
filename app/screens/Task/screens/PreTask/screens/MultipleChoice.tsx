import {
	View,
	Text,
	StyleSheet,
	AccessibilityInfo,
	Image,
} from 'react-native';
import Instructions from '../components/Instructions';
import Option from '@screens/Task/components/Option';
import * as Haptics from 'expo-haptics';
import Modal from '@screens/Task/components/Modal';

import useTextToSpeech from '@hooks/useTextToSpeech';
import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface';
import { useEffect, useState } from 'react';
import usePlaySound from '@hooks/usePlaySound';
import usePreTask from '@app/core/hooks/Task/PreTask/usePreTask';

interface Props {
	route: any;
}

const MultipleChoice = ({ route }: Props) => {
	const { question } = route.params as { question: PreTaskQuestion };
	const [containerStyleOptions, setContainerStyleOptions] = useState([{}]);
	const [textStyleOptions, setTextStyleOptions] = useState([{}]);
	const [showModal, setShowModal] = useState(false);
	const [optionIndex, setOptionIndex] = useState<number>(0);
	const [loadingImage, setLoadingImage] = useState(true);
	const [errorImage, setErrorImage] = useState(false);
	const playSoundSuccess = usePlaySound(require('@sounds/success.wav'));
	const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'));
	const { nextQuestion } = usePreTask();
	const { speak } = useTextToSpeech();
	const theme = useTheme();
	const styles = getStyles(theme);

	const onPressOption = (index: number, correct: boolean) => {
		setOptionIndex(index);
		speak(question.options[index].content);
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

	const resetContainerStyleOptions = () => {
		setTimeout(() => {
			setContainerStyleOptions([{}]);
		}, 1000);
	};

	useEffect(() => {
		AccessibilityInfo.announceForAccessibility(question.content);
		speak(question.content, 'es');
	}, []);

	return (
		<>
			<View style={styles.container}>
				<Instructions text="Selecciona la opción correcta" />
				<Text style={styles.question}>{question.content}</Text>
				<View style={styles.imageContainer}>
					{/* {loadingImage && <ActivityIndicator size="large" color={theme.colors.black} />}
					{errorImage && <Text style={styles.errorMessage}>Un error inesperado ha ocurrido</Text>} */}
					<Image
						style={styles.image}
						source={{ uri: question.imgUrl }}
						resizeMode="contain"
						accessible
						accessibilityLabel={question.imgAlt}
					// onLoadStart={() => setLoadingImage(true)}
					// onLoadEnd={() => setLoadingImage(false)}
					// onError={() => {
					// 	setLoadingImage(false);
					// 	setErrorImage(true);
					// }}
					/>
				</View>

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
			marginTop: 60
		},
		question: {
			fontSize: theme.fontSize.xxl,
			color: theme.colors.black,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium,
			marginHorizontal: 20
		},
		errorMessage: {
			fontSize: theme.fontSize.large,
			color: theme.colors.red,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium,
			textAlign: 'center',
			marginTop: 20
		},
	});

export default MultipleChoice;
