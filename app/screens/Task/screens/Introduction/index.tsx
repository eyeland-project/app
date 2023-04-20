
import { View, StyleSheet, Image, Text, Modal, StatusBar, useWindowDimensions } from 'react-native'
import Title from './components/Title';
import Keywords from './components/Keywords';
import Description from './components/Description';
import Placeholder from './components/Placeholder';
import Section from './components/Section';
import ErrorScreen from '@components/ErrorScreen';
import Pressable from '@components/Pressable';
import ContextButton from './components/ContextButton';
import ContextModal from './components/ContextModal';

import { useCallback, useState } from 'react';
import useTheme from '@hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import useIntroduction from '@hooks/useIntroduction';
import useProgress from '@hooks/useProgress';
import useTaskContext from '@hooks/useTaskContext';
import { useFocusEffect } from '@react-navigation/native';

import { hexToRgbA } from '@utils/hexToRgba';

import { Theme } from '@theme';

interface Props {
    route: any
}

const Introduction = ({ route }: Props) => {
    const { taskOrder } = route.params;

    const theme = useTheme();
    const navigation = useNavigation<any>();
    const { loading: loadingIntroduction, error: errorIntroduction, data: dataIntroduction, getIntroduction } = useIntroduction();
    const { loading: loadingProgress, error: errorProgress, data: dataProgress, getProgress } = useProgress();
    const { resetContext, setIcon, setState } = useTaskContext();
    const [showModal, setShowModal] = useState(false);

    const { width: screenWidth } = useWindowDimensions();
    const isPhone = screenWidth <= 768;

    const getIcon = () => {
        if (dataProgress) {
            if (!dataProgress.postask.blocked) {
                return require('@icons/logoThreePetals.png')
            }
            if (!dataProgress.duringtask.blocked) {
                return require('@icons/logoTwoPetals.png')
            }
            if (!dataProgress.pretask.blocked) {
                return require('@icons/logoOnePetal.png')
            }
        }
    }

    const toggleModal = () => {
        setShowModal(!showModal);
    }

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
        <>
            <StatusBar backgroundColor={theme.colors.white} barStyle="dark-content" />
            <View style={getStyles(theme, isPhone).container}>
                <Image source={getIcon()} resizeMode='center' style={getStyles(theme, isPhone).image} />
                <Title text={dataIntroduction.name} isPhone={isPhone} />
                <ContextButton onPress={toggleModal} isPhone={isPhone} />
                <View style={getStyles(theme, isPhone).row}>
                    <Section
                        title='Aprendizaje'
                        completed={dataProgress.pretask.completed}
                        blocked={dataProgress.pretask.blocked}
                        onPress={() => {
                            setState('pre')
                            navigation.navigate('PreTask', { taskOrder, linkOrder: 1 });
                        }} />
                    <Section
                        title='Actividad grupal'
                        completed={dataProgress.duringtask.completed}
                        blocked={dataProgress.duringtask.blocked}
                        onPress={() => {
                            setState('during')
                            navigation.navigate('DuringTask', { taskOrder, questionOrder: 1 });
                        }} />
                    <Section title='Evaluación'
                        completed={dataProgress.postask.completed}
                        blocked={dataProgress.postask.blocked}
                        onPress={() => {
                            setState('post')
                            navigation.navigate('PosTask', { taskOrder, questionOrder: 1 });
                        }} />
                </View>
            </View>
            <ContextModal showModal={showModal} toggleModal={toggleModal} dataIntroduction={dataIntroduction} isPhone={isPhone} />
        </>
    )
}

const getStyles = (theme: Theme, isPhone: boolean) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            paddingTop: isPhone ? 20 : 40,
            height: '100%',
        },
        text: {
            color: theme.colors.black,
            fontSize: isPhone ? theme.fontSize.xl : theme.fontSize.xxxl,
            fontFamily: theme.fontWeight.bold,
        },
        image: {
            height: isPhone ? 100 : 140,
            width: isPhone ? 100 : 140,
        },
        row: {
            flexDirection: isPhone ? 'column' : 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
        },
    });



export default Introduction