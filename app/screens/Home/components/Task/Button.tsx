import { Text, StyleSheet, PressableProps } from 'react-native';
import Pressable from '@components/Pressable';
import AntDesign from '@expo/vector-icons/AntDesign';

import useTheme from '@hooks/useTheme';
import { Theme } from '@theme';

interface ButtonProps extends PressableProps {
	text: string;
	icon?: keyof typeof AntDesign.glyphMap;
}

const Button = ({ text, style, icon, ...props }: ButtonProps) => {
	const theme = useTheme();
	const styles = getStyles(theme);

	const buttonStyles = [styles.button, style] as PressableProps['style'];

	return (
		<Pressable style={buttonStyles} {...props}>
			<Text style={styles.text}>{text}</Text>
			{icon && (
				<AntDesign
					name={icon}
					size={20}
					color={theme.colors.white}
					style={styles.icon}
				/>
			)}
		</Pressable>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		button: {
			backgroundColor: theme.colors.secondary,
			borderRadius: theme.borderRadius.full,
			padding: 10,
			paddingHorizontal: 20,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: 'auto',
			marginTop: 20,
			...theme.shadow
		},
		text: {
			color: theme.colors.white,
			fontFamily: theme.fontWeight.regular,
			fontSize: theme.fontSize.small,
			letterSpacing: theme.spacing.medium
		},
		icon: {
			marginLeft: 10
		}
	});

export default Button;
