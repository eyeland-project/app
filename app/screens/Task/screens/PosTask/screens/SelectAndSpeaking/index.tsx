import { View, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import Record from '@app/screens/Task/components/Record';
import QuestionComponent from './components/Question';
import Option from '@app/screens/Task/components/Option';
import Title from './components/Title';
import LoadingModal from '@app/screens/Task/components/LoadingModal';

import { useEffect, useState } from 'react';
import useTheme from '@hooks/useTheme';
import useTime from '@hooks/useTime';
import useTaskContext from '@app/core/hooks/Task/useTaskContext';
import useRecord from '@app/core/hooks/Task/PosTask/useRecord';

import { Theme } from '@theme';
import { PosTaskQuestion } from '@app/shared/interfaces/PosTaskQuestion.interface';
import usePosTask from '@app/core/hooks/Task/PosTask/usePosTask';
import usePlaySound from '@app/core/hooks/usePlaySound';

interface Props {
	route: any;
}

const CONFIRM_TEXT_STYLE_DEFAULT = (theme: Theme) => {
	return {
		fontFamily: theme.fontWeight.regular,
		fontSize: theme.fontSize.xl
	};
};

const SelectAndSpeaking = ({ route }: Props) => {
	const { question } = route.params as { question: PosTaskQuestion };
	const theme = useTheme();
	const styles = getStyles(theme);
	const [answered, setAnswered] = useState(false);
	const [idOptionSelected, setIdOptionSelected] = useState<number>(1);
	const { taskOrder } = useTaskContext();
	const { nextQuestion, sendPosTaskAnswer, loading } = usePosTask();
	const { startTimer, stopTimer, time } = useTime();
	const [confirmContainerStyle, setConfirmContainerStyle] = useState({});
	const [confirmTextStyle, setConfirmTextStyle] = useState(
		CONFIRM_TEXT_STYLE_DEFAULT(theme)
	);
	const playSoundSuccess = usePlaySound(require('@sounds/success.wav'));
	const { stopAudio } = useRecord();
	const [recorded, setRecorded] = useState(false);
	const [hasConfirm, setHasConfirm] = useState(false);
	const [recording, setRecording] = useState<string>();


	const handlePressConfirm = async () => {
		if (hasConfirm) return;
		if (!answered) return;
		if (!recorded) return;

		setHasConfirm(true);
		playSoundSuccess();
		setConfirmContainerStyle({ backgroundColor: theme.colors.green });
		stopAudio();
		await sendPosTaskAnswer({
			taskOrder,
			questionOrder: question.questionOrder,
			body: {
				idOption: idOptionSelected,
				answerSeconds: time,
				audioUri: recording,
			}
		});
		nextQuestion();

	}

	useEffect(() => {
		if (answered) {
			ToastAndroid.show('Pregunta contestada, ahora debes grabarte diciendo la pregunta y la respuesta', ToastAndroid.SHORT);
		}
	}, [answered]);

	useEffect(() => {
		startTimer();
	}, []);

	return (
		<>
			<ScrollView style={styles.container}>
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
						minimumTime={5000}
						setRecorded={setRecorded}
						setRecording={setRecording}
					/>
				</View>
				{recorded && (
					<View>
						<Option
							text="Confirmar"
							onPress={() => {
								handlePressConfirm();
							}}
							containerStyle={confirmContainerStyle}
							textStyle={confirmTextStyle}
						/>
						<View style={styles.safeSpace} />
					</View>
				)}
			</ScrollView>
			<LoadingModal
				showModal={loading}
				closeModal={() => { }}
			/>
		</>
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
		},
		safeSpace: {
			height: 80
		}
	});

export default SelectAndSpeaking;
