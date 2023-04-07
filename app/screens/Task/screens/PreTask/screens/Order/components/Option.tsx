import { View, Text, StyleSheet } from 'react-native'
import Pressable from '@components/Pressable'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    text: string
    onPress: () => void
}

const Option = ({ text, onPress }: Props) => {
    const theme = useTheme()

    return (
        <Pressable style={getStyles(theme).container} onPress={onPress}>
            <Text style={getStyles(theme).text}>{text}</Text>
        </Pressable>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.black,
            paddingHorizontal: 20,
            borderRadius: theme.borderRadius.medium,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginEnd: 10,
            marginTop: 10,
            ...theme.shadow
        },
        text: {
            color: theme.colors.white,
            fontSize: theme.fontSize.xxl,
            fontFamily: theme.fontWeight.medium,
            letterSpacing: theme.spacing.medium,
        }
    })

export default Option