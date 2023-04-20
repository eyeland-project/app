import React, { Dispatch, SetStateAction, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, Pressable, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import FlipCardNative from 'react-native-flip-card';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';
import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface';

interface Props {
    question: PreTaskQuestion;
    optionIndex: number;
    optionsQuestionShuffled: { content: string, correct: boolean, id: number }[];
    containerCardStyle: {};
    isFlipped: boolean;
    containerStyle: {}
    setIsFlipped: Dispatch<SetStateAction<boolean>>
}

const FlipCard = ({ question, optionIndex, optionsQuestionShuffled, containerCardStyle, isFlipped, containerStyle, setIsFlipped }: Props) => {
    const theme = useTheme();

    return (
        <Pressable
            onPress={() => { setIsFlipped(!isFlipped) }}
            accessibilityLabel="Presiona dos veces para girar la tarjeta"
            accessibilityRole="button"
        >
            <Animated.View style={[getStyles(theme, isFlipped).imageContainer, containerStyle]}
                accessible={true}
                accessibilityLabel="Voltear tarjeta"
                accessibilityRole="button">

                {
                    isFlipped ? (
                        <View
                            style={getStyles(theme, isFlipped).back}
                            accessible={true}
                            accessibilityLabel="Parte trasera de la tarjeta">
                            {
                                !question.imgUrl ? (
                                    <Text style={getStyles(theme, isFlipped).backText}>{question.content}</Text>
                                ) : (
                                    <ImageBackground
                                        style={getStyles(theme, isFlipped).image}
                                        source={{ uri: question.imgUrl }}
                                        resizeMode='cover'
                                        accessible={true}
                                        accessibilityLabel={question.imgAlt + ". Toca dos veces para girar la tarjeta"}
                                    >
                                    </ImageBackground>
                                )
                            }
                        </View>
                    ) : (
                        <View
                            style={[getStyles(theme, isFlipped).back, containerCardStyle]}
                            accessible={true}
                            accessibilityLabel={optionsQuestionShuffled[optionIndex].content + ". Toca dos veces para girar la tarjeta"}>
                            <Text style={getStyles(theme, isFlipped).backText} >{optionsQuestionShuffled[optionIndex].content}</Text>
                        </View>
                    )
                }
                <Image style={[getStyles(theme, isFlipped).lapel, isFlipped ? { right: -10 } : { left: -10 }]} source={require('@images/lapel.png')} />
            </Animated.View>
        </Pressable>
    );
};

const getStyles = (theme: Theme, isFlipped: boolean) =>
    StyleSheet.create({
        imageContainer: {
            marginHorizontal: 20,
            height: 260,
            width: 385,
            maxWidth: '90%',
            alignSelf: 'center',
            borderTopLeftRadius: theme.borderRadius.medium,
            borderTopRightRadius: theme.borderRadius.medium,
            borderBottomLeftRadius: isFlipped ? theme.borderRadius.medium : 50,
            borderBottomRightRadius: isFlipped ? 50 : theme.borderRadius.medium,
            overflow: 'hidden',
            borderColor: theme.colors.lightGreen,
            borderWidth: 10,
        },
        image: {
            width: '100%',
            height: '100%',
        },
        back: {
            backgroundColor: theme.colors.darkGreen,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        backText: {
            fontSize: theme.fontSize.xxxl,
            fontFamily: theme.fontWeight.bold,
            color: theme.colors.white,
            letterSpacing: theme.spacing.medium,
        },
        flipIndicator: {
            position: 'absolute',
            bottom: 10,
            right: 10,
            transform: [{ rotate: '45deg' }],
        },
        lapel: {
            position: 'absolute',
            bottom: -10,
            width: 60,
            height: 60,
            transform: isFlipped ? [] : [{ rotateY: '180deg' }]
        }
    });

export default FlipCard;
