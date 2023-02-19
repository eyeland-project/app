import { View, Text, StyleSheet } from 'react-native'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    keywords: string[]
}

const Keywords = ({ keywords }: Props) => {
    const theme = useTheme()

    return (
        <View style={getStyles(theme).container}>
            <Text style={getStyles(theme).text}>{
                keywords.map((keyword, index) => {
                    return index === keywords.length - 1 ? keyword : `${keyword} | `
                })
            }</Text>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            marginHorizontal: 20,
            marginBottom: 20,
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.small,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium
        },
    })

export default Keywords