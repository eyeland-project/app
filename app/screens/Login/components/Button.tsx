import { Text, StyleSheet, PressableProps } from 'react-native';
import Pressable from '@components/Pressable';

import useTheme from '@hooks/useTheme';
import { Theme } from '@theme';

interface ButtonProps extends PressableProps {
	title: string;
}

const Button = ({ title, ...props }: ButtonProps) => {
	const theme = useTheme();
	const styles = getStyles(theme);

	return (
		<Pressable style={styles.button} {...props}>
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		button: {
			backgroundColor: theme.colors.darkGreen,
			borderRadius: theme.borderRadius.medium,
			padding: 10,
			width: '100%',
			marginTop: 30,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			...theme.shadow
		},
		text: {
			color: theme.colors.white,
			fontSize: theme.fontSize.medium,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium
		}
	});

export default Button;
