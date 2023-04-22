import { View, Text, StyleSheet, AccessibilityInfo } from 'react-native'
import Instructions from '../../components/Instructions'
import OptionTask from '@screens/Task/components/Option'
import * as Haptics from 'expo-haptics'
import Option from './components/Option'
import AnswerBox from './components/AnswerBox'
import Modal from '@screens/Task/components/Modal'
import LottieView from 'lottie-react-native';
import Pressable from '@components/Pressable'
import { AntDesign } from '@expo/vector-icons';

import { useEffect, useRef, useState } from 'react'
import useTheme from '@hooks/useTheme'
import usePlaySound from '@hooks/usePlaySound'
import usePreTask from '@hooks/usePreTask'
import useTextToSpeech from '@app/core/hooks/useTextToSpeech'

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

const AudioOrder = ({ route }: Props) => {
    const { question } = route.params as { question: PreTaskQuestion, taskOrder: number }
    const theme = useTheme()
    const [allOptionsInBox, setAllOptionsInBox] = useState(false)
    const [confirmContainerStyle, setConfirmContainerStyle] = useState({})
    const [confirmTextStyle, setConfirmTextStyle] = useState(CONFIRM_TEXT_STYLE_DEFAULT(theme))
    const [optionsList, setOptionsList] = useState([] as string[])
    const [answerList, setAnswerList] = useState([] as string[])
    const [showModal, setShowModal] = useState(false)
    const playSoundSuccess = usePlaySound(require('@sounds/success.wav'))
    const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'))
    const { speak, playing } = useTextToSpeech()
    const { nextQuestion } = usePreTask()
    const animationsRef = useRef<LottieView[]>([]);
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
            setShowModal(true)
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
        speak(optionsList[index])
        setAnswerList([...answerList, optionsList[index]])
        setOptionsList(optionsList.filter((_, i) => i !== index))

        if (answerList.length + 1 === correctOrder.length) {
            setAllOptionsInBox(true)
        }
    }

    const onPressPlayAudio = () => {
        speak(question.content, 'en')
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const toggleAnimation = () => {
        if (playing) {
            animationsRef.current?.forEach((animation) => animation.play());
        } else {
            animationsRef.current?.forEach((animation) => animation.pause());
            animationsRef.current?.forEach((animation) => animation.reset());
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
        AccessibilityInfo.announceForAccessibility(question.content)
        speak(question.content, 'en')
    }, [])

    useEffect(() => {
        toggleAnimation()
    }, [playing])

    return (
        <>
            <View style={getStyles(theme).container}>
                <View>
                    <Instructions text='Traduce organizando las palabras en el orden correcto' />
                    <Pressable style={getStyles(theme).playerContainer} onPress={onPressPlayAudio}>
                        <AntDesign name="caretright" size={30} color={theme.colors.black} />
                        <View style={getStyles(theme).animationContainer}>
                            {
                                [...Array(4)].map((_, index) => {
                                    return (
                                        <LottieView
                                            key={index}
                                            ref={(animation) => {
                                                if (animation) animationsRef.current[index] = animation;
                                            }}
                                            source={require('@animations/audioWave.json')}
                                            loop={false}
                                            style={getStyles(theme).animation}
                                        />
                                    )
                                })
                            }
                        </View>
                    </Pressable>
                    {/* <Text style={getStyles(theme).question}>{question.content}</Text> */}
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
            <Modal showModal={showModal} closeModal={() => { closeModal() }} help={correctOrder.join(' ')} />
        </>
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
            ...theme.shadow,
        },
        animationContainer: {
            flexDirection: 'row',
        },
        animation: {
            height: 72,
        }
    })

export default AudioOrder