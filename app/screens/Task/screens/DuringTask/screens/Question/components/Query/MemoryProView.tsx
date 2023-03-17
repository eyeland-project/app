import { View, Text, StyleSheet } from 'react-native'
import Pressable from '@components/Pressable'

import { useState, useEffect } from 'react'
import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    text: string
    nounTranslation: string
}

const MemoryProView = ({ text, nounTranslation }: Props) => {
    const [noun, setNoun] = useState('')
    const [question, setQuestion] = useState(['', ''])
    const theme = useTheme()

    const textFiltered = text.replace(/[\[\]]/g, '')
    const matchResult = textFiltered.match(/{(.*?)}/g);

    useEffect(() => {
        setNoun(matchResult ? matchResult[0].replace(/[{}]/g, '') : '')
        setQuestion(matchResult ? textFiltered.split(matchResult[0]) : [textFiltered])
        console.log(textFiltered)
    }, [])

    const handlePress = () => {
        if (matchResult && noun === matchResult[0].replace(/[{}]/g, '')) {
            setNoun(nounTranslation)
        } else {
            setNoun(matchResult ? matchResult[0].replace(/[{}]/g, '') : '')
        }
    }

    return (
        <View style={getStyles(theme).container}>
            <Text style={getStyles(theme).text}>
                {question[0]}
                <Text style={getStyles(theme).noun} onPress={handlePress}>
                    {noun}
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
        noun: {
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
            bottom: -40,
            borderRadius: theme.borderRadius.medium,
            backgroundColor: theme.colors.gray,
            paddingHorizontal: 10,
            paddingVertical: 5,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
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
            left: 30,
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

export default MemoryProView