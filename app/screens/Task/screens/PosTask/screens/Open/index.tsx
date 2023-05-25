import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import History from '@app/screens/Task/components/History'
import Title from './components/Title'
import * as Haptics from 'expo-haptics';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Pressable from '@app/shared/components/Pressable'
import Record from '@app/screens/Task/components/Record';
import Option from '@app/screens/Task/components/Option';
import Modal from '@app/screens/Task/components/Modal';

import useTheme from '@app/core/hooks/useTheme'
import useTextToSpeech from '@app/core/hooks/useTextToSpeech';
import usePlaySound from '@app/core/hooks/usePlaySound';
import usePosTask from '@app/core/hooks/Task/PosTask/usePosTask';
import { useEffect, useState } from 'react'
import useTaskContext from '@app/core/hooks/Task/useTaskContext';
import useTime from '@app/core/hooks/useTime'

import { Theme } from '@app/theme'
import { PosTaskQuestion } from '@app/shared/interfaces/PosTaskQuestion.interface';

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
    const [duration, setDuration] = useState<number | null>(null);
    const { startTimer, stopTimer, time } = useTime();
    const theme = useTheme()
    const [confirmContainerStyle, setConfirmContainerStyle] = useState({});
    const [confirmTextStyle, setConfirmTextStyle] = useState(
        CONFIRM_TEXT_STYLE_DEFAULT(theme)
    );
    const [recording, setRecording] = useState<string>();
    const [recorded, setRecorded] = useState(false);
    const { speak } = useTextToSpeech();
    const { taskOrder } = useTaskContext();
    const { nextQuestion, sendPosTaskAnswer } = usePosTask();
    const playSoundSuccess = usePlaySound(require('@sounds/success.wav'));
    const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'));
    const [answerType, setAnswerType] = useState<AnswerType>();
    const [textArea, setTextArea] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const styles = getStyles(theme)

    const putAnswerType = (type: AnswerType) => {
        setAnswerType(type);
        if (type === AnswerType.TEXT) setRecorded(true);
    }

    const onPressConfirm = () => {
        if (answerType === AnswerType.TEXT) {
            if (textArea.length > 0) {
                playSoundSuccess();
                setConfirmContainerStyle({ backgroundColor: theme.colors.green });
                sendAnswer();
            } else {
                playSoundWrong();
                setConfirmContainerStyle({ backgroundColor: theme.colors.red });
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                setShowModal(true);
                resetStates();
            }
        } else {
            playSoundSuccess();
            setConfirmContainerStyle({ backgroundColor: theme.colors.green });
            sendAnswer();
        }
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

    useEffect(() => {
        startTimer();
    }, [])

    return (
        <>
            <ScrollView style={styles.container}>
                <History history={question.content} character={question.character} />
                <View style={{ flexDirection: 'column-reverse' }}>
                    {
                        answerType ? (
                            <>
                                {
                                    recorded && (
                                        <View>
                                            <Option
                                                text="Confirmar"
                                                onPress={() => {
                                                    onPressConfirm();
                                                }}
                                                containerStyle={confirmContainerStyle}
                                                textStyle={confirmTextStyle}
                                            />
                                            <View style={styles.safeSpace} />
                                        </View>
                                    )
                                }
                                {
                                    answerType === AnswerType.TEXT ? (
                                        <View style={styles.writeContainer}>
                                            <TextInput
                                                multiline={true}
                                                numberOfLines={4}
                                                onChangeText={(text) => setTextArea(text)}
                                                value={textArea}
                                                style={styles.textArea}
                                            />
                                        </View>
                                    ) : (
                                        <View style={styles.recordContainer}>
                                            <Record
                                                blocked={false}
                                                minimumTime={5000}
                                                setRecorded={setRecorded}
                                                setRecording={setRecording}
                                            />
                                        </View>
                                    )


                                }
                            </>
                        ) : (
                            <View style={styles.answerContainer}>
                                <Pressable
                                    style={styles.chooseButton}
                                    accessible={true}
                                    accessibilityLabel="Responder con voz"
                                    accessibilityHint="Presiona para responder con voz"
                                    accessibilityRole="button"
                                    onPress={() => putAnswerType(AnswerType.VOICE)}
                                >
                                    <FontAwesome5
                                        name='microphone'
                                        size={60}
                                        color={'white'}
                                        accessible={false}
                                    />
                                </Pressable>
                                <Pressable
                                    style={styles.chooseButton}
                                    accessible={true}
                                    accessibilityLabel="Responder con texto"
                                    accessibilityHint="Presiona para responder con texto"
                                    accessibilityRole="button"
                                    onPress={() => putAnswerType(AnswerType.TEXT)}
                                >
                                    <Entypo
                                        name="pencil"
                                        size={60}
                                        color="white"
                                    />
                                </Pressable>
                            </View>
                        )
                    }
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
        </>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.white,
            height: '100%',
            flex: 1
        },
        answerContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
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
            alignItems: 'center'
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
            letterSpacing: theme.spacing.medium,
        },
        writeContainer: {
            backgroundColor: theme.colors.white,
            flex: 1,
            justifyContent: 'space-between',
        },
        safeSpace: {
            height: 70
        }
    })

export default Open