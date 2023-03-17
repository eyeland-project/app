import { View, Text, StyleSheet } from 'react-native'
import Title from '../../components/Title'
import LottieView from 'lottie-react-native';
import Power from './components/Power';
import Placeholder from './components/Placeholder';

import { useEffect } from 'react';
import useTheme from '@hooks/useTheme'
import useTaskContext from '@hooks/useTaskContext';
import useTeam from '@hooks/useTeam';
import { useDuringTaskContext } from '@hooks/useDuringTaskContext';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '@theme'
import { SocketEvents } from '@enums/SocketEvents.enum';
import { Power as PowerEnum } from '@enums/Power.enum';

interface Props {
    route: any
}

const WaitingBegin = ({ route }: Props) => {
    const { taskOrder } = route.params
    const theme = useTheme()
    const { resetContext } = useTaskContext()
    const { loading, data, getMyTeam } = useTeam()
    const { socket, power, setPower } = useDuringTaskContext()
    const navigation = useNavigation<any>()

    const init = async () => {
        await getMyTeam()
    }

    useEffect(() => {
        if (data) setPower(data.myPower)
    }, [data])

    useEffect(() => {
        resetContext()
        init()

        socket.on(SocketEvents.sessionTeacherStart, () => {
            navigation.navigate('Question', { taskOrder, questionOrder: 1 })
        })

        socket.on(SocketEvents.TeamStudentUpdate, (data: { power: PowerEnum }) => {
            setPower(data.power)
        })

        return () => {
            socket.off(SocketEvents.sessionTeacherStart)
            socket.off(SocketEvents.TeamStudentUpdate)
        }
    }, [])

    if (!data || loading) return null

    return (
        <View
            style={getStyles(theme).container}
            accessible
            accessibilityLabel="Pantalla de espera para comenzar la actividad"
        >
            {!loading && data ? (
                <>
                    <Title text={data.name} />
                    <Text
                        style={getStyles(theme).title}
                        accessible
                        accessibilityRole="header"
                        accessibilityLabel="Instrucciones"
                    >
                        Instrucciones
                    </Text>
                    <Text
                        style={getStyles(theme).description}
                        accessible
                        accessibilityLabel="Avanza respondiendo a las preguntas que te haga el guía turístico en cada parada obligada."
                    >
                        Avanza respondiendo a las preguntas que te haga el guía turístico en
                        cada parada obligada.
                    </Text>
                    <Text
                        style={getStyles(theme).title}
                        accessible
                        accessibilityRole="header"
                        accessibilityLabel="Tu super poder es"
                    >
                        Tu super poder es
                    </Text>
                    <Power
                        powerProp={power}
                        blockReRoll={data.students.length >= 3}
                    />
                    <LottieView
                        source={require('@animations/waitingBegin.json')}
                        autoPlay
                        loop
                        style={getStyles(theme).animation}
                    />
                    <Text
                        style={getStyles(theme).waitingText}
                        accessible
                        accessibilityLabel="Espera a que tu profesor de comienzo a la actividad..."
                    >
                        Espera a que tu profesor de comienzo a la actividad...
                    </Text>
                </>
            ) : (
                <Placeholder />
            )}
        </View>
    );
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: '100%',
            flex: 1,
            alignItems: 'center',
        },
        animation: {
            width: 300,
            height: 300,
        },
        title: {
            color: theme.colors.black,
            fontSize: theme.fontSize.large,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            paddingHorizontal: 20,
            alignSelf: 'flex-start',
        },
        description: {
            color: theme.colors.black,
            fontSize: theme.fontSize.medium,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
            width: '100%',
            paddingHorizontal: 20,
            marginBottom: 20,
        },
        waitingText: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            paddingHorizontal: 20,
            marginBottom: 20,
            textAlign: 'center',
        }
    })

export default WaitingBegin