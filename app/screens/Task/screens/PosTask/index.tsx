import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import Complete from "./screens/Complete";
import Question from "./screens/Question";

import { PosTaskContext } from "@contexts/PosTaskContext";

import { useEffect, useState } from "react";
import useTaskContext from "@hooks/useTaskContext";
import usePosTask from "@hooks/usePosTask";


interface Props {
    route: any
}

const Stack = createNativeStackNavigator();

const PosTask = ({ route }: Props) => {
    const { taskOrder } = route.params;
    const { getPosTask } = usePosTask();
    const { setProgress } = useTaskContext();
    const [numQuestions, setNumQuestions] = useState<number | null>(null);

    useEffect(() => {
        const getData = async () => {
            const data = await getPosTask({ taskOrder });
            setNumQuestions(data.numQuestions);
            setProgress(1 / data.numQuestions);
        }
        getData();
    }, [])


    const optionsPrimary: NativeStackNavigationOptions = {
        animation: "slide_from_right",
        headerBackVisible: false,
        headerShown: false,
    }

    return (
        <PosTaskContext.Provider value={{ numQuestions }}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Question"
                    options={{
                        ...optionsPrimary,
                    }}
                    initialParams={{
                        taskOrder: route.params.taskOrder,
                        questionOrder: route.params.questionOrder,
                    }}
                    component={Question}
                />
                <Stack.Screen
                    name="Complete"
                    options={{
                        ...optionsPrimary,
                    }}
                    component={Complete}
                />
            </Stack.Navigator>
        </PosTaskContext.Provider>
    )
}

export default PosTask