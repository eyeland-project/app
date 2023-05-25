import { View, StyleSheet, Platform } from 'react-native'
import Pressable from '@components/Pressable';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import { useEffect, useRef } from 'react';
import useTheme from '@hooks/useTheme';
import useMediaQuery from '@hooks/useMediaQuery';
import useTextToSpeech from '@hooks/useTextToSpeech';

import { Theme } from '@theme';
import usePlaySound from '@hooks/usePlaySound';

interface Props {
    textToSpeech?: string;
    source?: any
}

const AudioPlayer = ({ textToSpeech, source }: Props) => {
    const animationsRef = useRef<LottieView[]>([]);
    const { speak, playing } = useTextToSpeech();
    const theme = useTheme();
    const styles = getStyles(theme);
    const { isPhone, isTablet } = useMediaQuery();
    const currentPlatform = Platform.OS;
    const playSound = usePlaySound(source);

    const onPressPlayAudio = () => {
        if (textToSpeech) {
            speak(textToSpeech, 'en');
        } else if (source) {
            playSound();
        }
    }

    const toggleAnimation = () => {
        if (playing) {
            animationsRef.current?.forEach((animation) => animation.play());
        } else {
            animationsRef.current?.forEach((animation) => animation.pause());
            animationsRef.current?.forEach((animation) => animation.reset());
        }
    };
    useEffect(() => {
        toggleAnimation();
    }, [playing]);


    return (
        <Pressable
            style={styles.playerContainer}
            onPress={onPressPlayAudio}
            accessibilityLabel="Reproducir audio"
        >

            <AntDesign
                name="caretright"
                size={30}
                color={theme.colors.black}
            />

            <View style={styles.animationContainer}>
                {
                    currentPlatform !== 'web' && (
                        [...Array(isPhone ? 4 : isTablet ? 8 : 16)].map((_, index) => {
                            return (
                                <LottieView
                                    key={index}
                                    ref={(animation) => {
                                        if (animation) animationsRef.current[index] = animation;
                                    }}
                                    source={require('@animations/audioWave.json')}
                                    loop={false}
                                    style={styles.animation}
                                />
                            );
                        })
                    )
                }
            </View>
        </Pressable>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    playerContainer: {
        height: 55,
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.medium,
        marginBottom: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...theme.shadow
    },
    animationContainer: {
        flexDirection: 'row'
    },
    animation: {
        height: 72
    }
})

export default AudioPlayer