import { View, Text, StyleSheet } from 'react-native';
import Pressable from '@components/Pressable';
import useTheme from '@hooks/useTheme';
import { hexToRgbA } from '@utils/hexToRgba';

import { Theme } from '@theme';

interface Props {
    onPress: () => void;
    isPhone: boolean;
}

const ContextButton = ({ onPress, isPhone }: Props) => {
    const theme = useTheme();

    return (
        <Pressable onPress={onPress}>
            <View style={getStyles(theme, isPhone).container}>
                <View style={getStyles(theme, isPhone).innerContainer}>
                    <Text style={getStyles(theme, isPhone).text}>Contexto</Text>
                </View>
            </View>
        </Pressable>
    );
}

const getStyles = (theme: Theme, isPhone: boolean) =>
    StyleSheet.create({
        container: {
            marginTop: 20,
            marginBottom: 40,
            backgroundColor: hexToRgbA(theme.colors.darkerGreen, 0.42),
            width: isPhone ? 230 : 287,
            height: isPhone ? 90 : 101,
            borderRadius: theme.borderRadius.full,
            justifyContent: 'center',
            alignItems: 'center',
        },
        innerContainer: {
            backgroundColor: theme.colors.darkerGreen,
            borderRadius: theme.borderRadius.full,
            width: isPhone ? 210 : 264,
            height: isPhone ? 70 : 82,
            justifyContent: 'center',
            alignItems: 'center',
            ...theme.shadow,
        },
        text: {
            color: theme.colors.bluerGreen,
            fontSize: isPhone ? theme.fontSize.xxxl : theme.fontSize.xxxxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            textAlign: 'center',
        },
    });

export default ContextButton;
