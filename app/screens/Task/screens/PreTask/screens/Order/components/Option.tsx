import { View, Text, StyleSheet } from 'react-native'
import Pressable from '@components/Pressable'
import AntDesign from '@expo/vector-icons/AntDesign'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    text: string
    onPress: () => void
    ordered: boolean
}

const Option = ({ text, onPress, ordered }: Props) => {
    const theme = useTheme()

    return (
        <Pressable style={getStyles(theme, ordered).container} onPress={onPress}>
            <Text style={getStyles(theme, ordered).text}>{text}</Text>
            <AntDesign name={ordered ? 'close' : 'plus'} size={20} color={ordered ? theme.colors.darkGreen : theme.colors.white} />
        </Pressable>
    )
}

const getStyles = (theme: Theme, ordered: boolean) =>
    StyleSheet.create({
        container: {
            backgroundColor: ordered ? theme.colors.white : theme.colors.darkerGreen,
            borderRadius: theme.borderRadius.large,
            borderColor: theme.colors.darkGreen,
            borderWidth: ordered ? 1.5 : 0,
            flexDirection: 'row',
            paddingHorizontal: 20,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginEnd: 10,
            marginTop: 10,
        },
        text: {
            color: ordered ? theme.colors.darkerGreen : theme.colors.white,
            fontSize: theme.fontSize.xxl,
            fontFamily: theme.fontWeight.medium,
            letterSpacing: theme.spacing.medium,
            marginRight: 10,
        }
    })

export default Option