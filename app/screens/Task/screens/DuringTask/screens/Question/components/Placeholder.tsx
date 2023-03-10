import {
    Placeholder as PlaceholderRN,
    PlaceholderMedia,
    PlaceholderLine,
    ShineOverlay
} from "rn-placeholder";
import { View, StyleSheet } from "react-native";

import useTheme from "@hooks/useTheme";

import { Theme } from "@theme";

const Placeholder = () => {
    const theme = useTheme();
    return (
        <View style={getStyles(theme).container}>
            <PlaceholderRN
                Animation={ShineOverlay}
            >
                <PlaceholderMedia style={{ width: '100%', marginBottom: 20, height: 60, borderRadius: 999 }} />
                <PlaceholderLine width={70} height={40} noMargin={true} style={{ marginBottom: 20 }} />
                <PlaceholderMedia style={{ width: '100%', height: 200 }} />
                <PlaceholderMedia style={{ width: '100%', height: 70, marginBottom: 20, marginTop: 60 }} />
                <PlaceholderMedia style={{ width: '100%', height: 70 }} />
            </PlaceholderRN>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: "100%",
            paddingHorizontal: 20,

        },
    });

export default Placeholder