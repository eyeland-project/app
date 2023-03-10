import { View, ImageBackground, StyleSheet } from 'react-native'
import PositionBar from './components/PositionBar'
import Query from './components/Query'
import Option from '@screens/Task/components/Option'
import Placeholder from './components/Placeholder'

import { useState, useEffect } from 'react'
import useTheme from '@hooks/useTheme'
import usePlaySound from '@hooks/usePlaySound'
import useTime from '@hooks/useTime'
import useDuringTaskQuestion from '@hooks/useDuringTaskQuestion'
import { useDuringTaskContext } from '@hooks/useDuringTaskContext'
import { useNavigation } from '@react-navigation/native'
import useDuringTask from '@hooks/useDuringTask'
import { SocketEvents } from '@enums/SocketEvents.enum'


import { Theme } from '@theme'

interface Props {
    route: any
}

const Question = ({ route }: Props) => {
    const { taskOrder, questionOrder } = route.params
    const theme = useTheme()
    const navigation = useNavigation<any>()
    const [containerStyleOptions, setContainerStyleOptions] = useState([{}])
    const [textStyleOptions, setTextStyleOptions] = useState([{}])
    const playSoundSuccess = usePlaySound(require('@sounds/success.wav'))
    const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'))
    const { time, startTimer, stopTimer } = useTime()
    const { data, loading, error, getDuringTaskQuestion, sendDuringTaskAnswer } = useDuringTaskQuestion()
    const { power, socket } = useDuringTaskContext()
    const { getDuringTask, data: generalData } = useDuringTask()

    const onPressOption = async (index: number, correct: boolean, id: number) => {
        const newContainerStyleOptions = [...containerStyleOptions]
        const newTextStyleOptions = [...textStyleOptions]

        if (correct) {
            playSoundSuccess()
            stopTimer()
            newContainerStyleOptions[index] = { backgroundColor: theme.colors.green }
            newTextStyleOptions[index] = { color: theme.colors.white }
        } else {
            playSoundWrong()
            newContainerStyleOptions[index] = { backgroundColor: theme.colors.red }
            newTextStyleOptions[index] = { color: theme.colors.white }
        }

        setContainerStyleOptions(newContainerStyleOptions)
        setTextStyleOptions(newTextStyleOptions)

        const [_, { numQuestions }] = await Promise.all([
            sendDuringTaskAnswer({ taskOrder, questionOrder, body: { idOption: id, answerSeconds: time } }),
            getDuringTask({ taskOrder })
        ])

        if (questionOrder === numQuestions) {
            navigation.reset({
                index: 0,
                routes: [
                    { name: 'Introduction', params: { taskOrder } },
                ]
            })
        } else {
            navigation.push('Question', { taskOrder, questionOrder: questionOrder + 1 })
        }
    }

    const initQuestion = async () => {
        await getDuringTaskQuestion({ taskOrder, questionOrder })
        startTimer()
        // TODO - set progress bar
    }

    useEffect(() => {
        initQuestion()

        socket.once(SocketEvents.teamStudentAnswer, async (data: any) => {
            await getDuringTask({ taskOrder })

            if (questionOrder === generalData?.numQuestions) {
                navigation.reset({
                    index: 0,
                    routes: [
                        { name: 'Introduction', params: { taskOrder } },
                        { name: 'PosTask', params: { taskOrder } }
                    ]
                })
            } else {
                navigation.navigate('Question', { taskOrder, questionOrder: questionOrder + 1 })
            }
        })
    }, [])

    if (loading || !data) return <Placeholder />

    return (
        <View style={getStyles(theme).container}>
            {/* TODO - make events for position change */}
            {/* <PositionBar groupName='Ocelots' position={5} /> */}
            <View style={{ flexDirection: 'column-reverse' }}>
                <View style={getStyles(theme).imageContainer}>
                    <ImageBackground style={getStyles(theme).image} source={{ uri: data.imgUrl }} />
                </View>
                <Query text={data.content} power={power} nounTranslation={data.nounTranslation[0]} prepositionTranslation={data.prepositionTranslation[0]} />
            </View>
            <View style={getStyles(theme).optionsContainer}>
                <Option
                    text={data.options[0].content}
                    onPress={() => {
                        onPressOption(0, data.options[0].correct, data.options[0].id)
                    }}
                    ContainerStyle={containerStyleOptions[0]}
                    textStyle={textStyleOptions[0]}
                />
                <Option
                    text={data.options[1].content}
                    onPress={() => {
                        onPressOption(1, data.options[1].correct, data.options[1].id)
                    }}
                    ContainerStyle={containerStyleOptions[1]}
                    textStyle={textStyleOptions[1]}
                />
            </View>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: '100%',
        },
        imageContainer: {
            marginHorizontal: 20,
            height: 200,
            borderRadius: theme.borderRadius.medium,
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        optionsContainer: {
            marginTop: 40,
        }
    })


export default Question