import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import ButtonPrimary from '@components/ButtonPrimary';

interface Props {
	text: string;
	onPress: () => void;
	containerStyle: StyleProp<ViewStyle>;
	textStyle: StyleProp<TextStyle>;
}

const Option = ({ text, onPress, containerStyle, textStyle }: Props) => {
	return (
		<ButtonPrimary
			containerStyle={containerStyle}
			onPress={onPress}
			accessibilityHint={'Responder ' + text}
			text={text}
			textStyle={textStyle}
		/>
	);
};

export default Option;
