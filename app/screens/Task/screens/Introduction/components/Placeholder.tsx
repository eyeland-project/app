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
                <PlaceholderLine width={40} height={40} style={{ marginTop: 10, marginBottom: 10 }} noMargin={true} />
                <PlaceholderLine noMargin={true} style={{ marginBottom: 20 }} width={50} />
                <PlaceholderMedia style={{ width: '100%', height: 200, borderRadius: 8 }} />
                <PlaceholderLine width={60} style={{ marginTop: 40 }} />
                <PlaceholderLine width={80} />
                <PlaceholderLine width={90} />
                <PlaceholderLine width={75} />
                <PlaceholderLine width={95} />
                <PlaceholderLine width={60} />
            </PlaceholderRN>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            marginHorizontal: 20,
            height: "100%",
        },
    });


export default Placeholder