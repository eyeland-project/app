import { Text, StyleSheet, PressableProps } from "react-native";
import Pressable from "@components/Pressable";

import useTheme from "@hooks/useTheme";
import { Theme } from "@theme";

interface ButtonProps extends PressableProps {
	title: string;
}

const Button = ({ title, ...props }: ButtonProps) => {
	const theme = useTheme();

	return (
		<Pressable style={getStyles(theme).button} {...props}>
			<Text style={getStyles(theme).text}>{title}</Text>
		</Pressable>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		button: {
			backgroundColor: theme.colors.lightGreen,
			borderRadius: theme.borderRadius.full,
			padding: 10,
			width: "60%",
			marginTop: 15,
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			alignSelf: "center",
		},
		text: {
			color: theme.colors.darkGreen,
			fontSize: theme.fontSize.large,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium,
		},
	});

export default Button;