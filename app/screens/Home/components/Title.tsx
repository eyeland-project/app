import { View, Text, StyleSheet } from 'react-native'
import Pressable from '@components/Pressable'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useTheme from '@hooks/useTheme'
import useAuthStorage from '@app/core/hooks/useAuthStorage';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '@theme'

interface TitleProps {
    text: string
}

const Title = ({ text }: TitleProps) => {
    const theme = useTheme()
    const authStorage = useAuthStorage()
    const navigation = useNavigation<any>()

    return (
        <View style={getStyles(theme).container} accessible={true} accessibilityLabel={`Titulo y boton para cerrar sesión`} accessibilityRole="header">
            <Text style={getStyles(theme).text} accessible={false}>{text}</Text>
            <Pressable
                onPress={() => {
                    authStorage.removeAccessToken()
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })
                }}
                accessible={true}
                accessibilityLabel="Cerrar sesión"
                accessibilityHint="Presiona para cerrar sesión"
                accessibilityRole="button"
            >
                <MaterialCommunityIcons name="logout" size={30} color={theme.colors.secondary} accessible={false} />
            </Pressable>
        </View>
    )
}


const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xxxl,
            fontFamily: theme.fontWeight.bold,

        },
    })

export default Title
