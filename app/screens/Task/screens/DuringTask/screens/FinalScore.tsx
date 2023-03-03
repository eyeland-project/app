import { View, Text, StyleSheet } from 'react-native'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

const FinalScore = () => {
    const theme = useTheme()

    //MOCK DATA
    const position = 5
    const groupName = 'Ocelots'

    return (
        <View style={getStyles(theme).container}>
            <Text style={getStyles(theme).title}>Resultados finales</Text>
            <Text style={getStyles(theme).groupName}>{groupName}</Text>
            <Text style={getStyles(theme).position}>{position}°</Text>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
        },
        title: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xxxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            marginBottom: 80
        },
        position: {
            color: theme.colors.black,
            fontSize: 150,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            marginTop: -40
        },
        groupName: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xxxxxxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
        },
    })


export default FinalScore