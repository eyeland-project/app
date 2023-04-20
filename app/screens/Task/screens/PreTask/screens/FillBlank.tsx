import { View, Text, StyleSheet, ImageBackground, AccessibilityInfo, useWindowDimensions } from 'react-native'
import Instructions from '../components/Instructions'
import Option from '@screens/Task/components/Option'
import * as Haptics from 'expo-haptics'
import Modal from '@screens/Task/components/Modal'

import useTextToSpeech from '@hooks/useTextToSpeech'
import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface'
import { useEffect, useState } from 'react'
import usePlaySound from '@hooks/usePlaySound'
import usePreTask from '@hooks/usePreTask'

interface Props {
    route: any
}

const FillBlank = ({ route }: Props) => {
    const { question } = route.params as { question: PreTaskQuestion }
    const [containerStyleOptions, setContainerStyleOptions] = useState([{}])
    const [textStyleOptions, setTextStyleOptions] = useState([{}])
    const [blank, setBlank] = useState('            ')
    const [showModal, setShowModal] = useState(false)
    const [optionIndex, setOptionIndex] = useState<number>(0)
    const theme = useTheme()
    const playSoundSuccess = usePlaySound(require('@sounds/success.wav'))
    const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'))
    const { nextQuestion } = usePreTask()
    const { speak } = useTextToSpeech()
    const { width: screenWidth } = useWindowDimensions();
    const isPhone = screenWidth <= 768;

    const questionList = question.content.split('_')

    const onPressOption = (index: number, correct: boolean) => {
        setOptionIndex(index)
        speak(question.options[index].content)
        const newContainerStyleOptions = [...containerStyleOptions];
        const newTextStyleOptions = [...textStyleOptions];

        const color = correct ? theme.colors.darkGreen : theme.colors.red;
        playSound(correct);
        newContainerStyleOptions[index] = { backgroundColor: color };
        newTextStyleOptions[index] = { color: theme.colors.white };
        setBlank(question.options[index].content)

        if (!correct) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }

        setContainerStyleOptions(newContainerStyleOptions);
        setTextStyleOptions(newTextStyleOptions);

        if (correct) {
            setTimeout(() => {
                nextQuestion()
            }, 1000);
        } else {
            setShowModal(true);
            resetContainerStyleOptions();
        }
    }

    const playSound = (correct: boolean) => {
        if (correct) {
            playSoundSuccess();
        } else {
            playSoundWrong();
        }
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const resetContainerStyleOptions = () => {
        setTimeout(() => {
            setContainerStyleOptions([{}]);
            setBlank('            ')
        }, 1000);
    }

    useEffect(() => {
        AccessibilityInfo.announceForAccessibility(question.content)
        speak(question.content.split('_'))
    }, [])


    return (
        <>
            <View style={getStyles(theme, isPhone).container}>
                <Instructions text='Selecciona la opción correcta para completar la frase' />
                <View style={getStyles(theme, isPhone).imageContainer}>
                    <ImageBackground
                        style={getStyles(theme, isPhone).image}
                        source={{ uri: question.imgUrl }}
                        resizeMode='contain'
                        accessible
                        accessibilityLabel={question.imgAlt} />
                </View>
                <Text style={getStyles(theme, isPhone).question}>
                    {questionList[0]}
                    <Text style={getStyles(theme, isPhone).underlineText}>{blank}</Text>
                    {questionList[1]}
                </Text>
                <View style={getStyles(theme, isPhone).optionsContainer}>
                    {question.options.map((option, index) => (
                        <Option
                            key={index}
                            text={option.content}
                            onPress={() => {
                                onPressOption(index, option.correct)
                            }}
                            containerStyle={containerStyleOptions[index]}
                            textStyle={textStyleOptions[index]}
                        />
                    ))}
                </View>
            </View>
            <Modal showModal={showModal} closeModal={closeModal} help={question.options[optionIndex].feedback} />
        </>
    )
}

const getStyles = (theme: Theme, isPhone: boolean) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            height: '100%',
        },
        imageContainer: {
            marginHorizontal: 20,
            height: isPhone ? 150 : 200,
            width: '100%',
            borderRadius: theme.borderRadius.medium,
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: '100%',
            marginHorizontal: isPhone ? '10%' : 0,
            alignSelf: 'center',
        },
        optionsContainer: {
            marginTop: 20,
            flexDirection: isPhone ? 'column' : 'row',
        },
        question: {
            fontSize: isPhone ? theme.fontSize.xxxl : theme.fontSize.xxxxxl,
            color: theme.colors.darkestGreen,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            marginHorizontal: 20,
            textAlign: 'center',
            marginTop: 20,
        },
        line: {
            backgroundColor: theme.colors.black,
            height: 2,
            width: 50,
            borderRadius: theme.borderRadius.medium,
        },
        underlineText: {
            textDecorationLine: 'underline',
        },
    })

export default FillBlank