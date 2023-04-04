import { View, Text, StyleSheet } from 'react-native'
import Pressable from './Pressable'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    error: string
    retryAction: () => void
}

const ErrorScreen = ({ error, retryAction }: Props) => {
    const theme = useTheme()

    return (
        <View style={getStyles(theme).errorContainer}>
            <Text style={getStyles(theme).errorText}>
                {error}
            </Text>
            <Pressable
                style={getStyles(theme).retryButton}
                onPress={() => {
                    retryAction();
                }}
            >
                <Text style={getStyles(theme).retryButtonText}>Reintentar</Text>
            </Pressable>
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.primary,
    },
    errorText: {
        color: theme.colors.red,
        marginBottom: 10,
        fontFamily: theme.fontWeight.regular,
        fontSize: theme.fontSize.small,
        letterSpacing: theme.spacing.medium,
        textAlign: "center",
    },
    retryButton: {
        backgroundColor: theme.colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
        ...theme.shadow
    },
    retryButtonText: {
        color: theme.colors.primary,
        fontFamily: theme.fontWeight.medium,
        fontSize: theme.fontSize.small,
        letterSpacing: theme.spacing.medium,
    },
})

export default ErrorScreen