import { View, StyleSheet } from 'react-native'
import { useContext, useState, useEffect, useRef } from 'react'

import { ThemeContext } from '@contexts/ThemeContext'

import AccessibilityOption from './AccessibilityOption'

import { Theme } from '@theme'
import setStatusBarBackgroundColor from 'expo-status-bar/build/setStatusBarBackgroundColor'
import setStatusBarStyle from 'expo-status-bar/build/setStatusBarStyle'

interface OptionsProps {
    unShowOptions: () => void
}

// TODO - Refactor this component to make it more readable
const Options = ({ unShowOptions }: OptionsProps) => {
    const [highContrast, setHighContrast] = useState(false)
    const [largeText, setLargeText] = useState(0)
    const [fontFamily, setFontFamily] = useState(0)
    const [spacing, setSpacing] = useState(0)

    const [theme, modifyTheme] = useContext(ThemeContext)

    const initialRender = useRef(true)

    const handleHighContrast = () => {
        setHighContrast(!highContrast)
    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        } else {
            modifyTheme({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary: highContrast ? '#000' : '#fff',
                    secondary: highContrast ? '#fff' : '#000',
                    white: highContrast ? '#000' : '#fff',
                    black: highContrast ? '#fff' : '#000'
                },
                shadow: {
                    ...theme.shadow,
                    shadowColor: highContrast ? '#fff' : '#000'
                }
            })
            setStatusBarBackgroundColor(highContrast ? '#000' : '#fff', false)
            setStatusBarStyle(highContrast ? 'light' : 'dark')
        }
    }, [highContrast])

    const handleLargeText = () => {
        if (largeText < 3) {
            setLargeText(largeText + 1)
            modifyTheme({
                ...theme,
                fontSize: {
                    ...theme.fontSize,
                    xs: theme.fontSize.xs + 2,
                    small: theme.fontSize.small + 2,
                    medium: theme.fontSize.medium + 2,
                    large: theme.fontSize.large + 2,
                    xl: theme.fontSize.xl + 2,
                    xxl: theme.fontSize.xxl + 2,
                    xxxl: theme.fontSize.xxxl + 2,
                    xxxxl: theme.fontSize.xxxxl + 2,
                    xxxxxxl: theme.fontSize.xxxxxxl + 2
                }
            })
        } else {
            setLargeText(0)
            modifyTheme({
                ...theme,
                fontSize: {
                    ...theme.fontSize,
                    xs: 12,
                    small: 14,
                    medium: 16,
                    large: 18,
                    xl: 20,
                    xxl: 24,
                    xxxl: 28,
                    xxxxl: 32,
                    xxxxxl: 36,
                    xxxxxxl: 40,
                }
            })
        }
    }

    const handleFontFamily = () => {
        if (fontFamily === 0) {
            setFontFamily(fontFamily + 1)
            modifyTheme({
                ...theme,
                fontWeight: {
                    ...theme.fontWeight,
                    regular: 'Roboto-Regular',
                    medium: 'Roboto-Medium',
                    bold: 'Roboto-Bold',
                }
            })
        } else if (fontFamily === 1) {
            setFontFamily(fontFamily + 1)
            modifyTheme({
                ...theme,
                fontWeight: {
                    ...theme.fontWeight,
                    regular: 'Ubuntu-Regular',
                    medium: 'Ubuntu-SemiBold',
                    bold: 'Ubuntu-Bold',
                }
            })
        } else if (fontFamily === 2) {
            setFontFamily(0)
            modifyTheme({
                ...theme,
                fontWeight: {
                    ...theme.fontWeight,
                    regular: 'Poppins-Regular',
                    medium: 'Poppins-Medium',
                    bold: 'Poppins-Bold',
                }
            })
        }
    }

    const handleSpacing = () => {
        if (spacing < 4) {
            setSpacing(spacing + 1)
            modifyTheme({
                ...theme,
                spacing: {
                    ...theme.spacing,
                    medium: theme.spacing.medium + 2,
                    large: theme.spacing.large + 2
                }
            })
        } else {
            setSpacing(0)
            modifyTheme({
                ...theme,
                spacing: {
                    ...theme.spacing,
                    medium: 0,
                    large: 2
                }
            })
        }
    }

    return (
        <View style={getStyles(theme).container}>
            <View style={[getStyles(theme).row, { marginBottom: 8 }]}>
                <AccessibilityOption
                    text='Alto contraste'
                    image={require('@icons/contrast.png')}
                    onPress={handleHighContrast}
                />
                <AccessibilityOption
                    text='Agrandar texto'
                    image={require('@icons/increaseFont.png')}
                    onPress={handleLargeText}
                />
            </View>
            <View style={[getStyles(theme).row]}>
                <AccessibilityOption
                    text='Fuentes legibles'
                    image={require('@icons/fontFamily.png')}
                    onPress={handleFontFamily}
                />
                <AccessibilityOption
                    text='Aumentar espaciado'
                    image={require('@icons/spacing.png')}
                    onPress={handleSpacing}
                />
            </View>
            <View style={getStyles(theme).triangle} />
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            position: 'absolute',
            bottom: 80,
            right: 0,
            backgroundColor: 'black',
            borderRadius: theme.borderRadius.medium,
            padding: 8,
            paddingRight: 0,
            ...theme.shadow
        },
        row: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
        },
        triangle: {
            position: 'absolute',
            bottom: -15,
            right: 5,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 20,
            borderRightWidth: 20,
            borderBottomWidth: 20,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'black',
            transform: [
                { rotate: '180deg' }
            ]
        }
    })


export default Options