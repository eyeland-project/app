import { useCallback } from 'react';

import { View, StyleSheet, Image, ScrollView } from 'react-native'

import { Theme } from '@theme';

import Title from './components/Title';
import Keywords from './components/Keywords';
import Description from './components/Description';
import Placeholder from './components/Placeholder';
import Section from './components/Section';
import ErrorScreen from '@components/ErrorScreen';

import useTheme from '@hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import useIntroduction from '@hooks/useIntroduction';
import useProgress from '@hooks/useProgress';
import useTaskContext from '@hooks/useTaskContext';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
    route: any
}

const Introduction = ({ route }: Props) => {
    const { taskOrder } = route.params;

    const theme = useTheme();
    const navigation = useNavigation<any>();
    const { loading: loadingIntroduction, error: errorIntroduction, data: dataIntroduction, getIntroduction } = useIntroduction();
    const { loading: loadingProgress, error: errorProgress, data: dataProgress, getProgress } = useProgress();
    const { resetContext, setIcon } = useTaskContext();

    useFocusEffect(
        useCallback(() => {
            getIntroduction({ taskOrder });
            getProgress({ taskOrder });
            resetContext();
            setIcon('home')
        }, [])
    );

    if (loadingIntroduction || loadingProgress) return <Placeholder />

    if (errorIntroduction || errorProgress) return <ErrorScreen error={errorIntroduction || errorProgress || 'Un error inesperado ha ocurrido'} retryAction={() => {
        getIntroduction({ taskOrder });
        getProgress({ taskOrder });
    }} />

    if (!dataIntroduction || !dataProgress) return <ErrorScreen error='No se recibió la información' retryAction={() => {
        getIntroduction({ taskOrder });
        getProgress({ taskOrder });
    }} />

    return (
        <View style={getStyles(theme).container}>
            <ScrollView
                style={getStyles(theme).scrollView}
            >
                <Title text={dataIntroduction.name} />
                <Keywords keywords={dataIntroduction.keywords} />
                <Image
                    source={{ uri: dataIntroduction.thumbnailUrl }}
                    style={getStyles(theme).image}
                    accessible
                    accessibilityLabel={dataIntroduction.thumbnailAlt}
                />
                <Description text={dataIntroduction.longDescription} />
                <Section
                    title='Aprendizaje'
                    completed={dataProgress.pretask.completed}
                    blocked={dataProgress.pretask.blocked}
                    onPress={() => {
                        navigation.navigate('PreTask', { taskOrder, linkOrder: 1 });
                    }} />
                <Section
                    title='Actividad grupal'
                    completed={dataProgress.duringtask.completed}
                    blocked={dataProgress.duringtask.blocked}
                    onPress={() => {
                        navigation.navigate('DuringTask', { taskOrder, questionOrder: 1 });
                    }} />
                <Section title='Evaluación'
                    completed={dataProgress.postask.completed}
                    blocked={dataProgress.postask.blocked}
                    onPress={() => {
                        navigation.navigate('PosTask', { taskOrder, questionOrder: 1 });
                    }} />
                <View style={{ height: 80 }} />
            </ScrollView>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            flex: 1,
        },
        scrollView: {
            backgroundColor: theme.colors.primary,
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