import { View, Text, StyleSheet } from 'react-native'
import Pressable from '@components/Pressable'

import { useState, useEffect } from 'react'
import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    text: string
}

const SuperHearing = ({ text }: Props) => {
    const theme = useTheme()

    // remove from text the brackets and the curly braces
    const textFiltered = text.replace(/[\[\]\{\}]/g, '')

    return (
        <View style={getStyles(theme).container}>
            <Text style={getStyles(theme).text}>{textFiltered}</Text>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            marginHorizontal: 20,
            flexDirection: 'row',
            marginTop: 10,
            flexWrap: 'wrap',
        },
        text: {
            fontSize: theme.fontSize.xxl,
            color: theme.colors.black,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium
        },
    })

export default SuperHearing
