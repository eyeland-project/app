import Pressable from './Pressable'

import AntDesign from '@expo/vector-icons/AntDesign'

import { useNavigation } from '@react-navigation/native'

const BackButton = () => {
    const navigation = useNavigation()

    return (
        <Pressable onPress={() => navigation.goBack()} style={{ padding: 4 }}>
            <AntDesign name="arrowleft" size={30} color="black" />
        </Pressable>
    )
}

export default BackButton