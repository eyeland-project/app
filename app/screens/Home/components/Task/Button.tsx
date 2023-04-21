import { Text, StyleSheet, PressableProps } from "react-native";
import Pressable from "@components/Pressable";
import AntDesign from '@expo/vector-icons/AntDesign'

import useTheme from "@hooks/useTheme";
import { Theme } from "@theme";

interface ButtonProps extends PressableProps {
	text: string;
	icon?: keyof typeof AntDesign.glyphMap;
}

const Button = ({ text, style, icon, ...props }: ButtonProps) => {
	const theme = useTheme();

	const buttonStyles = [getStyles(theme).button, style] as PressableProps["style"];

	return (
		<Pressable style={buttonStyles} {...props}>
			<Text style={getStyles(theme).text}>{text}</Text>
			{icon && (
				<AntDesign
					name={icon}
					size={23}
					color={theme.colors.white}
					style={getStyles(theme).icon}
				/>
			)}
		</Pressable>
	);
};

const getStyles = (theme: Theme) => StyleSheet.create({
	button: {
		backgroundColor: theme.colors.darkGreen,
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
		fontFamily: theme.fontWeight.bold,
		fontSize: theme.fontSize.small,
		letterSpacing: theme.spacing.medium,
	},
	icon: {
		marginLeft: 10,
	}
});

export default Button;