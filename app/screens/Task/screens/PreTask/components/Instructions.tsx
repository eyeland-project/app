import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    text: string
}

const Instructions = ({ text }: Props) => {
    const theme = useTheme()

    return (
        <View style={getStyles(theme).container} accessible={true} accessibilityLabel={`Instrucciones: ${text}`}>
            <Text style={getStyles(theme).text}>{text}</Text>
            <View style={getStyles(theme).line}></View>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            marginHorizontal: 20,
            marginBottom: 10,
            marginTop: 10,
            alignSelf: 'center',
        },
        text: {
            color: theme.colors.darkGray,
            fontSize: theme.fontSize.xl,
            fontFamily: theme.fontWeight.bold,
        },
        line: {
            backgroundColor: theme.colors.black,
            height: 2,
            width: '100%',
            marginTop: 3,
            borderRadius: theme.borderRadius.medium,
            opacity: 0.1,
        }
    })

export default Instructions