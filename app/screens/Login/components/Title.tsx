import { Text, StyleSheet } from "react-native";

import useTheme from "../../../core/hooks/useTheme";
import { Theme } from "../../../theme";

interface TitleProps {
	name: string;
}

const Title = ({ name }: TitleProps) => {
	const theme = useTheme();
	return <Text style={getStyles(theme).title}>{name}</Text>;
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		title: {
			fontSize: theme.fontSize.xxxxxxl,
			fontFamily: theme.fontWeight.bold,
			color: theme.colors.black,
			letterSpacing: theme.spacing.medium,
		},
	});

export default Title;