import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import Login from "./app/screens/Login";
import Home from "./app/screens/Home";

const Stack = createNativeStackNavigator();

const optionsPrimary: NativeStackNavigationOptions = {
	animation: "fade_from_bottom",
	headerBackVisible: false,
	headerTitleStyle: {
		fontFamily: "Poppins-Regular",
	},
}

export default function App() {

	const [loaded] = useFonts({
		"Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
		"Poppins-Medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
		"Poppins-SemiBold": require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
		"Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
	});

	if (!loaded) {
		return null;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{
						...optionsPrimary,
						headerShown: false,
					}} />
				<Stack.Screen
					name="Home"
					component={Home}
					options={{
						...optionsPrimary,
						headerTitle: "Inicio",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
