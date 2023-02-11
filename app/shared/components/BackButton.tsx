import Pressable from './Pressable'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import useTheme from '../../core/hooks/useTheme'
import { Animated, Easing } from 'react-native'

const BackButton = () => {
    const navigation = useNavigation()
    const theme = useTheme()
    const scaleValue = new Animated.Value(1)

    const scaleButton = () => {
        Animated.timing(scaleValue, {
            toValue: 0.8,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 150,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(() => navigation.goBack())
        })
    }

    return (
        <Pressable
            onPress={() => {
                scaleButton()
            }}
            style={{ padding: 4 }}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <AntDesign
                    name="arrowleft"
                    size={30}
                    color={theme.colors.black}
                />
            </Animated.View>
        </Pressable>
    )
}

export default BackButton
