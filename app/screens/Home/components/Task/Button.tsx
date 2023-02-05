import { Pressable, Text, StyleSheet, PressableProps } from "react-native";

import useTheme from "../../../../core/hooks/useTheme";
import { Theme } from "../../../../theme";

interface ButtonProps extends PressableProps {
	text: string;
}

const Button = ({ text, style, ...props }: ButtonProps) => {
	const theme = useTheme();

	const buttonStyles = [getStyles(theme).button, style] as PressableProps["style"];

	return (
		<Pressable style={buttonStyles} {...props}>
			<Text style={getStyles(theme).text}>{text}</Text>
		</Pressable>
	);
};

const getStyles = (theme: Theme) => StyleSheet.create({
	button: {
		backgroundColor: theme.colors.secondary,
		borderRadius: theme.borderRadius.full,
		padding: 10,
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: "auto",
		marginTop: 20,
		...theme.shadow
	},
	text: {
		color: theme.colors.white,
		fontFamily: theme.fontWeight.regular,
		fontSize: theme.fontSize.small,
		letterSpacing: theme.spacing.medium
	},
});

export default Button;