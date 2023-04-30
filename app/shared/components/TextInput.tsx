import {
	TextInput as TextInputNative,
	TextInputProps as TextInputPropsNative,
	View,
	Text,
	StyleSheet
} from 'react-native';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';
import { Controller, Control } from 'react-hook-form';
import { Login } from '@interfaces/Login.interface';

export interface TextInputProps extends TextInputPropsNative {
	name: 'username' | 'password';
	label: string;
	control: Control<Login>;
	error?: string;
	trim?: boolean;
}

const TextInput = ({
	name,
	label,
	control,
	error,
	trim,
	...props
}: TextInputProps) => {
	const theme = useTheme();
	const styles = getStyles(theme);

	return (
		<View style={styles.constainer}>
			<Text style={styles.text}>{label}</Text>
			<Controller
				control={control}
				rules={{ required: true }}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInputNative
						style={styles.input}
						onBlur={onBlur}
						onChangeText={trim ? (text) => onChange(text.trim()) : onChange}
						value={value}
						placeholder={props.placeholder}
						{...props}
					/>
				)}
				name={name}
			/>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		constainer: {
			backgroundColor: theme.colors.primary,
			width: '100%',
			marginBottom: 10
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
			letterSpacing: theme.spacing.medium
		},
		text: {
			fontFamily: theme.fontWeight.regular,
			fontSize: theme.fontSize.small,
			color: theme.colors.black,
			letterSpacing: theme.spacing.medium
		},
		error: {
			fontFamily: theme.fontWeight.regular,
			fontSize: theme.fontSize.small,
			color: 'red',
			letterSpacing: theme.spacing.medium
		}
	});

export default TextInput;
