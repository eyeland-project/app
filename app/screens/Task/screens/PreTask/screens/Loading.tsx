import { View, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import ErrorScreen from "@components/ErrorScreen";

import { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
// import usePreTask from "@hooks/usePreTask";
import usePreTaskMock from "@mocks/hooks/usePreTaskMock";
import useTheme from "@hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import usePreTaskContext from "@hooks/usePreTaskContext";

import { Theme } from "@theme";

const Loading = ({ route }: { route: any }) => {
    const { taskOrder } = route.params
    const theme = useTheme();
    const { getPreTask, data, error, loading, nextQuestion } = usePreTaskMock();
    const { setData, data: dataContext } = usePreTaskContext();

    useFocusEffect(
        useCallback(() => {
            const getQuestion = async () => {
                const data = await getPreTask({ taskOrder });
                if (data) {
                    setData(data);
                }
            }
            getQuestion();
        }, [])
    );

    useEffect(() => {
        if (dataContext) {
            nextQuestion();
        }
    }, [dataContext])

    if (error) return <ErrorScreen error={error} retryAction={() => { getPreTask({ taskOrder }) }} />

    return (
        <View style={getStyles(theme).container}>
            <View accessible={true} accessibilityLabel="Loading animation">
                <LottieView
                    source={require('@animations/loading.json')}
                    autoPlay
                    loop
                    style={getStyles(theme).animation}
                />
            </View>
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.primary,
        },
        animation: {
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginTop: 100,
        }
    });

export default Loading