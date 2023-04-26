
import { View, Text, StyleSheet, AccessibilityInfo } from 'react-native';
import Record from './components/Record';
import LottieView from 'lottie-react-native';
import Pressable from '@components/Pressable';
import { AntDesign } from '@expo/vector-icons';

import { useEffect, useRef, useState } from 'react';
import useTheme from '@hooks/useTheme';
import useRecord from '@hooks/Task/PosTask/useRecord';
import { useNavigation } from '@react-navigation/native';
import usePreTask from '@hooks/Task/PreTask/usePreTask';
import useTime from '@hooks/useTime';
import useTaskContext from '@hooks/Task/useTaskContext';
import usePreTaskContext from '@hooks/Task/PreTask/usePreTaskContext';
import useTextToSpeech from '@hooks/useTextToSpeech';

import { Theme } from '@theme';
import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface';
import Instructions from '../../components/Instructions';

interface Props {
    route: any;
}

const AudioSpeaking = ({ route }: Props) => {
    const { question } = route.params as { question: PreTaskQuestion, taskOrder: number };
    const theme = useTheme();
    const { recording, done, finished, startRecording, stopRecording } = useRecord();
    const [duration, setDuration] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);
    const { nextQuestion } = usePreTask();
    const { startTimer, stopTimer, time } = useTime();
    const { speak, playing } = useTextToSpeech();
    const { setIcon, setProgress } = useTaskContext();
    const styles = getStyles(theme);
    const animationsRef = useRef<LottieView[]>([]);
    const [wordsStyle, setWordsStyle] = useState<{}[]>([]);
    const [activeWord, setActiveWord] = useState(0);
    const words = question.content.split(' ');

    const handleOnPress = () => {
        if (recording) {
            stopRecording(1000);
        } else {
            startRecording();
        }
    };

    const getTime = async () => {
        const status = await recording?.getStatusAsync();
        setDuration(status?.durationMillis ?? null);
    };

    const onPressPlayAudio = () => {
        const wordDuration = 200;
        let wordIndex = 0;

        // Start speaking
        speak(question.content, 'en');

        // Set the active word and advance the index using a timer
        const intervalId = setInterval(() => {
            setActiveWord(wordIndex);
            wordIndex += 1;

            // Stop the timer when all words have been highlighted
            if (wordIndex >= question.content.split(' ').length) {
                clearInterval(intervalId);
            }
        }, wordDuration);
    };


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
        setWordsStyle(
            words.map(() => ({}))
        );
    }, [playing]);

    useEffect(() => {
        if (done) nextQuestion();
    }, [done]);

    useEffect(() => {
        AccessibilityInfo.announceForAccessibility(question.content);
        speak(question.content, 'en');
    }, []);

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
        };
    }, [recording]);


    useEffect(() => {
        setWordsStyle(
            words.map(() => ({
                // fontSize: theme.fontSize.xxl,
                // color: theme.colors.black,
                // fontFamily: theme.fontWeight.regular,
                // letterSpacing: theme.spacing.medium,
            }))
        );
    }, []);

    useEffect(() => {
        setWordsStyle((prevStyles) =>
            prevStyles.map((style, index) => {
                return index === activeWord ? { color: theme.colors.red } : style
            })
        );
    }, [activeWord]);



    return (
        <View style={styles.container}>
            <Instructions text='Grábate diciendo la frase' />
            <Text style={styles.question}>
                {
                    words.map((word, index) => {
                        return (
                            <Text
                                key={index}
                                style={wordsStyle[index]}
                            >
                                {word}{' '}
                            </Text>
                        );
                    })
                }
            </Text>
            {/* <Text style={styles.question}>{question.content}</Text> */}
            <Pressable
                style={styles.playerContainer}
                onPress={onPressPlayAudio}
            >
                <AntDesign
                    name="caretright"
                    size={30}
                    color={theme.colors.black}
                />
                <View style={styles.animationContainer}>
                    {[...Array(4)].map((_, index) => {
                        return (
                            <LottieView
                                key={index}
                                ref={(animation) => {
                                    if (animation)
                                        animationsRef.current[index] =
                                            animation;
                                }}
                                source={require('@animations/audioWave.json')}
                                loop={false}
                                style={styles.animation}
                            />
                        );
                    })}
                </View>
            </Pressable>
            <Text style={styles.title} accessibilityLabel="Grabación">
                Grabación
            </Text>
            <View style={styles.secondaryContainer}>
                <Record
                    blocked={false}
                    recording={recording}
                    done={done}
                    finished={finished}
                    onPress={handleOnPress}
                />
                <Text style={styles.subtitle}>
                    {recording &&
                        `Grabando... ${Math.floor(
                            (duration as number) / 1000
                        )} segundos`}
                </Text>
            </View>
            <View></View>
        </View>
    );
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: '100%',
            flex: 1
        },
        subtitle: {
            color: theme.colors.black,
            fontSize: theme.fontSize.small,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
            textAlign: 'center',
            width: 250,
            marginHorizontal: 20,
            marginTop: 30
        },
        secondaryContainer: {
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            marginRight: 10,
            marginHorizontal: 20,
            marginTop: 30,
            marginBottom: 100,
        },
        question: {
            fontSize: theme.fontSize.xxl,
            color: theme.colors.black,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
            marginHorizontal: 20
        },
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
    });

export default AudioSpeaking