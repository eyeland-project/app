import Pressable from './Pressable'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Animated, Easing } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import useTheme from '@hooks/useTheme'
import useTaskContext from '@hooks/useTaskContext'

interface Props {
    icon?: keyof typeof AntDesign.glyphMap;
}

const BackButton = ({ icon }: Props) => {
    const navigation = useNavigation()
    const theme = useTheme()
    const { resetContext } = useTaskContext()
    const scaleValue = new Animated.Value(1)

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
                resetContext()
                navigation.goBack()
            })
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
                    name={icon ? icon : "back"}
                    size={27}
                    color={theme.colors.black}
                />
            </Animated.View>
        </Pressable>
    )
}

export default BackButton
