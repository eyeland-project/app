import { View, Text, StyleSheet } from 'react-native'
import Pressable from '@components/Pressable'
import AntDesign from '@expo/vector-icons/AntDesign'

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
    title: string;
    completed: boolean;
    blocked: boolean;
    onPress: () => void;
}

const Section = ({ title, completed, blocked, onPress }: Props) => {
    const theme = useTheme();

    return (
        <Pressable onPress={onPress} disabled={blocked}>
            <View style={getStyles(theme, completed, blocked).container}>
                <Text style={getStyles(theme, completed, blocked).text}>{title}</Text>
            </View>
        </Pressable>
    );
}

const getStyles = (theme: Theme, completed: boolean, blocked: boolean) =>
    StyleSheet.create({
        container: {
            backgroundColor: completed ? theme.colors.darkGreen : theme.colors.white,
            borderRadius: theme.borderRadius.large,
            height: 65,
            width: 214,
            borderColor: completed ? theme.colors.darkGreen : theme.colors.gray,
            borderWidth: 1,
            marginHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10
        },
        text: {
            color: completed ? theme.colors.white : blocked ? theme.colors.gray : theme.colors.darkGreen,
            fontSize: theme.fontSize.xl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
        }
    })


export default Section