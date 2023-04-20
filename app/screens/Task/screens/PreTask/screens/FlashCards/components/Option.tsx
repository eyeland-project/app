import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Pressable from '@components/Pressable';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
    onPress: () => void;
    containerStyle: {};
    text: 'Sí' | 'No';
    accessibilityLabel: string;
}

const Option: React.FC<Props> = ({ onPress, containerStyle, text, accessibilityLabel }) => {
    const theme = useTheme();

    return (
        <Pressable onPress={onPress}>
            <View style={[getStyles(theme).option, containerStyle]} accessible={true} accessibilityLabel={accessibilityLabel} accessibilityRole="button">
                <Text style={getStyles(theme).text}>{text}</Text>
            </View>
        </Pressable>
    );
};

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        option: {
            width: 160,
            height: 60,
            borderRadius: theme.borderRadius.large,
            backgroundColor: theme.colors.darkestGreen,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            color: theme.colors.lightBluerGreen,
            fontSize: theme.fontSize.xxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            textTransform: 'uppercase',
        }
    });

export default Option;
