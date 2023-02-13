import { useEffect, useState } from 'react';

import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native'
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';

import { Theme } from '@theme';

import Title from './components/Title';
import Keywords from './components/Keywords';
import Description from './components/Description';
import Placeholder from './components/Placeholder';

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
    const { setPhaseCompleted, setOnPressNext, setProgress } = useTaskContext();

    const [screenHeight, setScreenHeight] = useState(0);

    useEffect(() => {
        setScreenHeight(Dimensions.get('window').height);
    }, []);

    const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
        if ((contentHeight <= screenHeight) && !loading && data) {
            setPhaseCompleted(true);
            setOnPressNext(() => () => navigation.navigate('PreTask', { taskOrder, linkOrder: 1 }));
        } else {
            setPhaseCompleted(false);
        }
    };

    useEffect(() => {
        getIntroduction({ taskOrder });
        setProgress(0.25);
    }, []);

    return (
        <View style={getStyles(theme).container}>
            <ScrollView style={getStyles(theme).scrollView} onMomentumScrollEnd={() => setPhaseCompleted(true)} onContentSizeChange={onContentSizeChange}>
                {
                    (data && !loading) ? (
                        <>
                            <Title text={data.name} />
                            <Keywords keywords={data.keywords} />
                            <Image source={{ uri: data.thumbnailUrl }} style={getStyles(theme).image} />
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