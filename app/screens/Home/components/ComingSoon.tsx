import { View, Text, Image, StyleSheet } from "react-native";

import useTheme from "@hooks/useTheme";
import { Theme } from "@theme";

const ComingSoon = () => {
	const theme = useTheme();

	return (
		<View style={getStyles(theme).container}>
			<Image
				source={require("@images/comingSoon.png")}
				style={getStyles(theme).image}
			/>
			<Text style={getStyles(theme).text}>Coming soon...</Text>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			marginBottom: 200,
		},
		image: {
			width: 100,
			height: 100,
			marginTop: 50,
			marginBottom: 20,
		},
		text: {
			fontFamily: theme.fontWeight.regular,
			fontSize: theme.fontSize.xl,
			textAlign: "center",
			color: theme.colors.black,
		},
	});

export default ComingSoon;