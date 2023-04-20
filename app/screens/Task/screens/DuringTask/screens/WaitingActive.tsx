import { Text, View, StyleSheet, Image } from "react-native";
import LottieView from 'lottie-react-native';
import { Link } from "@react-navigation/native";

import { useEffect, useState } from "react";
import useTheme from "@hooks/useTheme";
import useTaskContext from "@hooks/useTaskContext";
import { useDuringTaskContext } from "@hooks/useDuringTaskContext";
import { useNavigation } from "@react-navigation/native";
import useAuthStorage from "@hooks/useAuthStorage";

import { Theme } from "@theme";
import { SocketEvents } from "@enums/SocketEvents.enum";
import Pressable from "@app/shared/components/Pressable";

const WaitingActive = ({ route }: { route: any }) => {
    const { taskOrder } = route.params;
    const theme = useTheme();
    const { resetContext } = useTaskContext();
    const { socket } = useDuringTaskContext();
    const navigation = useNavigation<any>();
    const authStorage = useAuthStorage();
    const [isSessionStarted, setIsSessionStarted] = useState(false);

    const init = async () => {
        resetContext();
        socket.once(SocketEvents.sessionTeacherCreate, () => {
            setIsSessionStarted(true);
        });
        socket.emit('join', await authStorage.getAccessToken(), (response: { session: boolean }) => {
            setIsSessionStarted(response.session);
        });
    }

    useEffect(() => {
        init();
    }, []);
    return (
        <View style={getStyles(theme).container}>
            <Text style={getStyles(theme).title}>¡Felicitaciones!</Text>
            <Text style={getStyles(theme).description}>Completaste el primer paso de tu tarea</Text>
            <Image source={require('@images/waiting.png')} resizeMode="center" style={getStyles(theme).image} />
            {
                isSessionStarted ? (
                    <Pressable onPress={() => {
                        navigation.navigate('ChooseGroup', { taskOrder });
                    }} style={getStyles(theme).button}>
                        <Text style={getStyles(theme).buttonText}>Comenzar</Text>
                    </Pressable>
                ) : (
                    <Text style={getStyles(theme).text}>Espera a que tu profesor active la etapa para colaboración para comenzar.</Text>
                )

            }
        </View>
    );
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.primary,
            height: '100%',
            alignItems: 'center',
            paddingTop: 20,
            // justifyContent: 'center',
        },
        image: {
            width: 300,
            height: 300,
        },
        text: {
            color: theme.colors.darkGray,
            fontSize: theme.fontSize.xl,
            fontFamily: theme.fontWeight.bold,
            textAlign: 'center',
            marginHorizontal: 20,
            maxWidth: 400,
            marginTop: 20,
        },
        button: {
            backgroundColor: theme.colors.darkGreen,
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: theme.borderRadius.large,
            marginTop: 20,
        },
        buttonText: {
            color: theme.colors.bluerGreen,
            fontSize: theme.fontSize.xxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
        },
        title: {
            color: theme.colors.darkestGreen,
            fontSize: theme.fontSize.xxxxxl,
            fontFamily: theme.fontWeight.bold,
            textAlign: 'center',
        },
        description: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xxxxl,
            fontFamily: theme.fontWeight.medium,
            textAlign: 'center',
            marginHorizontal: 20,
            maxWidth: 400,
            marginVertical: 20,
        }
    });

export default WaitingActive