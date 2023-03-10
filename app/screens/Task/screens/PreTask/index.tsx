import { View, StyleSheet } from 'react-native'
import WebView from 'react-native-webview';
import Placeholder from './components/Placeholder';

import useTheme from '@hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import usePreTask from '@hooks/usePreTask';
import { useEffect } from 'react';
import useTaskContext from '@hooks/useTaskContext';

import { Theme } from '@theme';

interface Props {
    route: any
}

const PreTask = ({ route }: Props) => {
    const { taskOrder, linkOrder } = route.params as { taskOrder: number, linkOrder: number };

    const theme = useTheme();
    const navigation = useNavigation<any>();
    const { loading, error, data, getPreTask, getTotalNumberOfPreTasks, setPreTaskComplete } = usePreTask();
    const { setPhaseCompleted, setOnPressNext, setProgress, progress } = useTaskContext();

    const onRenderComplete = async () => {
        getPreTask({ taskOrder, linkOrder });
        const numberOfPreTasks = await getTotalNumberOfPreTasks(taskOrder);
        setPhaseCompleted(true);
        setProgress(linkOrder / numberOfPreTasks);
        setOnPressNext(() => async () => {
            if (linkOrder < numberOfPreTasks) {
                navigation.navigate('PreTask', { taskOrder, linkOrder: linkOrder + 1 });
            } else {
                await setPreTaskComplete({ taskOrder });
                navigation.reset({
                    index: 0,
                    routes: [
                        { name: 'Introduction', params: { taskOrder } },
                        { name: 'DuringTask', params: { taskOrder } }
                    ],
                })
            }
        });
    }

    useEffect(() => {
        onRenderComplete();
    }, [linkOrder]);

    return (
        <View style={getStyles(theme).container}>
            {
                (data && !loading)
                    ? <WebView
                        source={{ uri: data.url }}
                        style={{ marginBottom: 90, marginTop: 10 }}
                    />
                    : <Placeholder />
            }

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