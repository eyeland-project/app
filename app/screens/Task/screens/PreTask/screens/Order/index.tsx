import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import Instructions from '../../components/Instructions'
import OptionTask from '@screens/Task/components/Option'
import * as Haptics from 'expo-haptics'
import Option from './components/Option'
import AnswerBox from './components/AnswerBox'

import { useEffect, useState } from 'react'
import useTheme from '@hooks/useTheme'
import usePlaySound from '@hooks/usePlaySound'
import usePreTask from '@hooks/usePreTask'

import { Theme } from '@theme'
import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface'

import { shuffleList } from '@utils/shuffleList'

interface Props {
    route: any
}

const CONFIRM_TEXT_STYLE_DEFAULT = (theme: Theme) => {
    return {
        fontFamily: theme.fontWeight.regular,
        fontSize: theme.fontSize.xl
    }
}

const Order = ({ route }: Props) => {
    const { question } = route.params as { question: PreTaskQuestion, taskOrder: number }
    const theme = useTheme()
    const [allOptionsInBox, setAllOptionsInBox] = useState(false)
    const [confirmContainerStyle, setConfirmContainerStyle] = useState({})
    const [confirmTextStyle, setConfirmTextStyle] = useState(CONFIRM_TEXT_STYLE_DEFAULT(theme))
    const [optionsList, setOptionsList] = useState([] as string[])
    const [answerList, setAnswerList] = useState([] as string[])
    const playSoundSuccess = usePlaySound(require('@sounds/success.wav'))
    const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'))
    const { nextQuestion } = usePreTask()
    const correctOrder = question.options
        .filter((option) => option.correct)[0].content
        .split(' ')

    const onPressConfirm = () => {
        const isCorrect = answerList.every((answer, index) => answer === correctOrder[index])

        if (isCorrect) {
            playSoundSuccess()
            setConfirmContainerStyle({ backgroundColor: theme.colors.green })
            nextQuestion()
        } else {
            playSoundWrong()
            setConfirmContainerStyle({ backgroundColor: theme.colors.red })
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
            resetStates()
        }
    }

    const resetStates = () => {
        setTimeout(() => {
            setOptionsList(shuffleList(correctOrder))
            setAnswerList([])
            setConfirmContainerStyle({})
            setAllOptionsInBox(false)
        }, 1000)
    }

    const onPressOption = (index: number) => {
        setAnswerList([...answerList, optionsList[index]])
        setOptionsList(optionsList.filter((_, i) => i !== index))

        if (answerList.length + 1 === correctOrder.length) {
            setAllOptionsInBox(true)
        }
    }

    const onAnswerPress = (index: number) => {
        setOptionsList([...optionsList, answerList[index]])
        setAnswerList(answerList.filter((_, i) => i !== index))
        setAllOptionsInBox(false)
    }

    useEffect(() => {
        setOptionsList(shuffleList(correctOrder))
        setAnswerList([])
    }, [])

    return (
        <View style={getStyles(theme).container}>
            <View>
                <Instructions text='Traduce organizando las palabras en el orden correcto' />
                <Text style={getStyles(theme).question}>{question.content}</Text>
                <AnswerBox answerList={answerList} onAnswerPress={onAnswerPress} />
                <View style={getStyles(theme).optionsContainer}>
                    {optionsList.map((option, index) => {
                        return (
                            <Option
                                key={index}
                                text={option}
                                onPress={() => {
                                    onPressOption(index)
                                }}
                            />
                        )
                    })}
                </View>
            </View>
            {
                allOptionsInBox &&
                <View>
                    <OptionTask text='Confirmar' onPress={() => { onPressConfirm() }} containerStyle={confirmContainerStyle} textStyle={confirmTextStyle} />
                    <View style={getStyles(theme).safeSpace} />
                </View>
            }
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: '100%',
            justifyContent: 'space-between',
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
            marginTop: 30,
            flexDirection: 'row',
            marginHorizontal: 20,
            flexWrap: 'wrap',
        },
        question: {
            fontSize: theme.fontSize.xxl,
            color: theme.colors.black,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
            marginHorizontal: 20,
        },
        separator: {
            width: 10,
        },
        safeSpace: {
            height: 80,
        }
    })

export default Order