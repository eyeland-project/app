import {
	TextInput as TextInputNative,
	TextInputProps as TextInputPropsNative,
	View,
	Text,
	StyleSheet
} from "react-native";

import useTheme from "@hooks/useTheme";

import { Theme } from "@theme";
import { Controller, Control } from "react-hook-form";
import { Login } from "@interfaces/Login.interface";

export interface TextInputProps extends TextInputPropsNative {
	name: 'username' | 'password';
	label?: string;
	control: Control<Login>;
	error?: string;
}

const TextInput = ({ name, label, control, error, ...props }: TextInputProps) => {
	const theme = useTheme();

	return (
		<View style={getStyles(theme).constainer}>
			{label && <Text style={getStyles(theme).text}>{label}</Text>}
			<Controller
				control={control}
				rules={{ required: true }}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInputNative
						style={getStyles(theme).input}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						placeholder={props.placeholder}
						{...props}
					/>
				)}
				name={name}
			/>
			{error && <Text style={getStyles(theme).error}>{error}</Text>}
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		constainer: {
			backgroundColor: theme.colors.primary,
			width: "100%",
			marginBottom: 20,
		},
		input: {
			borderRadius: theme.borderRadius.full,
			fontFamily: theme.fontWeight.regular,
			fontSize: theme.fontSize.medium,
			borderColor: theme.colors.gray,
			color: theme.colors.black,
			paddingVertical: 6,
			borderWidth: 2,
			paddingHorizontal: 10,
			letterSpacing: theme.spacing.medium,
			textAlign: "center",
		},
		text: {
			fontFamily: theme.fontWeight.regular,
			fontSize: theme.fontSize.small,
			color: theme.colors.black,
			letterSpacing: theme.spacing.medium,
		},
		error: {
			fontFamily: theme.fontWeight.regular,
			fontSize: theme.fontSize.small,
			color: 'red',
			letterSpacing: theme.spacing.medium,
		}
	});

export default TextInput;