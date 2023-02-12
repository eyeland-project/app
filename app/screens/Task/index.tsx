import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import Introduction from './Introduction';
import PreTask from './PreTask';
import Header from './components/Header';

import useTaskContext from '../../core/hooks/useTaskContext';

const Stack = createNativeStackNavigator();

const optionsPrimary: NativeStackNavigationOptions = {
    animation: "slide_from_right",
    headerBackVisible: false,
    headerShown: false,
    headerTitleStyle: {
        fontFamily: "Poppins-Regular",
    }
}

const Task = ({ route }: { route: any }) => {
    const { taskOrder } = route.params;
    const { phaseCompleted, onPressNext, progress } = useTaskContext();

    return (
        <>
            <Header progress={progress} showNext={phaseCompleted} onPress={onPressNext} />
            <Stack.Navigator>
                <Stack.Screen
                    name="Introduction"
                    options={{
                        ...optionsPrimary
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
            </Stack.Navigator>
        </>
    )
}

export default Task