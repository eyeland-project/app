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
        <View style={getStyles(theme, completed, blocked).container}>
            <Text style={getStyles(theme, completed, blocked).text}>{title}</Text>
            <Pressable
                onPress={onPress}
                style={getStyles(theme, completed, blocked).button}
                disabled={blocked}
            >
                <AntDesign
                    name={completed ? 'reload1' : "arrowright"}
                    size={20}
                    color={theme.colors.white}
                />
            </Pressable>
        </View>
    )
}

const getStyles = (theme: Theme, completed: boolean, blocked: boolean) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingVertical: 7,
            marginHorizontal: 20,
            borderRadius: theme.borderRadius.medium,
            borderColor: theme.colors.blue,
            borderWidth: completed ? 2 : 0,
            ...theme.shadow
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            opacity: blocked ? 0.5 : 1,
        },
        button: {
            backgroundColor: completed ? theme.colors.blue : theme.colors.secondary,
            borderRadius: theme.borderRadius.full,
            padding: 10,
            marginVertical: 5,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: blocked ? 0.5 : 1,
            ...theme.shadow
        },
    })


export default Section