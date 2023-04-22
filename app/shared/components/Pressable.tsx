import { Pressable as PressableNative, PressableProps } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import usePlaySound from '@hooks/usePlaySound';

interface Props extends PressableProps {
	onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}

const Pressable = ({ onPress, ...props }: Props) => {
	const playSound = usePlaySound(require('@sounds/tap.wav'));

	return (
		<PressableNative
			onPress={(event) => {
				playSound();
				if (onPress) {
					onPress(event);
				}
			}}
			{...props}
		/>
	);
};

export default Pressable;
