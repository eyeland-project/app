import {
	View,
	Text,
	StyleSheet,
	StyleProp,
	ViewStyle,
	TextStyle,
	Image
} from 'react-native';
import Pressable from '@components/Pressable';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
	text: string;
	onPress: () => void;
	containerStyle: StyleProp<ViewStyle>;
	textStyle: StyleProp<TextStyle>;
	imgUrl: string | null;
}

const OptionImage = ({
	text,
	onPress,
	containerStyle,
	textStyle,
	imgUrl
}: Props) => {
	const theme = useTheme();
	const styles = getStyles(theme);

	const textBoxStyles = StyleSheet.flatten([styles.textBox, containerStyle]);
	const textStyles = StyleSheet.flatten([styles.text, textStyle]);

	return (
		<View style={styles.container}>
			<Image
				// source={require('@images/choose_habitat_1.jpg')}
				source={{
					uri:
						imgUrl ||
						`https://picsum.photos/400/200?t=${Math.floor(
							Math.random() * 100
						)}}`
				}}
				style={styles.image}
			/>
			<Pressable
				style={textBoxStyles}
				onPress={onPress}
				accessible={true}
				accessibilityHint={'Responder ' + text}
			>
				<Text style={textStyles}>{text}</Text>
			</Pressable>
		</View>
	);
};

const getStyles = (theme: Theme) => {
	const size = 160;

	return StyleSheet.create({
		container: {
			width: size,
			height: size,
			borderRadius: size / 2,
			position: 'relative'
			// ...theme.shadow
		},
		textBox: {
			backgroundColor: theme.colors.black,
			borderRadius: theme.borderRadius.medium,
			paddingVertical: 10,
			justifyContent: 'center',
			alignItems: 'center',
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: -size / 4,
			...theme.shadow
		},
		text: {
			color: theme.colors.white,
			fontSize: theme.fontSize.xxl,
			fontFamily: theme.fontWeight.medium,
			letterSpacing: theme.spacing.medium,
			marginHorizontal: 10
		},
		image: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			borderRadius: size / 2
		}
	});
};

export default OptionImage;
