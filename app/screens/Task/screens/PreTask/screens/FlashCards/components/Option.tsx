import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Pressable from '@components/Pressable';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
    onPress: () => void;
    containerStyle: {};
    iconName: 'check' | 'cross';
    accessibilityLabel: string;
}

const Option: React.FC<Props> = ({ onPress, containerStyle, iconName, accessibilityLabel }) => {
    const theme = useTheme();

    return (
        <Pressable onPress={onPress}>
            <View style={[getStyles(theme).option, containerStyle]} accessible={true} accessibilityLabel={accessibilityLabel} accessibilityRole="button">
                <Entypo name={iconName} size={50} color="white" />
            </View>
        </Pressable>
    );
};

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        option: {
            width: 80,
            height: 80,
            borderRadius: theme.borderRadius.medium,
            backgroundColor: theme.colors.secondary,
            alignItems: 'center',
            justifyContent: 'center',
            ...theme.shadow,
        },
    });

export default Option;
