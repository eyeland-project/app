import { useEffect } from 'react';

import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';

import { Theme } from '../../theme';

import Title from './components/Title';
import BackButton from '../../shared/components/BackButton';
import Keywords from './components/Keywords';
import Description from './components/Description';
import ContinueButton from '../../shared/components/ContinueButton';
import Placeholder from './components/Placeholder';

import useTheme from '../../core/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import useIntroduction from '../../core/hooks/useIntroduction';

import { INTRODUCTION } from '../../shared/mocks/INTRODUCTION';

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
    // const { loading, error, data, getIntroduction } = useIntroduction();

    // useEffect(() => {
    //     getIntroduction({ taskOrder });
    // }, []);

    const data = INTRODUCTION // MOCK DATA
    const loading = false; // MOCK DATA

    if (!data) {
        return null;
    } // Temporal

    return (
        <View style={getStyles(theme).container}>
            <View style={getStyles(theme).row}>
                <BackButton />
                <ContinueButton onPress={() => {
                    navigation.navigate('PreTask', { taskOrder, linkOrder: 0 })
                }} />
            </View>
            <ScrollView style={getStyles(theme).scrollView}>
                {
                    (data && !loading) ? (
                        <>
                            <Title text={data.name} />
                            <Keywords keywords={data.keywords} />
                            <Image source={{ uri: data.thumbnail }} style={getStyles(theme).image} />
                            <Description text={data.longDescription} />
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
            paddingTop: 10,
        },
        scrollView: {
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 20,
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.xxxl,
            fontFamily: theme.fontWeight.bold,
        },
        image: {
            width: '100%',
            height: 200,
            borderRadius: theme.borderRadius.medium,
            marginBottom: 40,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
        },
    })


export default Introduction