import {
	TextInput as TextInputNative,
	TextInputProps,
	View,
	Text,
	StyleSheet
} from "react-native";

import useTheme from "../../core/hooks/useTheme";

import { Theme } from "../../theme";


const TextInput = (props: TextInputProps) => {
	const theme = useTheme();

	return (
		<View style={getStyles(theme).constainer}>
			<Text style={getStyles(theme).text}>{props.placeholder}</Text>
			<TextInputNative style={getStyles(theme).input} {...props} placeholder="" />
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		constainer: {
			backgroundColor: theme.colors.primary,
			width: "100%",
			marginBottom: 10,
		},
		input: {
			borderRadius: theme.borderRadius.medium,
			fontFamily: theme.fontWeight.regular,
			fontSize: theme.fontSize.small,
			borderColor: theme.colors.black,
			color: theme.colors.black,
			paddingVertical: 6,
			borderWidth: 1,
			paddingHorizontal: 10,
			letterSpacing: theme.spacing.medium,
		},
		text: {
			fontFamily: theme.fontWeight.regular,
			fontSize: theme.fontSize.small,
			color: theme.colors.black,
			letterSpacing: theme.spacing.medium,
		},
	});

export default TextInput;