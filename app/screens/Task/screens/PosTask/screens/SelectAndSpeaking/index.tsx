import { View, Text, StyleSheet, AccessibilityInfo } from 'react-native';
import Record from './components/Record';
import QuestionComponent from './components/Question';
import Title from './components/Title';

import { useEffect, useState } from 'react';
import useTheme from '@hooks/useTheme';
import useRecord from '@app/core/hooks/Task/PosTask/useRecord';
import useTime from '@hooks/useTime';
import useTaskContext from '@app/core/hooks/Task/useTaskContext';
import useTextToSpeech from '@app/core/hooks/useTextToSpeech';

import { Theme } from '@theme';
import { PosTaskQuestion } from '@app/shared/interfaces/PosTaskQuestion.interface';
import usePosTask from '@app/core/hooks/Task/PosTask/usePosTask';

interface Props {
	route: any;
}

const SelectAndSpeaking = ({ route }: Props) => {
	const { question } = route.params as { question: PosTaskQuestion };
	const { recording, done, finished, startRecording, stopRecording, audioUri } =
		useRecord();
	const [duration, setDuration] = useState<number | null>(null);
	const [answered, setAnswered] = useState(false);
	const [idOptionSelected, setIdOptionSelected] = useState<number>(1);
	const { taskOrder } = useTaskContext();
	const { speak } = useTextToSpeech();
	const { nextQuestion, sendPosTaskAnswer } = usePosTask();
	const { startTimer, stopTimer, time } = useTime();
	const theme = useTheme();
	const styles = getStyles(theme);

	const handleOnPress = async () => {
		if (recording) {
			await stopRecording(5000);
		} else {
			await startRecording();
		}
	};

	const getTime = async () => {
		const status = await recording?.getStatusAsync();
		setDuration(status?.durationMillis ?? null);
	};

	useEffect(() => {
		const sendAnswer = async () => {
			if (done) {
				stopTimer();

				await sendPosTaskAnswer({
					taskOrder,
					questionOrder: question.questionOrder,
					body: {
						idOption: idOptionSelected,
						answerSeconds: time,
						audioUri,
					}
				});
				nextQuestion();
			}
		};

		sendAnswer();
	}, [done]);

	useEffect(() => {
		startTimer();
	}, []);

	useEffect(() => {
		let intervalId: NodeJS.Timeout | null = null;
		if (recording) {
			getTime();
			intervalId = setInterval(() => {
				getTime();
			}, 1000);
		}
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [recording]);

	return (
		<View style={styles.container}>
			<QuestionComponent
				question={question}
				setAnswered={setAnswered}
				setIdOptionSelected={setIdOptionSelected}
				answered={answered}
			/>
			<Title />
			<View style={styles.secondaryContainer}>
				<Record
					blocked={!answered}
					recording={recording}
					done={done}
					finished={finished}
					onPress={handleOnPress}
				/>
				<Text style={styles.subtitle}>
					{recording &&
						`Grabando... ${Math.floor(
							(duration as number) / 1000
						)} segundos`}
				</Text>
			</View>
			<View></View>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			height: '100%',
			flex: 1
		},
		subtitle: {
			color: theme.colors.black,
			fontSize: theme.fontSize.small,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium,
			textAlign: 'center',
			width: 250,
			marginHorizontal: 20,
			marginTop: 30
		},
		secondaryContainer: {
			backgroundColor: theme.colors.white,
			justifyContent: 'center',
			alignItems: 'center'
		}
	});

export default SelectAndSpeaking;
