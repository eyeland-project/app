import { View, Text, StyleSheet } from 'react-native'
import Record from './components/Record'
import { RecordingStatus } from 'expo-av/build/Audio'

import { useEffect, useState } from 'react'
import useTheme from '@hooks/useTheme'
import useRecord from '@hooks/useRecord'

import { Theme } from '@theme'

interface Props {
    route: any
}

const Quiz = ({ route }: Props) => {
    const theme = useTheme()
    const { recording, done, finished, startRecording, stopRecording } = useRecord()
    const [duration, setDuration] = useState<number | null>(null);


    const handleOnPress = () => {
        if (recording) {
            stopRecording()
        } else {
            startRecording()
        }
    }

    const getTime = async () => {
        const status = await recording?.getStatusAsync()
        setDuration(status?.durationMillis ?? null);
    }

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        if (recording) {
            getTime();
            intervalId = setInterval(() => {
                getTime();
            }, 1000);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, [recording]);

    //MOCK DATA
    const data = {
        question: 'What do you think is the best way to learn a new language?'
    }

    return (
        <View style={getStyles(theme).container}>
            <Text style={getStyles(theme).text}>{data.question}</Text>
            <View style={getStyles(theme).secondaryContainer}>
                <Record
                    recording={recording}
                    done={done}
                    finished={finished}
                    onPress={handleOnPress}
                />
                <Text style={getStyles(theme).subtitle}>
                    {
                        recording
                            ? `Recording... ${Math.floor((duration as number) / 1000)} seconds`
                            : 'Recuerda que el audio debe durar más de 20 segundos'}
                </Text>
            </View>
            <View></View>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: '100%',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xxl,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
            marginHorizontal: 20,
            marginTop: 20,
        },
        subtitle: {
            color: theme.colors.black,
            fontSize: theme.fontSize.small,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
            textAlign: 'center',
            width: 250,
            marginHorizontal: 20,
            marginTop: 30,
        },
        secondaryContainer: {
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })

export default Quiz