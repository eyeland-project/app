import { Text, View, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';

import useTheme from "@hooks/useTheme";
import { Theme } from "@theme";

const WaitingActive = () => {
    const theme = useTheme();
    return (
        <View style={getStyles(theme).container}>
            <LottieView
                source={require('@animations/waitingActive.json')}
                autoPlay
                loop
                style={getStyles(theme).animation}
            />
            <Text style={getStyles(theme).text}>Espera que tu profesor active la During-Task para comenzar.</Text>
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
        }
    });

export default WaitingActive