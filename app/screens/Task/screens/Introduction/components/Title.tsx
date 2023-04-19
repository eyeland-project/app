import { View, Text, StyleSheet } from 'react-native'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    text: string
    isPhone: boolean
}

const Title = ({ text, isPhone }: Props) => {
    const theme = useTheme()

    return (
        <View style={getStyles(theme, isPhone).container}>
            <Text style={getStyles(theme, isPhone).text}>{text}</Text>
        </View>
    )
}

const getStyles = (theme: Theme, isPhone: boolean) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            marginTop: 10,
            marginHorizontal: 20,
        },
        text: {
            color: theme.colors.darkestGreen,
            fontSize: isPhone ? theme.fontSize.xxxxxl : theme.fontSize.xxxxxxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            textAlign: 'center'
        },
    })



export default Title