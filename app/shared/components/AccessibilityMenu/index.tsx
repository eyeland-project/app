import { View, StyleSheet, Image, Pressable } from 'react-native'
import { useState } from 'react'

import Options from './Options'

import useTheme from '../../../core/hooks/useTheme'
import { Theme } from '../../../theme'

const Accessibility = () => {
    const [showOptions, setShowOptions] = useState(false)

    const theme = useTheme()

    return (
        <View style={getStyles(theme).container}>
            {
                showOptions && <Options />
            }
            <Pressable
                onPress={() => setShowOptions(!showOptions)}
            >
                <Image style={getStyles(theme).image} source={require('../../../../assets/icons/accessibility.png')} />
            </Pressable>
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    image: {
        width: 55,
        height: 55,
    }
})

export default Accessibility