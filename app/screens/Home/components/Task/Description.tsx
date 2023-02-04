import { View, Text, StyleSheet } from "react-native";

import useTheme from "../../../../core/hooks/useTheme";
import { Theme } from "../../../../theme";

interface DescriptionProps {
	text: string;
}

const Description = ({ text }: DescriptionProps) => {
	const theme = useTheme();

	return (
		<View>
			<Text style={getStyles(theme).description}>{text}</Text>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		description: {
			fontFamily: theme.fontWeight.regular,
		},
	});

export default Description;