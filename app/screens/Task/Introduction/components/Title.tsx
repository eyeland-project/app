import { View, Text, StyleSheet } from 'react-native'

import useTheme from '../../../../core/hooks/useTheme'

import { Theme } from '../../../../theme'

interface Props {
    text: string
}

const Title = ({ text }: Props) => {
    const theme = useTheme()

    return (
        <View style={getStyles(theme).container}>
            <Text style={getStyles(theme).text}>{text}</Text>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            marginTop: 10,
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xxxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            marginBottom: -10,
        },
    })



export default Title