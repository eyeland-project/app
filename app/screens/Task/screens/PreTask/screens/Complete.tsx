import { View, Text, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native';
import Option from '@screens/Task/components/Option'

import { useEffect } from 'react';
import useTaskContext from '@hooks/useTaskContext';
import useTheme from '@hooks/useTheme'
import usePreTask from '@hooks/usePreTask';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '@theme'

const Complete = () => {
    const theme = useTheme()
    const { setPreTaskComplete } = usePreTask()
    const { taskOrder } = useTaskContext()
    const navigation = useNavigation<any>()

    const onButtonPress = () => {
        navigation.reset({
            index: 0,
            routes: [
                { name: 'Introduction', params: { taskOrder } }
            ]
        })
    }

    useEffect(() => {
        setPreTaskComplete({ taskOrder })
    }, [])

    return (
        <View style={getStyles(theme).container}>
            <View>
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
            <View>
                <Option text='Volver al menú' onPress={() => { onButtonPress() }} containerStyle={{}} textStyle={{ fontFamily: theme.fontWeight.regular, fontSize: theme.fontSize.xl }} />
                <View style={getStyles(theme).safeSpace} />
            </View>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: "100%",
            justifyContent: "space-between",
        },
        text: {
            fontSize: theme.fontSize.xxxxxxl,
            fontFamily: theme.fontWeight.bold,
            color: theme.colors.black,
            letterSpacing: theme.spacing.medium,
            marginHorizontal: 20,
            marginTop: 20,
            textAlign: "center",
        },
        safeSpace: {
            height: 80,
        },
        animationsContainer: {
            alignItems: "center",
            position: "relative",
        }
    })

export default Complete