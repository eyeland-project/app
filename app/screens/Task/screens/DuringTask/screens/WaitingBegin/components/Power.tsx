import { View, Text, StyleSheet, Image } from 'react-native'
import { Power as PowerEnum } from '@enums/Power.enum';
import Pressable from '@components/Pressable';
import { Ionicons } from '@expo/vector-icons';

import useTheme from '@hooks/useTheme';
import React, { useState, useEffect } from 'react';
import usePower from '@hooks/usePower';

import { Theme } from '@theme';
import { ShineOverlay, PlaceholderMedia, Placeholder as PlaceholderRN, } from 'rn-placeholder';


const Power = () => {
    const theme = useTheme();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<any>(null);
    const { rollPower, getMyPower, data, loading } = usePower();
    const [power, setPower] = useState<PowerEnum>(PowerEnum.MemoryPro);

    const callForPower = async () => {
        const power = await getMyPower();
        setPower(power);
    }

    useEffect(() => {
        callForPower();
    }, [])


    useEffect(() => {
        switch (power) {
            case PowerEnum.MemoryPro:
                setTitle('Memory Pro');
                setDescription('Puede recordar la traducción de los sustantivos.');
                setImage(require('@images/memoryPro.png'));
                break;
            case PowerEnum.SuperHearing:
                setTitle('Super hearing');
                setDescription('Puede recordar lo que el guía dijo.');
                setImage(require('@images/superHearing.png'));
                break;
            case PowerEnum.SuperRadar:
                setTitle('Super radar');
                setDescription('Puede recordar la traducción de las preposiciones.');
                setImage(require('@images/superRadar.png'));
                break;
        }
    }, [power])


    //TODO - Hacer placeholder mientras se carga el poder
    return (
        <View style={getStyles(theme).container}>
            {
                !loading && data
                    ? <>
                        <View style={getStyles(theme).imageContainer}>
                            <Image source={image} style={getStyles(theme).image} />
                        </View>
                        <View style={getStyles(theme).textContainer}>
                            <Text style={getStyles(theme).title}>{title}</Text>
                            <Text style={getStyles(theme).description}>{description}</Text>
                        </View>
                        <Pressable onPress={async () => {
                            setPower(await rollPower());
                        }}>
                            <View style={getStyles(theme).iconContainer}>
                                <Ionicons
                                    name="reload"
                                    size={26}
                                    color={theme.colors.primary}
                                />
                            </View>
                        </Pressable>
                    </>
                    : <PlaceholderRN
                        Animation={ShineOverlay}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <PlaceholderMedia style={{ width: 60, height: 60, borderRadius: 8 }} />
                            <PlaceholderMedia style={{ width: '60%', height: 60, borderRadius: 8 }} />

                            <PlaceholderMedia style={{ width: 50, height: 50, borderRadius: 30 }} />
                        </View>
                    </PlaceholderRN>
            }

        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            marginHorizontal: 20,
            alignItems: 'center',
        },
        iconContainer: {
            backgroundColor: theme.colors.secondary,
            width: 45,
            height: 45,
            borderRadius: theme.borderRadius.full,
            justifyContent: 'center',
            alignItems: 'center',
            ...theme.shadow
        },
        title: {
            color: theme.colors.black,
            fontSize: theme.fontSize.small,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
        },
        description: {
            color: theme.colors.black,
            fontSize: theme.fontSize.small,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
        },
        textContainer: {
            flex: 1,
            marginHorizontal: 10,
        },
        imageContainer: {
            width: 70,
            height: 70,
            borderRadius: theme.borderRadius.medium,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.yellow,
            marginBottom: 5,
            ...theme.shadow
        },
        image: {
            width: 50,
            height: 50,
        }
    })

export default Power