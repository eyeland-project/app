import { Text, Pressable, StyleSheet, PressableProps } from "react-native";

import useTheme from "../../../core/hooks/useTheme";
import { Theme } from "../../../theme";

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
			backgroundColor: theme.colors.secondary,
			borderRadius: theme.borderRadius.medium,
			padding: 10,
			width: "100%",
			marginTop: 30,
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			...theme.shadow,
		},
		text: {
			color: theme.colors.white,
			fontSize: theme.fontSize.small,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium,
		},
	});

export default Button;