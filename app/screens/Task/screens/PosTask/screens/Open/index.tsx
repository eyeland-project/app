import * as Haptics from 'expo-haptics';

import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';

import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import History from '@app/screens/Task/components/History';
import LoadingModal from '@app/screens/Task/components/LoadingModal';
import Modal from '@app/screens/Task/components/Modal';
import ButtonPrimary from '@components/ButtonPrimary';
import { PosTaskQuestion } from '@app/shared/interfaces/PosTaskQuestion.interface';
import Pressable from '@app/shared/components/Pressable';
import Record from '@app/screens/Task/components/Record';
import { Theme } from '@app/theme';
import Title from './components/Title';
import usePlaySound from '@app/core/hooks/usePlaySound';
import usePosTask from '@app/core/hooks/Task/PosTask/usePosTask';
import useRecord from '@app/core/hooks/Task/PosTask/useRecord';
import useTaskContext from '@app/core/hooks/Task/useTaskContext';
import useTheme from '@app/core/hooks/useTheme';
import useTime from '@app/core/hooks/useTime';

interface Props {
	route: any;
}
enum AnswerType {
	TEXT = 'TEXT',
	VOICE = 'VOICE'
}

const CONFIRM_TEXT_STYLE_DEFAULT = (theme: Theme) => {
	return {
		fontFamily: theme.fontWeight.regular,
		fontSize: theme.fontSize.xl
	};
};

