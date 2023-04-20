import {
    Placeholder as PlaceholderRN,
    PlaceholderMedia,
    PlaceholderLine,
    ShineOverlay
} from "rn-placeholder";
import { View, StyleSheet, Image, useWindowDimensions, StatusBar } from "react-native";

import useTheme from "@hooks/useTheme";

import { Theme } from "@theme";

const Placeholder = () => {
    const theme = useTheme();
    const { width: screenWidth } = useWindowDimensions();
    const isPhone = screenWidth <= 768;

    return (
        <>
            <StatusBar backgroundColor={theme.colors.white} barStyle="dark-content" />
            <View style={getStyles(theme, isPhone).container}>
                <PlaceholderRN
                    Animation={ShineOverlay}
                >
                    <Image source={require('@icons/loginLogo.png')} resizeMode='center' style={getStyles(theme, isPhone).image} />
                    <PlaceholderLine noMargin={true} style={{ marginVertical: 20, width: 350, height: 80, borderRadius: 25, alignSelf: 'center' }} />
                    <PlaceholderMedia style={{ width: 300, height: 100, borderRadius: 90, marginVertical: 20, alignSelf: 'center' }} />
                    <View style={{ marginHorizontal: 'auto', alignItems: 'center', flexDirection: isPhone ? 'column' : 'row', justifyContent: 'center' }}>
                        <PlaceholderLine noMargin style={{ marginVertical: 20, width: 300, height: 70, borderRadius: 25, marginHorizontal: 10 }} />
                        <PlaceholderLine noMargin style={{ marginVertical: 20, width: 300, height: 70, borderRadius: 25, marginHorizontal: 10 }} />
                        <PlaceholderLine noMargin style={{ marginVertical: 20, width: 300, height: 70, borderRadius: 25, marginHorizontal: 10 }} />
                    </View>
                </PlaceholderRN>
            </View>
        </>
    )
}

const getStyles = (theme: Theme, isPhone: boolean) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 20,
            height: "100%",
        },
        image: {
            height: isPhone ? 100 : 140,
            width: isPhone ? 100 : 140,
            alignSelf: 'center',
        },
    });


export default Placeholder