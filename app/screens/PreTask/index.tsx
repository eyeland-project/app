import { useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native'
import BackButton from '../../shared/components/BackButton';
import WebView from 'react-native-webview';
import Pressable from '../../shared/components/Pressable';
import ContinueButton from '../../shared/components/ContinueButton';

import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';

import useTheme from '../../core/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import usePreTask from '../../core/hooks/usePreTask';

import { Theme } from '../../theme';


interface TaskParams {
    taskOrder: number;
    linkOrder: number;
}

interface Props {
    route: RouteProp<ParamListBase, 'Introduction'> & {
        params: TaskParams;
    };
}

const PreTask = ({ route }: Props) => {
    const { taskOrder, linkOrder } = route.params;

    const theme = useTheme();
    const navigation = useNavigation<any>();
    // const { loading, error, data, getPreTask } = usePreTask();

    // useEffect(() => {
    //     getPreTask({ taskOrder, linkOrder });
    // }, []);

    const data = { url: "https://wordwall.net/resource/36022113/task-1-vocabulary#" } // MOCK DATA

    if (!data) {
        return null;
    }

    //TODO - If not found then navigate to during task

    return (
        <View style={getStyles(theme).container}>
            <View style={getStyles(theme).row}>
                <BackButton />
                <ContinueButton onPress={() => navigation.navigate('DuringTask', { taskOrder, linkOrder: linkOrder + 1 })} />
            </View>
            <WebView
                source={{ uri: data.url }}
                style={{ marginBottom: 90, marginTop: 10 }}
            />
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
            fontSize: theme.fontSize.large,
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


export default PreTask