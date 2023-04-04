import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import Header from "../../components/Header";

import Loading from "./screens/Loading";
import MultipleChoice from "./screens/MultipleChoice";
import FillBlank from "./screens/FillBlank";

import PreTaskProvider from "@app/core/contexts/PreTaskContext";

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
                <Stack.Screen
                    name="MultipleChoice"
                    options={{
                        ...optionsPrimary,
                    }}
                    initialParams={{
                        question: null,
                        taskOrder: 0,
                    }}
                    component={MultipleChoice}
                />
                <Stack.Screen
                    name="FillBlank"
                    options={{
                        ...optionsPrimary,
                    }}
                    initialParams={{
                        question: null,
                        taskOrder: 0,
                    }}
                    component={FillBlank}
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