import { View, Text, StyleSheet } from 'react-native'
import Pressable from '@components/Pressable'

import { useState, useEffect } from 'react'
import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    text: string
    prepositionTranslation: string
}

const SuperRadarView = ({ text, prepositionTranslation }: Props) => {
    const [preposition, setPreposition] = useState('')
    const [question, setQuestion] = useState(['', ''])
    const theme = useTheme()

    const textFiltered = text.replace(/[{}]/g, '')
    const matchResult = textFiltered.match(/\[(.*?)\]/g);

    useEffect(() => {
        setPreposition(matchResult ? matchResult[0].replace(/[\[\]]/g, '') : '')
        setQuestion(matchResult ? textFiltered.split(matchResult[0]) : [textFiltered])
        console.log(textFiltered)
    }, [])

    const handlePress = () => {
        if (matchResult && preposition === matchResult[0].replace(/[\[\]]/g, '')) {
            setPreposition(prepositionTranslation)
        } else {
            setPreposition(matchResult ? matchResult[0].replace(/[\[\]]/g, '') : '')
        }
    }

    return (
        <View style={getStyles(theme).container}>
            <Text style={getStyles(theme).text}>
                {question[0]}
                <Text style={getStyles(theme).prepostion} onPress={handlePress}>
                    {preposition}
                </Text>
                {question[1]}
            </Text>
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
        prepostion: {
            fontSize: theme.fontSize.xxl,
            color: theme.colors.black,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium
        },
        nounContainer: {
            position: 'relative',
        },
        dialog: {
            position: 'absolute',
            width: 'auto',
            bottom: -40,
            borderRadius: theme.borderRadius.medium,
            backgroundColor: theme.colors.gray,
            paddingHorizontal: 10,
            paddingVertical: 5,
            ...theme.shadow,
            elevation: 15,
        },
        dialogtext: {
            fontSize: theme.fontSize.medium,
            color: theme.colors.black,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
        },
        triangle: {
            position: 'absolute',
            top: -10,
            left: '50%',
            borderLeftWidth: 10,
            borderRightWidth: 10,
            borderBottomWidth: 10,
            borderStyle: 'solid',
            backgroundColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: theme.colors.gray,
        }
    })

export default SuperRadarView