const Open = ({ route }: Props) => {
	const { question } = route.params as { question: PosTaskQuestion };
	const { startTimer, stopTimer, time } = useTime();
	const theme = useTheme();
	const [confirmContainerStyle, setConfirmContainerStyle] = useState({});
	const [confirmTextStyle] = useState(CONFIRM_TEXT_STYLE_DEFAULT(theme));
	const [recording, setRecording] = useState<string>();
	const [recorded, setRecorded] = useState(false);
	const { taskOrder } = useTaskContext();
	const { nextQuestion, sendPosTaskAnswer, loading } = usePosTask();
	const playSoundSuccess = usePlaySound(require('@sounds/success.wav'));
	const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'));
	const [answerType, setAnswerType] = useState<AnswerType>();
	const [textArea, setTextArea] = useState<string>('');
	const [showModal, setShowModal] = useState(false);
	const [hasConfirm, setHasConfirm] = useState(false);
	const { stopAudio } = useRecord();
	const styles = getStyles(theme);

	const putAnswerType = (type: AnswerType) => {
		setAnswerType(type);
		if (type === AnswerType.TEXT) setRecorded(true);
	};

	const onPressConfirm = () => {
		setHasConfirm(true);
	};

	const resetStates = () => {
		setTimeout(() => {
			setConfirmContainerStyle({});
		}, 1000);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const sendAnswer = async () => {
		stopTimer();
		await sendPosTaskAnswer({
			taskOrder,
			questionOrder: question.questionOrder,
			body: {
				answerSeconds: time,
				audioUri: recording,
				text: textArea
			}
		});
		nextQuestion();
	};

	const onChangeAnswerType = () => {
		setAnswerType(undefined);
		setRecorded(false);
		setTextArea('');
		setHasConfirm(false);
		setRecording(undefined);
	};

	useEffect(() => {
		if (hasConfirm) {
			if (answerType === AnswerType.TEXT) {
				if (textArea.length > 0) {
					playSoundSuccess();
					setConfirmContainerStyle({
						backgroundColor: theme.colors.green
					});
					sendAnswer();
				} else {
					playSoundWrong();
					setConfirmContainerStyle({
						backgroundColor: theme.colors.red
					});
					Haptics.notificationAsync(
						Haptics.NotificationFeedbackType.Error
					);
					setHasConfirm(false);
					setShowModal(true);
					resetStates();
				}
			} else {
				stopAudio();
				playSoundSuccess();
				setConfirmContainerStyle({
					backgroundColor: theme.colors.green
				});
				sendAnswer();
			}
		}
	}, [hasConfirm]);

	useEffect(() => {
		startTimer();
	}, []);

	return (
		<>
			<ScrollView style={styles.container}>
				<History
					history={question.content}
					character={question.character}
				/>
				<View style={{ flexDirection: 'column-reverse' }}>
					{answerType ? (
						<>
							{answerType === AnswerType.TEXT ? (
								<>
									<View>
										<View
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'center'
											}}
										>
											<Pressable
												// style={styles.chooseButton}
												accessible={true}
												accessibilityLabel="Cambiar modo de respuesta"
												accessibilityRole="button"
												onPress={onChangeAnswerType}
												style={{ marginLeft: 20 }}
											>
												<FontAwesome5
													name="exchange-alt"
													size={50}
													color="black"
													accessible={false}
												/>
											</Pressable>
											<View style={{ flexGrow: 1 }}>
												<ButtonPrimary
													text="Confirmar"
													accessibilityHint="Confirmar"
													onPress={onPressConfirm}
													containerStyle={
														confirmContainerStyle
													}
													textStyle={confirmTextStyle}
												/>
											</View>
										</View>
										<View style={styles.safeSpace} />
									</View>
									<View style={styles.writeContainer}>
										<TextInput
											multiline={true}
											numberOfLines={8}
											onChangeText={(text) =>
												setTextArea(text)
											}
											value={textArea}
											style={styles.textArea}
										/>
									</View>
								</>
							) : (
								<>
									{recorded && (
										<ButtonPrimary
											text="Confirmar"
											accessibilityHint="Confirmar"
											onPress={onPressConfirm}
											containerStyle={
												confirmContainerStyle
											}
											textStyle={confirmTextStyle}
										/>
									)}
									<View style={styles.recordContainer}>
										<Pressable
											// style={styles.chooseButton}
											accessible={true}
											accessibilityLabel="Cambiar modo de respuesta"
											accessibilityRole="button"
											onPress={onChangeAnswerType}
											style={{ marginLeft: 0 }}
										>
											<FontAwesome5
												name="exchange-alt"
												size={50}
												color="black"
												accessible={false}
											/>
										</Pressable>
										<Record
											blocked={false}
											minimumTime={5000}
											setRecorded={setRecorded}
											setRecording={setRecording}
											maximumTime={60000}
										/>
										<View style={{ width: 40 }}></View>
									</View>
								</>
							)}
						</>
					) : (
						<View style={styles.answerContainer}>
							<Pressable
								style={styles.chooseButton}
								accessible={true}
								accessibilityLabel="Responder con voz"
								// accessibilityHint="Presiona para responder con voz"
								accessibilityRole="button"
								onPress={() => putAnswerType(AnswerType.VOICE)}
							>
								<FontAwesome5
									name="microphone"
									size={60}
									color="white"
									accessible={false}
								/>
							</Pressable>
							<Pressable
								style={styles.chooseButton}
								accessible={true}
								accessibilityLabel="Responder con texto"
								// accessibilityHint="Presiona para responder con texto"
								accessibilityRole="button"
								onPress={() => putAnswerType(AnswerType.TEXT)}
							>
								<Entypo name="pencil" size={60} color="white" />
							</Pressable>
						</View>
					)}
					<Title hint={question.hint} />
				</View>
			</ScrollView>
			<Modal
				showModal={showModal}
				closeModal={() => {
					closeModal();
				}}
				help={'No puedes dejar el campo vacío'}
			/>
			<LoadingModal showModal={loading} closeModal={() => {}} />
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
		answerContainer: {
			flexDirection: 'row',
			justifyContent: 'center'
		},
		chooseButton: {
			backgroundColor: theme.colors.darkGreen,
			borderRadius: theme.borderRadius.full,
			width: 130,
			height: 130,
			justifyContent: 'center',
			alignItems: 'center',
			marginHorizontal: 10,
			...theme.shadow
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
		recordContainer: {
			backgroundColor: theme.colors.white,
			justifyContent: 'center',
			alignItems: 'center',
			display: 'flex',
			flexDirection: 'row'
		},
		textArea: {
			backgroundColor: theme.colors.white,
			borderColor: theme.colors.black,
			borderWidth: 1,
			borderRadius: theme.borderRadius.medium,
			width: '90%',
			flex: 1,
			marginBottom: 20,
			marginHorizontal: 20,
			marginTop: -120,
			padding: 10,
			textAlignVertical: 'top',
			textAlign: 'left',
			fontSize: theme.fontSize.medium,
			color: theme.colors.black,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium
		},
		writeContainer: {
			backgroundColor: theme.colors.white,
			flex: 1,
			justifyContent: 'space-between'
		},
		safeSpace: {
			height: 70
		}
	});

export default Open;
