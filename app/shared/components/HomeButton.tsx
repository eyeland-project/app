import Pressable from './Pressable';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Animated, Easing } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import useTheme from '@hooks/useTheme';
import useTaskContext from '@app/core/hooks/Task/useTaskContext';

interface Props {
	icon?: keyof typeof AntDesign.glyphMap;
	accessibilityLabel?: string;
}

const BackButton = ({ icon, accessibilityLabel }: Props) => {
	const navigation = useNavigation();
	const theme = useTheme();
	const { resetContext } = useTaskContext();
	const scaleValue = new Animated.Value(1);

	const scaleButton = () => {
		Animated.timing(scaleValue, {
			toValue: 0.8,
			duration: 100,
			easing: Easing.linear,
			useNativeDriver: true
		}).start(() => {
			Animated.timing(scaleValue, {
				toValue: 1,
				duration: 100,
				easing: Easing.linear,
				useNativeDriver: true
			}).start(() => {
				resetContext();
				navigation.goBack();
			});
		});
	};

	return (
		<Pressable
			onPress={() => {
				scaleButton();
			}}
			style={{ padding: 6 }}
			accessibilityLabel={accessibilityLabel}
		>
			<Animated.View style={{ transform: [{ scale: scaleValue }] }}>
				<AntDesign
					name={icon ? icon : 'home'}
					size={27}
					color={theme.colors.black}
				/>
			</Animated.View>
		</Pressable>
	);
};

export default BackButton;
