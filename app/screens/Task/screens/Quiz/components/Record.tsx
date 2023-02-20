import { StyleSheet, Animated } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import Pressable from '@components/Pressable';
import { Audio } from 'expo-av';

import { useEffect, useRef } from 'react'
import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

import { hexToRgbA } from '@app/core/utils/hexToRgba';

interface Props {
    recording: Audio.Recording | undefined
    done: boolean
    finished: boolean
    onPress: () => void
}


const Record = ({ recording, done, finished, onPress }: Props) => {
    const theme = useTheme()

    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (recording) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleValue, {
                        toValue: 1.2,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleValue, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            scaleValue.setValue(1);
        }
    }, [recording, scaleValue]);

    return (
        <Animated.View style={[getStyles(theme).containerPulse, { transform: [{ scale: scaleValue }] }]}>
            <Pressable style={getStyles(theme).container} onPress={onPress}>
                <FontAwesome5
                    name={recording ? 'stop' : done ? 'check' : finished ? 'exclamation' : 'microphone'}
                    size={70}
                    color="white" />
            </Pressable>
        </Animated.View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        containerPulse: {
            backgroundColor: hexToRgbA(theme.colors.orange, 0.5),
            width: 180,
            height: 180,
            borderRadius: theme.borderRadius.full,
            justifyContent: 'center',
            alignItems: 'center',

        },
        container: {
            backgroundColor: theme.colors.orange,
            borderRadius: theme.borderRadius.full,
            width: 150,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            ...theme.shadow
        },
    })



export default Record