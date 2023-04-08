import { View, Text, StyleSheet } from 'react-native'
import Record from './components/Record'
import QuestionComponent from './components/Question'
import Title from './components/Title'
import Placeholder from './components/Placeholder'

import { useEffect, useState } from 'react'
import useTheme from '@hooks/useTheme'
import useRecord from '@hooks/useRecord'
import { useNavigation } from '@react-navigation/native'
import usePosTask from '@hooks/usePosTask'
import usePosTaskQuestion from '@hooks/usePosTaskQuestion'
import useTime from '@hooks/useTime'
import useTaskContext from '@hooks/useTaskContext'
import { usePosTaskContext } from '@hooks/usePosTaskContext'

import { Theme } from '@theme'

interface Props {
    route: any
}


const Question = ({ route }: Props) => {
    const { taskOrder, questionOrder } = route.params
    const theme = useTheme()
    const { recording, done, finished, startRecording, stopRecording } = useRecord()
    const [duration, setDuration] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);
    const [idOptionSelected, setIdOptionSelected] = useState<number>(1);
    const navigation = useNavigation<any>();
    const { data, loading, error, getPosTaskQuestion, sendPosTaskAnswer } = usePosTaskQuestion();
    const { startTimer, stopTimer, time } = useTime();
    const { setIcon, setProgress } = useTaskContext();
    const { numQuestions } = usePosTaskContext();
    const { data: generalData, getPosTask } = usePosTask();

    const handleOnPress = () => {
        if (recording) {
            stopRecording()
        } else {
            startRecording()
        }
    }

    const getTime = async () => {
        const status = await recording?.getStatusAsync()
        setDuration(status?.durationMillis ?? null);
    }

    useEffect(() => {
        const sendAnswer = async () => {
            if (done) {
                stopTimer();

                await sendPosTaskAnswer({ taskOrder, questionOrder, body: { answerSeconds: time, idOption: idOptionSelected } });

                if (questionOrder === numQuestions) {
                    navigation.reset({
                        index: 1,
                        routes: [
                            { name: 'Complete' },
                        ]
                    })
                } else {
                    if (numQuestions) setProgress((questionOrder + 1) / numQuestions);
                    navigation.reset({
                        index: 1,
                        routes: [
                            { name: 'Question', params: { taskOrder: taskOrder, questionOrder: questionOrder + 1 } }
                        ]
                    })
                }
            }
        }

        sendAnswer();
    }, [done])

    useEffect(() => {
        const initQuestion = async () => {
            await getPosTaskQuestion({ taskOrder, questionOrder })
            startTimer();
            setIcon('closecircle')
        }

        initQuestion();
    }, [questionOrder])

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
        }
    }, [recording]);

    if (!data) return <Placeholder />;

    return (
        <View style={getStyles(theme).container}>
            <QuestionComponent question={data} setAnswered={setAnswered} setIdOptionSelected={setIdOptionSelected} answered={answered} />
            <Title />
            <View style={getStyles(theme).secondaryContainer}>
                <Record
                    blocked={!answered}
                    recording={recording}
                    done={done}
                    finished={finished}
                    onPress={handleOnPress}
                />
                <Text style={getStyles(theme).subtitle}>
                    {
                        recording && `Grabando... ${Math.floor((duration as number) / 1000)} segundos`
                    }
                </Text>
            </View>
            <View></View>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: '100%',
            flex: 1,
        },
        subtitle: {
            color: theme.colors.black,
            fontSize: theme.fontSize.small,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
            textAlign: 'center',
            width: 250,
            marginHorizontal: 20,
            marginTop: 30,
        },
        secondaryContainer: {
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })

export default Question