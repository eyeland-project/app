import * as Haptics from 'expo-haptics';

import {
	AccessibilityInfo,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { useEffect, useState } from 'react';

import Instructions from '../components/Instructions';
import LoadingModal from '@app/screens/Task/components/LoadingModal';
import Option from '@screens/Task/components/Option';
import { PosTaskQuestion } from '@interfaces/PosTaskQuestion.interface';
import { Theme } from '@theme';
import usePlaySound from '@hooks/usePlaySound';
import usePosTask from '@hooks/Task/PosTask/usePosTask';
import useTaskContext from '@hooks/Task/useTaskContext';
import useTextToSpeech from '@hooks/useTextToSpeech';
import useTheme from '@hooks/useTheme';
import useTime from '@hooks/useTime';

interface Props {
	route: any;
}

const FillBlank = ({ route }: Props) => {
	const { question } = route.params as { question: PosTaskQuestion };
	const [containerStyleOptions, setContainerStyleOptions] = useState([{}]);
	const [textStyleOptions, setTextStyleOptions] = useState([{}]);
	const [blank, setBlank] = useState('       ');
	const [optionIndex, setOptionIndex] = useState<number>(0);
	const theme = useTheme();
	const { taskOrder } = useTaskContext();
	const playSoundSuccess = usePlaySound(require('@sounds/success.wav'));
	const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'));
	const { nextQuestion, sendPosTaskAnswer, loading } = usePosTask();
	const { speak } = useTextToSpeech();
	const { startTimer, stopTimer, time } = useTime();
	const styles = getStyles(theme);

	const afterBlank = question.content.split('_').slice(1).join('_');
	const beforeBlank = question.content.split('_')[0];

	const questionList = [beforeBlank, afterBlank];

	const onPressOption = (id: number, index: number, correct: boolean) => {
		setOptionIndex(index);
		speak(question.options[index].content);
		const newContainerStyleOptions = [...containerStyleOptions];
		const newTextStyleOptions = [...textStyleOptions];
		const color = correct ? theme.colors.green : theme.colors.red;
		playSound(correct);
		newContainerStyleOptions[index] = { backgroundColor: color };
		newTextStyleOptions[index] = { color: theme.colors.white };
		setBlank(question.options[index].content);
		if (!correct) {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
		}
		setContainerStyleOptions(newContainerStyleOptions);
		setTextStyleOptions(newTextStyleOptions);
		if (correct) {
			setTimeout(async () => {
				await sendPosTaskAnswer({
					taskOrder,
					questionOrder: question.questionOrder,
					body: {
						idOption: id,
						answerSeconds: time
					}
				});
				nextQuestion();
			}, 1000);
		} else {
			resetContainerStyleOptions();
		}
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
			setBlank('       ');
		}, 1000);
	};

	useEffect(() => {
		AccessibilityInfo.announceForAccessibility(question.content);
		speak(question.content.split('_'));
	}, []);

	useEffect(() => {
		startTimer();
	}, []);

	return (
		<>
			<ScrollView style={styles.container}>
				<Instructions text="Selecciona la opción correcta para completar la frase" />
				<Text style={styles.question}>
					{questionList[0]}
					<Text style={styles.underlineText}>{blank}</Text>
					{questionList[1]}
				</Text>
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
								onPressOption(option.id, index, option.correct);
							}}
							containerStyle={containerStyleOptions[index]}
							textStyle={textStyleOptions[index]}
						/>
					))}
				</View>
			</ScrollView>
			<LoadingModal showModal={loading} closeModal={() => {}} />
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
		line: {
			backgroundColor: theme.colors.black,
			height: 2,
			width: 50,
			borderRadius: theme.borderRadius.medium
		},
		underlineText: {
			textDecorationLine: 'underline'
		},
		errorMessage: {
			fontSize: theme.fontSize.large,
			color: theme.colors.red,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium,
			textAlign: 'center',
			marginTop: 20
		}
	});

export default FillBlank;
