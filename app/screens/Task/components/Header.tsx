import { View, StyleSheet, Animated, Image, Text, useWindowDimensions } from 'react-native'
import HomeButton from '@components/HomeButton'
import ContinueButton from '@components/ContinueButton'
import * as Progress from 'react-native-progress';
import AntDesign from '@expo/vector-icons/AntDesign'

import { useEffect, useState } from 'react';
import useTheme from '@hooks/useTheme'
import useTaskContext from '@hooks/useTaskContext';

import { Theme } from '@theme';

interface Props {
    progress?: number;
    showNext?: boolean;
    icon?: keyof typeof AntDesign.glyphMap;
    onPress?: () => void;
}

const Header = ({ progress, showNext, icon, onPress }: Props) => {
    const theme = useTheme()
    const [progressWidth, setProgressWidth] = useState(new Animated.Value(1))
    const [continueOpacity, setContinueOpacity] = useState(new Animated.Value(0))
    const [continueTranslateX, setContinueTranslateX] = useState(new Animated.Value(50))
    const { state, totalQuestions, headerColor, showHeader } = useTaskContext()
    const { width: screenWidth } = useWindowDimensions();
    const isPhone = screenWidth <= 768;

    const getIcon = () => {
        switch (state) {
            case 'pre':
                return require('@icons/logoOnePetal.png')
            case 'during':
                return require('@icons/logoTwoPetals.png')
            case 'post':
                return require('@icons/logoThreePetals.png')
        }
    }

    const getTitle = () => {
        switch (state) {
            case 'pre':
                return 'APRENDIZAJE'
            case 'during':
                return 'COLABORACIÓN'
            case 'post':
                return 'EVALUACIÓN'
        }
    }

    useEffect(() => {
        if (showNext) {
            Animated.parallel([
                Animated.timing(progressWidth, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(continueOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(continueTranslateX, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                })
            ]).start()
        }
    }, [showNext, progressWidth, continueOpacity, continueTranslateX])

    if (!showHeader) return null

    return (
        <View style={{ backgroundColor: theme.colors[headerColor] }}>
            <View style={getStyles(theme, isPhone).row}>
                <HomeButton
                    icon={icon}
                    accessibilityLabel="Volver al inicio"
                />
                {
                    progress && <Image source={getIcon()} resizeMode='center' style={getStyles(theme, isPhone).image} />
                }
            </View>
            {
                progress && (
                    <>
                        <Text style={getStyles(theme, isPhone).title}>{getTitle()}</Text>
                        <View style={getStyles(theme, isPhone).bar}>
                            {
                                totalQuestions && <Text style={getStyles(theme, isPhone).counter}>{progress * totalQuestions + '/' + totalQuestions}</Text>
                            }
                            <View style={getStyles(theme, isPhone).row}>
                                <Progress.Bar progress={progress} width={null} height={10} color={theme.colors.lightGreen} borderColor={theme.colors.gray} style={{ flex: 1, borderRadius: theme.borderRadius.full }} />
                            </View>
                        </View>
                    </>
                )
            }
        </View>
    )
}

const getStyles = (theme: Theme, isPhone: boolean) =>
    StyleSheet.create({
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        image: {
            height: isPhone ? 60 : 80,
            width: isPhone ? 60 : 80,
        },
        title: {
            fontSize: theme.fontSize.xxxxl,
            color: theme.colors.darkGreen,
            fontFamily: theme.fontWeight.bold,
            textAlign: 'center',
            alignSelf: 'center',
            letterSpacing: theme.spacing.medium,
            textTransform: 'uppercase',
            marginVertical: isPhone ? -10 : 0,
        },
        counter: {
            fontSize: theme.fontSize.xl,
            color: theme.colors.darkGreen,
            fontFamily: theme.fontWeight.medium,
            letterSpacing: theme.spacing.medium,
            textAlign: 'center',
            alignSelf: 'flex-end',
            paddingHorizontal: 20,
            marginBottom: -10,
        },
        bar: {
            width: '100%',
            maxWidth: 750,
            alignSelf: 'center'
        }
    })

export default Header
