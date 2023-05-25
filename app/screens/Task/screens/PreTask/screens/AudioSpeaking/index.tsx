import { View, Text, StyleSheet, AccessibilityInfo, ScrollView } from 'react-native';
import Record from '@screens/Task/components/Record';
import AudioPlayer from '@screens/Task/components/AudioPlayer';
import Option from '@app/screens/Task/components/Option';

import React, { useEffect, useState } from 'react';
import useTheme from '@hooks/useTheme';
import usePreTask from '@hooks/Task/PreTask/usePreTask';
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
    const styles = getStyles(theme);
    const words = question.content.split(' ');

    const { nextQuestion } = usePreTask();
    const { speak } = useTextToSpeech();
    const [recorded, setRecorded] = useState(false);

    const handlePressConfirm = () => {
        nextQuestion();
    };

    useEffect(() => {
        AccessibilityInfo.announceForAccessibility(question.content);
        speak(question.content, 'en');
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Instructions text='Grábate diciendo la frase' />
                <Text style={styles.question}>
                    {
                        words.map((word, index) => {
                            return (
                                <Text
                                    key={index}
                                >
                                    {word}{' '}
                                </Text>
                            );
                        })
                    }
                </Text>
                <AudioPlayer
                    textToSpeech={question.content}
                />
                <Text style={styles.title} accessibilityLabel="Grabación">
                    Grabación
                </Text>
                <View style={styles.secondaryContainer}>
                    <Record
                        blocked={false}
                        minimumTime={1000}
                        setRecorded={setRecorded}
                    />
                </View>
            </View>
            {recorded && (
                <View>
                    <Option
                        text="Confirmar"
                        onPress={() => {
                            handlePressConfirm();
                        }}
                        containerStyle={{}}
                        textStyle={{}}
                    />
                    <View style={styles.safeSpace} />
                </View>
            )}
        </View>
    );
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.white,
            height: '100%',
            justifyContent: 'space-between',
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
            backgroundColor: theme.colors.white,
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
        safeSpace: {
            height: 80
        }
    });

export default AudioSpeaking