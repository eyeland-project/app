import { View, Text, StyleSheet, StatusBar, Image } from 'react-native'
import LottieView from 'lottie-react-native';
import Option from '@screens/Task/components/Option'
import Pressable from '@components/Pressable';

import { useEffect, useCallback } from 'react';
import useTaskContext from '@hooks/useTaskContext';
import useTheme from '@hooks/useTheme'
import usePreTask from '@hooks/usePreTask';
import { useNavigation } from '@react-navigation/native';
import usePlaySound from '@app/core/hooks/usePlaySound';
import { useFocusEffect } from '@react-navigation/native';

import { Theme } from '@theme'

const Complete = () => {
    const theme = useTheme()
    const { setPreTaskComplete } = usePreTask()
    const { taskOrder, resetContext, setHeaderColor, setShowHeader } = useTaskContext()
    const navigation = useNavigation<any>()
    const playSoundSuccess = usePlaySound(require('@sounds/complete.wav'))

    const onButtonPress = () => {
        navigation.reset({
            index: 0,
            routes: [
                { name: 'Introduction', params: { taskOrder } }
            ]
        })
    }

    useFocusEffect(
        useCallback(() => {
            setPreTaskComplete({ taskOrder })
            resetContext()
            playSoundSuccess()
            setShowHeader(false)
        }, [])
    )

    return (
        <>
            <StatusBar backgroundColor={theme.colors.darkestGreen} barStyle="light-content" />
            <View style={getStyles(theme).container}>
                <Image source={require('@icons/logoWhite.png')} style={getStyles(theme).image} resizeMode='center' />
                <Text style={getStyles(theme).text}>!Muy bien!</Text>
                <Pressable onPress={() => { onButtonPress() }} style={getStyles(theme).button}>
                    <Text style={getStyles(theme).buttonText}>Volver al menú</Text>
                </Pressable>
                {/* <View>
                    <LottieView
                        source={require('@animations/celebration.json')}
                        autoPlay
                        loop
                        style={{ width: 500, position: 'absolute', top: -80, alignItems: 'center', alignSelf: 'center' }}
                    />
                    <Text style={getStyles(theme).text}>¡Felicidades, lo lograste!</Text>
                </View>
                <LottieView
                    source={require('@animations/star.json')}
                    autoPlay
                    loop={false}
                    duration={2000}
                />
                <View style={getStyles(theme).goBackContainer}>
                    <Option text='Volver al menú' onPress={() => { onButtonPress() }} containerStyle={{}} textStyle={{ fontFamily: theme.fontWeight.bold, fontSize: theme.fontSize.xl }} />
                    <View style={getStyles(theme).safeSpace} />
                </View> */}
            </View>
        </>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.darkestGreen,
            height: "100%",
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: 130,
            height: 130,
            marginBottom: 20,
        },
        text: {
            fontSize: theme.fontSize.xxxxxxl,
            fontFamily: theme.fontWeight.bold,
            color: theme.colors.white,
            letterSpacing: theme.spacing.medium,
            marginHorizontal: 20,
            marginBottom: 20,
            textAlign: "center",
        },
        button: {
            backgroundColor: theme.colors.darkGreen,
            borderRadius: theme.borderRadius.large,
            paddingVertical: 15,
            paddingHorizontal: 30,
        },
        buttonText: {
            color: theme.colors.bluerGreen,
            fontSize: theme.fontSize.xxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
        }
    })

export default Complete