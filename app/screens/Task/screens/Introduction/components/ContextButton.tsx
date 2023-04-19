import { View, Text, StyleSheet } from 'react-native';
import Pressable from '@components/Pressable';
import useTheme from '@hooks/useTheme';
import { hexToRgbA } from '@utils/hexToRgba';

import { Theme } from '@theme';

interface Props {
    onPress: () => void;
}

const ContextButton = ({ onPress }: Props) => {
    const theme = useTheme();

    return (
        <Pressable onPress={onPress}>
            <View style={getStyles(theme).container}>
                <View style={getStyles(theme).innerContainer}>
                    <Text style={getStyles(theme).text}>Contexto</Text>
                </View>
            </View>
        </Pressable>
    );
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            marginTop: 20,
            marginBottom: 40,
            backgroundColor: hexToRgbA(theme.colors.darkerGreen, 0.42),
            width: 287,
            height: 101,
            borderRadius: theme.borderRadius.full,
            justifyContent: 'center',
            alignItems: 'center',
        },
        innerContainer: {
            backgroundColor: theme.colors.darkerGreen,
            borderRadius: theme.borderRadius.full,
            width: 264,
            height: 82,
            justifyContent: 'center',
            alignItems: 'center',
            ...theme.shadow,
        },
        text: {
            color: theme.colors.bluerGreen,
            fontSize: theme.fontSize.xxxxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            textAlign: 'center',
        },
    });

export default ContextButton;
