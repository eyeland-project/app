import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import Instructions from '../components/Instructions'
import Option from '@screens/Task/components/Option'
import * as Haptics from 'expo-haptics'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface'
import { useState } from 'react'
import usePlaySound from '@hooks/usePlaySound'
import usePreTaskContext from '@hooks/usePreTaskContext'
import usePreTask from '@hooks/usePreTask'
import usePreTaskMock from '@mocks/hooks/usePreTaskMock'

interface Props {
    route: any
}

const FillBlank = ({ route }: Props) => {
    const { question } = route.params as { question: PreTaskQuestion }
    const [containerStyleOptions, setContainerStyleOptions] = useState([{}])
    const [textStyleOptions, setTextStyleOptions] = useState([{}])
    const [blank, setBlank] = useState('       ')
    const theme = useTheme()
    const playSoundSuccess = usePlaySound(require('@sounds/success.wav'))
    const playSoundWrong = usePlaySound(require('@sounds/wrong.wav'))
    const { nextQuestion } = usePreTaskMock()

    const questionList = question.content.split('_')

    const onPressOption = (index: number, correct: boolean) => {
        const newContainerStyleOptions = [...containerStyleOptions];
        const newTextStyleOptions = [...textStyleOptions];

        const color = correct ? theme.colors.green : theme.colors.red;
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

    const resetContainerStyleOptions = () => {
        setTimeout(() => {
            setContainerStyleOptions([{}]);
            setBlank('       ')
        }, 1000);
    }


    return (
        <View style={getStyles(theme).container}>
            <Instructions text='Selecciona la opción correcta' />
            <Text style={getStyles(theme).question}>
                {questionList[0]}
                <Text style={getStyles(theme).underlineText}>{blank}</Text>
                {questionList[1]}
            </Text>
            <View style={getStyles(theme).imageContainer}>
                <ImageBackground style={getStyles(theme).image} source={{ uri: question.imgUrl }} />
            </View>
            <View style={getStyles(theme).optionsContainer}>
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
            marginTop: 60,
        },
        question: {
            fontSize: theme.fontSize.xxl,
            color: theme.colors.black,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
            marginHorizontal: 20,
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