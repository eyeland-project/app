import { View, Text, StyleSheet } from 'react-native'
import WebView from 'react-native-webview';

import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';

import useTheme from '../../../core/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import usePreTask from '../../../core/hooks/usePreTask';
import { useEffect } from 'react';
import useTaskContext from '../../../core/hooks/useTaskContext';

import { Theme } from '../../../theme';


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
    const { loading, error, data, getPreTask, getTotalNumberOfPreTasks } = usePreTask();
    const { setPhaseCompleted, setOnPressNext, setProgress, progress } = useTaskContext();

    useEffect(() => {
        getPreTask({ taskOrder, linkOrder });
    }, [linkOrder]);

    const onRenderComplete = async () => {
        const increment = await getTotalNumberOfPreTasks(taskOrder);
        if (linkOrder <= increment) {
            setProgress(progress + 0.25 / increment);
            setOnPressNext(() => () => navigation.navigate('PreTask', { taskOrder, linkOrder: linkOrder + 1 }));
        } else {
            setPhaseCompleted(false);
            setOnPressNext(() => () => navigation.navigate('DuringTask', { taskOrder }));
        }
    }

    useEffect(() => {
        onRenderComplete();
    }, [])

    if (!data) {
        return null;
    }

    //TODO - If not found then navigate to during task

    return (
        <View style={getStyles(theme).container}>
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