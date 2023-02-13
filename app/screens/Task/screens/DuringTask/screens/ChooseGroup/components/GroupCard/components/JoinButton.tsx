import { View, Text, StyleSheet } from 'react-native'
import Pressable from '@components/Pressable'

import useTheme from '@hooks/useTheme'
import { Theme } from '@theme'

interface Props {
    id: number
}

const JoinButton = ({ id }: Props) => {
    const theme = useTheme()

    return (
        <Pressable style={getStyles(theme).button}>
            <Text style={getStyles(theme).text}>Ingresar</Text>
        </Pressable>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    button: {
        backgroundColor: theme.colors.secondary,
        borderRadius: theme.borderRadius.full,
        padding: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginTop: 20,
        ...theme.shadow
    },
    text: {
        color: theme.colors.white,
        fontFamily: theme.fontWeight.regular,
        fontSize: theme.fontSize.small,
        letterSpacing: theme.spacing.medium
    },
});

export default JoinButton