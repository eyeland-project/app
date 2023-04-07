import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { socket } from "@utils/socket";
import Header from "../../components/Header";

import { useEffect, useState } from "react";
import useAuthStorage from "@hooks/useAuthStorage";
import { useNavigation } from "@react-navigation/native";

import WaitingActive from "./screens/WaitingActive";
import ChooseGroup from "./screens/ChooseGroup";
// import ChoosePower from "./screens/ChoosePower";
import WaitingBegin from "./screens/WaitingBegin";
import Transition from "./screens/Transition";
import Question from "./screens/Question";
import FinalScore from "./screens/FinalScore";

import { DuringTaskContext } from "@contexts/DuringTaskContext";

import { Power } from "@enums/Power.enum";
import { SocketEvents } from "@enums/SocketEvents.enum";
import { Team } from "@interfaces/Team.interface";

interface Props {
    route: any
}

const Stack = createNativeStackNavigator();

const DuringTask = ({ route }: Props) => {
    const authStorage = useAuthStorage();
    const [isSessionStarted, setIsSessionStarted] = useState(false);
    const [team, setTeam] = useState<Team | null>(null);
    const [power, setPower] = useState<Power | null>(null);
    const navigation = useNavigation<any>();

    const connectSocket = async () => {
        socket.connect();
        socket.emit('join', await authStorage.getAccessToken(), (response: { session: boolean }) => {
            setIsSessionStarted(response.session);
        });
        socket.once(SocketEvents.sessionTeacherEnd, () => {
            navigation.navigate("Introduction", { taskOrder: route.params.taskOrder });
        })
    }

    useEffect(() => {
        connectSocket();
        return () => {
            socket.disconnect();
        };
    }, [])

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
        <DuringTaskContext.Provider value={{ socket, power, setPower, team, setTeam }}>
            <Stack.Navigator>
                {
                    !isSessionStarted
                    && <Stack.Screen
                        name="Waiting"
                        options={{
                            ...optionsPrimary
                        }}
                        initialParams={{
                            taskOrder: route.params.taskOrder,
                        }}
                        component={WaitingActive}
                    />
                }
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
                {/* <Stack.Screen
                    name="ChoosePower"
                    options={{
                        ...optionsPrimary
                    }}
                    initialParams={{
                        taskOrder: route.params.taskOrder,
                    }}
                    component={ChoosePower}
                /> */}
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
                {/* <Stack.Screen
                    name="Transition"
                    options={{
                        ...optionsPrimary
                    }}
                    initialParams={{
                        taskOrder: route.params.taskOrder,
                    }}
                    component={Transition}
                /> */}
                <Stack.Screen
                    name="Question"
                    options={{
                        ...optionsPrimary
                    }}
                    initialParams={{
                        taskOrder: route.params.taskOrder,
                        questionOrder: 0,
                    }}
                    component={Question}
                />
                {/* <Stack.Screen
                    name="FinalScore"
                    options={{
                        ...optionsPrimary
                    }}
                    initialParams={{
                        taskOrder: route.params.taskOrder,
                    }}
                    component={FinalScore}
                /> */}
            </Stack.Navigator>
        </DuringTaskContext.Provider>
    )
}




export default DuringTask