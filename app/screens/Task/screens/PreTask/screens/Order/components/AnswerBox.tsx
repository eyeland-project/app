import { View, Text, StyleSheet } from 'react-native'
import Option from './Option'
import React from 'react'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    answerList: string[]
    onAnswerPress: (index: number) => void
}

const AnswerBox = ({ answerList, onAnswerPress }: Props) => {
    const theme = useTheme()

    return (
        <View style={[getStyles(theme).container, answerList.length > 0 ? getStyles(theme).notEmptyContainer : getStyles(theme).emptyContainer]}>
            {
                answerList.length > 0
                    ? answerList.map((answer, index) => (
                        <Option text={answer} onPress={() => { onAnswerPress(index) }} key={index} />
                    ))
                    : <Text style={getStyles(theme).text}>Pulsa las palabras para organizarlas</Text>
            }
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.secondary,
            borderWidth: 1.5,
            borderRadius: theme.borderRadius.medium,
            marginHorizontal: 20,
        },
        emptyContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        notEmptyContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 10,
            paddingBottom: 10,
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            textAlign: 'center',
            opacity: 0.4,
            marginHorizontal: 20,
            marginVertical: 40,
        }
    })

export default AnswerBox