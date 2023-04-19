import {
    Placeholder as PlaceholderRN,
    PlaceholderMedia,
    PlaceholderLine,
    ShineOverlay,
    Shine
} from "rn-placeholder";
import { View, StyleSheet, StatusBar } from "react-native";

import Title from "./Title";

import useTheme from "@hooks/useTheme";

import { Theme } from "@theme";

const Placeholder = () => {
    const theme = useTheme();

    return (
        <>
            <StatusBar backgroundColor={theme.colors.darkestGreen} barStyle="light-content" />
            <View style={getStyles(theme).container}>
                <Title text="MENÚ" />
                <View style={getStyles(theme).card}>
                    <PlaceholderRN
                        Animation={props => (
                            <Shine {...props} style={{ backgroundColor: theme.colors.darkGreen }} reverse={false} />
                        )}
                    >
                        <PlaceholderLine width={40} height={30} color={theme.colors.lightGreen} />
                        <PlaceholderLine color={theme.colors.lightGreen} />
                        <PlaceholderLine width={60} color={theme.colors.lightGreen} />
                        <PlaceholderLine width={70} color={theme.colors.lightGreen} />
                        <PlaceholderLine style={getStyles(theme).button} width={40} height={40} noMargin={true} color={theme.colors.lightGreen} />
                    </PlaceholderRN>
                </View>
            </View >
        </>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.darkestGreen,
            height: "100%",
        },
        card: {
            backgroundColor: theme.colors.darkGreen,
            padding: 20,
            borderRadius: theme.borderRadius.medium,
            marginHorizontal: 20,
            ...theme.shadow,
        },
        button: {
            borderRadius: theme.borderRadius.full,
            marginLeft: "auto",
            marginTop: 20,
            ...theme.shadow
        }
    });


export default Placeholder