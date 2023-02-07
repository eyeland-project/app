import { Text, StyleSheet } from 'react-native'
import Pressable from './Pressable'

import { AntDesign } from '@expo/vector-icons';

import useTheme from '../../core/hooks/useTheme';

import { Theme } from '../../theme';

interface Props {
    onPress: () => void
}

const ContinueButton = ({ onPress }: Props) => {
    const theme = useTheme()

    return (
        <Pressable style={getStyles(theme).container} onPress={onPress}>
            <Text style={getStyles(theme).text}>Continuar</Text>
            <AntDesign name="arrowright" size={24} color={theme.colors.primary} />
        </Pressable>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.secondary,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: theme.borderRadius.full,
            flexDirection: 'row',
            marginStart: 'auto',
            ...theme.shadow,
            marginBottom: 90,
        },
        text: {
            color: theme.colors.white,
            fontSize: theme.fontSize.medium,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
            marginEnd: 10,
        },
    })


export default ContinueButton