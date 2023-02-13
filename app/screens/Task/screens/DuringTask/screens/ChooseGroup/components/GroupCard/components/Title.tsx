import { View, Text, StyleSheet } from 'react-native'

import useTheme from '@hooks/useTheme'
import { Theme } from '@theme'

interface Props {
    name: string
}

const Title = ({ name }: Props) => {
    const theme = useTheme()

    return (
        <Text style={getStyles(theme).title}>{name}</Text>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    title: {
        fontSize: theme.fontSize.xl,
        fontFamily: theme.fontWeight.bold,
        color: theme.colors.black,
        letterSpacing: theme.spacing.medium,
    },
});



export default Title