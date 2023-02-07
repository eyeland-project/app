import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';

import { Theme } from '../../theme';

import Title from './components/Title';
import BackButton from '../../shared/components/BackButton';
import Keywords from './components/Keywords';
import Description from './components/Description';
import ContinueButton from '../../shared/components/ContinueButton';

import useTheme from '../../core/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';

import { INTRODUCTION } from '../../shared/mocks/INTRODUCTION';

interface TaskParams {
    idTask: string;
}

interface Props {
    route: RouteProp<ParamListBase, 'Introduction'> & {
        params: TaskParams;
    };
}

const Introduction = ({ route }: Props) => {
    const { idTask } = route.params;

    const theme = useTheme();
    const navigation = useNavigation<any>();
    // TODO - Get introduction from API

    return (
        <View style={getStyles(theme).container}>
            <View style={getStyles(theme).row}>
                <BackButton />
            </View>
            <ScrollView style={getStyles(theme).scrollView}>
                <Title text={INTRODUCTION.name} />
                <Keywords keywords={INTRODUCTION.keywords} />
                <Image source={{ uri: INTRODUCTION.thumbnail }} style={getStyles(theme).image} />
                <Description text={INTRODUCTION.longDescription} />
                <ContinueButton onPress={() => {
                    navigation.navigate('PreTask', { idTask })
                }} />
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