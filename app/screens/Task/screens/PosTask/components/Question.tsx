import { View, Text, StyleSheet } from 'react-native'
import Pressable from '@components/Pressable'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    question: {
        question: string
        options: {
            id: number
            text: string
        }[]
    }
}

const Question = ({ question }: Props) => {
    const theme = useTheme()

    return (
        <View>
            <Text style={getStyles(theme).question}>{question.question}</Text>
            <View style={getStyles(theme).optionsContainer}>
                {
                    question.options.map((option) => (
                        <Pressable key={option.id} style={getStyles(theme).option}>
                            <Text style={getStyles(theme).optionText}>{option.text}</Text>
                        </Pressable>
                    ))
                }
            </View>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        question: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xxl,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
            marginHorizontal: 20,
        },
        optionsContainer: {
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
        },
        option: {
            backgroundColor: theme.colors.black,
            width: "45%",
            paddingVertical: 10,
            marginHorizontal: 5,
            borderRadius: theme.borderRadius.medium,
            justifyContent: 'center',
            alignItems: 'center',
            ...theme.shadow
        },
        optionText: {
            color: theme.colors.white,
            fontSize: theme.fontSize.xl,
            fontFamily: theme.fontWeight.medium,
            letterSpacing: theme.spacing.medium,
        },
    })

export default Question