import { Text, Image, PressableProps, StyleSheet } from 'react-native'
import Pressable from '@components/Pressable'
import { useState } from 'react'

import useTheme from '@hooks/useTheme'
import { Theme } from '@theme'

interface Props extends PressableProps {
    text: string
    image: any
}

const AccessibilityOption = ({ text, image, ...props }: Props) => {
    const [isPressed, setIsPressed] = useState(false)

    const theme = useTheme()

    return (
        <Pressable style={[getStyles(theme).container, { marginRight: 8, opacity: isPressed ? 0.8 : 1 }]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            {...props}
        >
            <Image style={getStyles(theme).image} source={image} />
            <Text style={getStyles(theme).text}>{text}</Text>
        </Pressable>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: 'white',
            borderRadius: theme.borderRadius.small,
            height: 110,
            width: 110,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
        },
        text: {
            color: 'black',
            fontFamily: theme.fontWeight.regular,
            fontSize: 12,
            textAlign: 'center'
        },
        image: {
            width: 60,
            height: 60,
            marginBottom: 5
        }
    })

export default AccessibilityOption