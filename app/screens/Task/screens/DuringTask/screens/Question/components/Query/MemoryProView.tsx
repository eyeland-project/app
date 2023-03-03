import { View, Text, StyleSheet } from 'react-native'
import Pressable from '@components/Pressable'

import { useState } from 'react'
import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    text: string
}

const MemoryProView = ({ text }: Props) => {
    const [isNounPressed, setIsNounPressed] = useState(false)
    const theme = useTheme()

    const textFiltered = text.replace(/[\[\]]/g, '')
    const matchResult = textFiltered.match(/{(.*?)}/g);
    const noun = matchResult ? matchResult[0].replace(/[{}]/g, '') : '';
    const question = matchResult ? textFiltered.split(matchResult[0]) : ''

    const handlePress = () => {
        setIsNounPressed(!isNounPressed)
    }

    return (
        <View style={getStyles(theme).container}>
            <Text style={getStyles(theme).text}>{question[0]}</Text>
            <Pressable style={getStyles(theme).nounContainer} onPress={handlePress}>
                <Text style={getStyles(theme).noun}>
                    {noun}
                </Text>
                {
                    isNounPressed
                    && <View style={getStyles(theme).dialog}>
                        <Text style={getStyles(theme).dialogtext}>Puente</Text>
                        <View style={getStyles(theme).triangle} />
                    </View>
                }

            </Pressable>
            <Text style={getStyles(theme).text}>{question[1]}</Text>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            marginHorizontal: 20,
            flexDirection: 'row',
            marginTop: 10,
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