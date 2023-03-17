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
        <Pressable
            style={getStyles(theme, completed, blocked).container}
            accessible={true}
            accessibilityLabel={`${title}. ${completed ? 'Completado' : 'No completado'}. ${blocked ? 'Bloqueado' : 'Disponible'}`}
            accessibilityHint={`${blocked ? 'Esta sección está bloqueada.' : 'Presione para continuar.'}`}
            onPress={onPress}
            disabled={blocked}
        >
            <Text style={getStyles(theme, completed, blocked).text}>{title}</Text>
            <View

                style={getStyles(theme, completed, blocked).button}

                accessibilityRole="button"
                accessibilityLabel={completed ? "Reiniciar sección" : "Continuar sección"}
            >
                <AntDesign
                    name={completed ? 'reload1' : "arrowright"}
                    size={20}
                    color={theme.colors.white}
                    accessible={false}
                />
            </View>
        </Pressable>
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
            borderColor: theme.colors.green,
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
            backgroundColor: completed ? theme.colors.green : theme.colors.secondary,
            borderRadius: theme.borderRadius.full,
            padding: 10,
            marginVertical: 5,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: blocked ? 0.5 : 1,
        },
    })


export default Section
