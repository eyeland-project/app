import { View, Text, StyleSheet } from 'react-native'
import Title from '../../components/Title'
import LottieView from 'lottie-react-native';
import Power from './components/Power';

import { useEffect } from 'react';
import useTheme from '@hooks/useTheme'
import useTaskContext from '@hooks/useTaskContext';
import useTeam from '@hooks/useTeam';

import { Theme } from '@theme'
import Placeholder from './components/Placeholder';

const WaitingBegin = () => {
    const theme = useTheme()
    const { resetContext } = useTaskContext()
    const { loading, data, getMyTeam } = useTeam()

    useEffect(() => {
        resetContext()
        getMyTeam()
    }, [])

    return (
        <View style={getStyles(theme).container}>
            {
                !loading && data
                    ? <>
                        <Title text={data.name} />
                        <Text style={getStyles(theme).title}>Instrucciones</Text>
                        <Text style={getStyles(theme).description}>Avanza respondiendo a las preguntas que te haga el guía turístico en cada parada obligada.</Text>
                        <Text style={getStyles(theme).title}>Tu super poder es</Text>
                        <Power powerProp={data.myPower} blockReRoll={data.students.length >= 3} />
                        <LottieView
                            source={require('@animations/waitingBegin.json')}
                            autoPlay
                            loop
                            style={getStyles(theme).animation}
                        />
                        <Text style={getStyles(theme).waitingText}>Espera a que tu profesor de comienzo a la actividad...</Text>
                    </>
                    : <Placeholder />
            }
        </View>
    )
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