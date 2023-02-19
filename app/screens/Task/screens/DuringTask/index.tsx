import { ParamListBase } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import WaitingActive from "./screens/WaitingActive";
import ChooseGroup from "./screens/ChooseGroup";
import ChoosePower from "./screens/ChoosePower";
import WaitingBegin from "./screens/WaitingBegin";
import Transition from "./screens/Transition";
import Question from "./screens/Question";
import FinalScore from "./screens/FinalScore";

interface TaskParams {
    taskOrder: number;
}

interface Props {
    route: RouteProp<ParamListBase, 'Introduction'> & {
        params: TaskParams;
    };
}

const Stack = createNativeStackNavigator();

const optionsPrimary: NativeStackNavigationOptions = {
    animation: "slide_from_right",
    headerBackVisible: false,
    headerShown: false,
    headerTitleStyle: {
        fontFamily: "Poppins-Regular",
    }
}

const DuringTask = ({ route }: Props) => {

    //TODO - Connect to socket.io

    return (
        <Stack.Navigator initialRouteName='Question'>
            <Stack.Screen
                name="Waiting"
                options={{
                    ...optionsPrimary
                }}
                initialParams={{
                    taskOrder: route.params.taskOrder,
                }}
                component={WaitingActive}
            />
            <Stack.Screen
                name="ChooseGroup"
                options={{
                    ...optionsPrimary
                }}
                initialParams={{
                    taskOrder: route.params.taskOrder,
                }}
                component={ChooseGroup}
            />
            <Stack.Screen
                name="ChoosePower"
                options={{
                    ...optionsPrimary
                }}
                initialParams={{
                    taskOrder: route.params.taskOrder,
                }}
                component={ChoosePower}
            />
            <Stack.Screen
                name="WaitingBegin"
                options={{
                    ...optionsPrimary
                }}
                initialParams={{
                    taskOrder: route.params.taskOrder,
                }}
                component={WaitingBegin}
            />
            <Stack.Screen
                name="Transition"
                options={{
                    ...optionsPrimary
                }}
                initialParams={{
                    taskOrder: route.params.taskOrder,
                }}
                component={Transition}
            />
            <Stack.Screen
                name="Question"
                options={{
                    ...optionsPrimary
                }}
                initialParams={{
                    taskOrder: route.params.taskOrder,
                }}
                component={Question}
            />
            <Stack.Screen
                name="FinalScore"
                options={{
                    ...optionsPrimary
                }}
                initialParams={{
                    taskOrder: route.params.taskOrder,
                }}
                component={FinalScore}
            />
        </Stack.Navigator>
    )
}




export default DuringTask