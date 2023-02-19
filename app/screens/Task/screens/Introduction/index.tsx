import { useEffect, useState } from 'react';

import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native'
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';

import { Theme } from '@theme';

import Title from './components/Title';
import Keywords from './components/Keywords';
import Description from './components/Description';
import Placeholder from './components/Placeholder';
import Section from './components/Section';

import useTheme from '@hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import useIntroduction from '@hooks/useIntroduction';
import useTaskContext from '@hooks/useTaskContext';

import { INTRODUCTION } from '@mocks/INTRODUCTION';

interface TaskParams {
    taskOrder: number;
}

interface Props {
    route: RouteProp<ParamListBase, 'Introduction'> & {
        params: TaskParams;
    };
}

const Introduction = ({ route }: Props) => {
    const { taskOrder } = route.params;

    const theme = useTheme();
    const navigation = useNavigation<any>();
    const { loading, error, data, getIntroduction } = useIntroduction();
    const { resetContext } = useTaskContext();

    useEffect(() => {
        getIntroduction({ taskOrder });
        resetContext();
    }, []);

    return (
        <View style={getStyles(theme).container}>
            <ScrollView style={getStyles(theme).scrollView}>
                {

                    (data && !loading) ? (
                        <>

                            <Title text={data.name} />
                            <Keywords keywords={data.keywords} />
                            <Image source={{ uri: data.thumbnailUrl }} style={getStyles(theme).image} />
                            <Description text={data.longDescription} />
                            <Section
                                title='Pre-Task'
                                completed={true}
                                blocked={false}
                                onPress={() => {
                                    navigation.navigate('PreTask', { taskOrder, linkOrder: 1 });
                                }} />
                            <Section
                                title='During-Task'
                                completed={false}
                                blocked={false}
                                onPress={() => {
                                    navigation.navigate('DuringTask', { taskOrder });
                                }} />
                            <Section title='Quiz'
                                completed={false}
                                blocked={true}
                                onPress={() => {
                                    navigation.navigate('Quiz', { taskOrder });
                                }} />
                        </>
                    ) : (
                        <Placeholder />
                    )
                }

            </ScrollView>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: '100%',
        },
        scrollView: {
            backgroundColor: theme.colors.primary,
            paddingBottom: 80,
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xxxl,
            fontFamily: theme.fontWeight.bold,
        },
        image: {
            height: 200,
            borderRadius: theme.borderRadius.medium,
            marginBottom: 20,
            marginHorizontal: 20,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
        },
    })


export default Introduction