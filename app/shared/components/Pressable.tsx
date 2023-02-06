import { Pressable as PressableNative, PressableProps } from 'react-native'
import { GestureResponderEvent } from 'react-native';
import usePlaySound from '../../core/hooks/usePlaySound'


interface Props extends PressableProps {
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined
}


const Pressable = ({ onPress, ...props }: Props) => {
    const playSound = usePlaySound(require('../../../assets/sounds/tap.wav'))

    return (
        <PressableNative onPress={
            (event) => {
                playSound()
                if (onPress) {
                    onPress(event)
                }
            }
        }  {...props} />
    )
}

export default Pressable