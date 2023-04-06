import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import Header from "../../components/Header";

import Loading from "./screens/Loading";

import { useEffect, useState } from "react";
import useAuthStorage from "@hooks/useAuthStorage";

import PreTaskProvider from "@contexts/PreTaskContext";

interface Props {
    route: any
}

const Stack = createNativeStackNavigator();

const PreTask = ({ route }: Props) => {
    const optionsPrimary: NativeStackNavigationOptions = {
        animation: "slide_from_right",
        headerBackVisible: false,
        headerShown: true,
        headerTitleStyle: {
            fontFamily: "Poppins-Regular",
        },
        header: () => <Header />
    }

    return (
        <PreTaskProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="Loading"
                    options={{
                        ...optionsPrimary,
                    }}
                    initialParams={{
                        taskOrder: route.params.taskOrder,
                    }}
                    component={Loading}
                />
                {/* <Stack.Screen
                name="PreTask"
                options={{
                    ...optionsPrimary,
                }}
                initialParams={{
                    taskOrder: route.params.taskOrder,
                    questionOrder: 0,
                }}
                component={PreTask}
            /> */}
            </Stack.Navigator>
        </PreTaskProvider>
    )
}

export default PreTask