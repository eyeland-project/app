import { useEffect } from 'react';

import { View, StyleSheet, Image, ScrollView } from 'react-native'

import { Theme } from '@theme';

import Title from './components/Title';
import Keywords from './components/Keywords';
import Description from './components/Description';
import Placeholder from './components/Placeholder';
import Section from './components/Section';

import useTheme from '@hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import useIntroduction from '@hooks/useIntroduction';
import useProgress from '@hooks/useProgress';
import useTaskContext from '@hooks/useTaskContext';

interface Props {
    route: any
}

const Introduction = ({ route }: Props) => {
    const { taskOrder } = route.params;

    const theme = useTheme();
    const navigation = useNavigation<any>();
    const { loading: loadingIntroduction, error: errorIntroduction, data: dataIntroduction, getIntroduction } = useIntroduction();
    const { loading: loadingProgress, error: errorProgress, data: dataProgress, getProgress } = useProgress();
    const { resetContext } = useTaskContext();

    useEffect(() => {
        getIntroduction({ taskOrder });
        getProgress({ taskOrder });
        resetContext();
    }, []);

    return (
        <View style={getStyles(theme).container}>
            <ScrollView style={getStyles(theme).scrollView}>
                {

                    (dataIntroduction && !loadingIntroduction && dataProgress && !loadingProgress) ? (
                        <>

                            <Title text={dataIntroduction.name} />
                            <Keywords keywords={dataIntroduction.keywords} />
                            <Image source={{ uri: dataIntroduction.thumbnailUrl }} style={getStyles(theme).image} />
                            <Description text={dataIntroduction.longDescription} />
                            <Section
                                title='Pre-Task'
                                completed={dataProgress.pretask.completed}
                                blocked={dataProgress.pretask.blocked}
                                onPress={() => {
                                    navigation.navigate('PreTask', { taskOrder, linkOrder: 1 });
                                }} />
                            <Section
                                title='During-Task'
                                completed={dataProgress.duringtask.completed}
                                // blocked={dataProgress.duringtask.blocked}
                                blocked={false}
                                onPress={() => {
                                    navigation.navigate('DuringTask', { taskOrder });
                                }} />
                            <Section title='PosTask'
                                completed={dataProgress.postask.completed}
                                // blocked={dataProgress.postask.blocked}
                                blocked={false}
                                onPress={() => {
                                    navigation.navigate('PosTask', { taskOrder });
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