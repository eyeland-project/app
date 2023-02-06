import { View, Text, StyleSheet } from 'react-native'

import useTheme from '../../../core/hooks/useTheme'
import { Theme } from '../../../theme'

interface TitleProps {
    text: string
}

const Title = ({ text }: TitleProps) => {
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
            padding: 8,
            marginBottom: 8,
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xxxl,
            fontFamily: theme.fontWeight.bold,

        },
    })




export default Title