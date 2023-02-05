import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import Login from "./app/screens/Login";
import Home from "./app/screens/Home";

import { ThemeProvider } from "./app/core/contexts/ThemeContext";

import Accessibility from "./app/shared/components/AccessibilityMenu";

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
		"Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
		"Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
		"Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
		"Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
		"Ubuntu-Regular": require("./assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
		"Ubuntu-Medium": require("./assets/fonts/Ubuntu/Ubuntu-Medium.ttf"),
		"Ubuntu-Bold": require("./assets/fonts/Ubuntu/Ubuntu-Bold.ttf"),
	});

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider>
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
				<Accessibility />
			</NavigationContainer>
		</ThemeProvider>
	);
}
