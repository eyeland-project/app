import { View, Text, StyleSheet, Image } from 'react-native'
import Person from './components/Person'
import LottieView from 'lottie-react-native';

import { useEffect, useState } from 'react'
import useTaskContext from '@hooks/useTaskContext'
import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

const Transition = () => {
    const { setProgress } = useTaskContext()
    const theme = useTheme()
    const [dialog, setDialog] = useState('¡Hola! Soy tu guía turístico. Te daré las instrucciones para que puedas realizar la actividad.')

    useEffect(() => {
        setProgress(0.1)
        const timeoutId = setTimeout(() => {
            setDialog('¡Bienvenido al recorrido! Primero, iremos hacia el puente Pumarejo')
        }, 5000)

        return () => clearTimeout(timeoutId)
    }, [])

    return (
        <View style={getStyles(theme).container}>
            <Person dialog={dialog} />
            <LottieView
                source={require('@animations/map.json')}
                autoPlay
                loop={false}
                style={getStyles(theme).animation}
            />
            {/* <View  style={getStyles(theme).imageContainer}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }}
                    style={getStyles(theme).image}
                />
            </View> */}
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: '100%',
        },
        animation: {
            width: 500,
            height: 500,
            marginLeft: -125,
        }
        // imageContainer: {
        //     marginHorizontal: 20,
        //     borderRadius: theme.borderRadius.medium,
        //     overflow: 'hidden',
        //     borderWidth: 1,
        //     marginTop: 20,
        //     borderColor: theme.colors.black,
        // },
        // image: {
        //     width: '100%',
        //     height: 300,
        // },
    })

export default Transition