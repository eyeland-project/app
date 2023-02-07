import { View, Text, StyleSheet, ScrollView } from 'react-native'

import useTheme from '../../../core/hooks/useTheme'

import { Theme } from '../../../theme'

interface Props {
    text: string
}

const Description = ({ text }: Props) => {
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
            marginBottom: 40,
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.medium,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium
        },
    })



export default Description