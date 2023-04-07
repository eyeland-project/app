import {
    Placeholder as PlaceholderRN,
    PlaceholderMedia,
    PlaceholderLine,
    ShineOverlay
} from "rn-placeholder";
import { View, StyleSheet } from "react-native";

import Title from "./Title";

import useTheme from "@hooks/useTheme";

import { Theme } from "@theme";

const Placeholder = () => {
    const theme = useTheme();

    return (
        <View style={getStyles(theme).container}>
            <Title text="MENÚ" />
            <View style={getStyles(theme).card}>
                <PlaceholderRN
                    Animation={ShineOverlay}
                >
                    <PlaceholderLine width={40} height={30} />
                    <PlaceholderLine />
                    <PlaceholderLine width={60} />
                    <PlaceholderLine width={70} />
                    <PlaceholderLine style={getStyles(theme).button} width={40} height={40} noMargin={true} />
                </PlaceholderRN>
            </View>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: "100%",
        },
        card: {
            backgroundColor: theme.colors.primary,
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