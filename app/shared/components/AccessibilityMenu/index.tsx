import { View, StyleSheet, Image, Pressable, Dimensions } from 'react-native'
import { useState, useEffect } from 'react'

import Options from './Options'

import useTheme from '../../../core/hooks/useTheme'
import { Theme } from '../../../theme'

const Accessibility = () => {
    const [showOptions, setShowOptions] = useState(false)

    const theme = useTheme()

    const unShowOptions = () => {
        setShowOptions(false)
    }

    return (
        <>
            {showOptions && <Pressable style={getStyles(theme).transparent} onPress={unShowOptions} />}
            <View style={getStyles(theme).container}>
                {
                    showOptions && <Options unShowOptions={unShowOptions} />
                }
                <Pressable
                    onPress={() => setShowOptions(!showOptions)}
                >
                    <Image style={getStyles(theme).image} source={require('../../../../assets/icons/accessibility.png')} />
                </Pressable>
            </View>
        </>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    transparent: {
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'trasparent',
        bottom: 0,
    },
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