import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'
import Pressable from '@components/Pressable'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    text: string
    onPress: () => void
    containerStyle: StyleProp<ViewStyle>
    textStyle: StyleProp<TextStyle>
}

const Option = ({ text, onPress, containerStyle, textStyle }: Props) => {
    const theme = useTheme()

    const containerStyles = StyleSheet.flatten([
        getStyles(theme).container,
        containerStyle
    ]);

    const textStyles = StyleSheet.flatten([
        getStyles(theme).text,
        textStyle
    ])

    return (
        <Pressable style={containerStyles} onPress={onPress}>
            <Text style={textStyles}>{text}</Text>
        </Pressable>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.lightBluerGreen,
            borderRadius: theme.borderRadius.large,
            justifyContent: 'center',
            alignItems: 'center',
            width: 215,
            height: 60,
            marginHorizontal: 10,
            marginVertical: 10,
        },
        text: {
            color: theme.colors.white,
            fontSize: theme.fontSize.xxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            marginHorizontal: 10,
        }
    })

export default Option