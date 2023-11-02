import {
	StyleSheet,
	StyleProp,
	ViewStyle,
	Text,
	TextStyle
} from 'react-native';
import Pressable from '@components/Pressable';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
	onPress: () => void;
	containerStyle: StyleProp<ViewStyle>;
	accessibilityHint?: string;
	children?: React.ReactNode;
	textStyle?: StyleProp<TextStyle>;
	text?: string;
}

const ButtonPrimary = ({
	onPress,
	containerStyle,
	accessibilityHint,
	children,
	text,
	textStyle
}: Props) => {
	const theme = useTheme();
	const styles = getStyles(theme);

	const containerStyles = StyleSheet.flatten([
		styles.container,
		containerStyle
	]);
	const textStyles = StyleSheet.flatten([styles.text, textStyle]);

	return (
		<Pressable
			style={containerStyles}
			onPress={onPress}
			accessible={accessibilityHint ? true : false}
			accessibilityHint={accessibilityHint}
			accessibilityRole="button"
		>
			{children || <Text style={textStyles}>{text}</Text>}
		</Pressable>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.black,
			marginHorizontal: 20,
			marginBottom: 20,
			borderRadius: theme.borderRadius.medium,
			paddingVertical: 10,
			justifyContent: 'center',
			alignItems: 'center',
			...theme.shadow
		},
		text: {
			color: theme.colors.white,
			fontSize: theme.fontSize.xxl,
			fontFamily: theme.fontWeight.medium,
			letterSpacing: theme.spacing.medium,
			marginHorizontal: 10
		}
	});

export default ButtonPrimary;
