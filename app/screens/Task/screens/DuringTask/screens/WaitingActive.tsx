import { Text, View, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import { Link } from "@react-navigation/native";

import { useEffect } from "react";
import useTheme from "@hooks/useTheme";
import useTaskContext from "@hooks/useTaskContext";

import { Theme } from "@theme";

const WaitingActive = ({ route }: { route: any }) => {
    const { taskOrder } = route.params;
    const theme = useTheme();
    const { resetContext } = useTaskContext();

    useEffect(() => {
        resetContext();
    }, []);

    return (
        <View style={getStyles(theme).container}>
            <LottieView
                source={require('@animations/waitingActive.json')}
                autoPlay
                loop
                style={getStyles(theme).animation}
            />
            <Text style={getStyles(theme).text}>Espera que tu profesor active la During-Task para comenzar.</Text>
            <Link to={{ screen: 'Introduction', params: { taskOrder: taskOrder } }} style={getStyles(theme).link}>
                <Text style={getStyles(theme).linkText}>Volver a la lista de tareas</Text>
            </Link>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.primary,
            height: '100%',
            alignItems: 'center',
            paddingTop: 100,
        },
        animation: {
            width: 300,
            height: 300,
        },
        text: {
            color: theme.colors.black,
            fontSize: 20,
            textAlign: 'center',
            marginTop: 20,
            letterSpacing: theme.spacing.medium,
            fontFamily: theme.fontWeight.bold,
            width: '80%',
        },
        link: {
            marginTop: 40,
        },
        linkText: {
            color: theme.colors.black,
            fontSize: theme.fontSize.medium,
            textAlign: 'center',
            letterSpacing: theme.spacing.medium,
            fontFamily: theme.fontWeight.regular,
            width: '80%',
            textDecorationLine: 'underline',
        }
    });

export default WaitingActive