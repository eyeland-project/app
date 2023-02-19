import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import Introduction from './screens/Introduction';
import PreTask from './screens/PreTask';
import DuringTask from './screens/DuringTask';
import Header from './components/Header';

import useTaskContext from '@hooks/useTaskContext';

const Stack = createNativeStackNavigator();

const Task = ({ route }: { route: any }) => {
    const { taskOrder } = route.params;
    const { phaseCompleted, onPressNext, progress, setPhaseCompleted } = useTaskContext();

    const optionsPrimary: NativeStackNavigationOptions = {
        animation: "slide_from_right",
        headerBackVisible: false,
        headerTitleStyle: {
            fontFamily: "Poppins-Regular",
        },
        header: () => <Header progress={progress} showNext={phaseCompleted} onPress={() => {
            setPhaseCompleted(false);
            onPressNext();
        }} />
    }

    return (
        <>

            {/* TODO - Change this later */}
            <Stack.Navigator initialRouteName='DuringTask'>
                <Stack.Screen
                    name="Introduction"
                    options={{
                        ...optionsPrimary,
                    }}
                    initialParams={{
                        taskOrder: taskOrder,
                    }}
                >
                    {({ route }: { route: any }) => <Introduction route={route} />}
                </Stack.Screen>
                <Stack.Screen
                    name="PreTask"
                    options={{
                        ...optionsPrimary
                    }}
                    initialParams={{
                        taskOrder: taskOrder,
                        linkOrder: 0,
                    }}
                >
                    {({ route }: { route: any }) => <PreTask route={route} />}
                </Stack.Screen>
                <Stack.Screen
                    name="DuringTask"
                    options={{
                        ...optionsPrimary
                    }}
                    initialParams={{
                        taskOrder: taskOrder,
                    }}
                >
                    {({ route }: { route: any }) => <DuringTask route={route} />}
                </Stack.Screen>
            </Stack.Navigator>
        </>
    )
}

export default Task