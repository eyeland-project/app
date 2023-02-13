import { Text, StyleSheet } from "react-native";

import useTheme from "@hooks/useTheme";
import { Theme } from "@theme";

interface TitleProps {
	name: string;
}

const Title = ({ name }: TitleProps) => {
	const theme = useTheme();

	return <Text style={getStyles(theme).title}>{name}</Text>;
};

const getStyles = (theme: Theme) => StyleSheet.create({
	title: {
		fontSize: theme.fontSize.xl,
		fontFamily: theme.fontWeight.bold,
		marginBottom: 10,
		color: theme.colors.black,
		letterSpacing: theme.spacing.medium,
	},
});

export default Title;