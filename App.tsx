import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import Login from "./app/screens/Login";
import Home from "./app/screens/Home";
import Introduction from "./app/screens/Introduction";
import PreTask from "./app/screens/PreTask";

import { ThemeProvider } from "./app/core/contexts/ThemeContext";
import { AuthStorageProvider } from "./app/core/contexts/AuthStorageContext";

import Accessibility from "./app/shared/components/AccessibilityMenu";
import SafeAreaViewAndroid from "./app/shared/components/SafeAreaViewAndroid";


const Stack = createNativeStackNavigator<ParamListBase>();

const optionsPrimary: NativeStackNavigationOptions = {
	animation: "fade_from_bottom",
	headerBackVisible: false,
	headerShown: false,
	headerTitleStyle: {
		fontFamily: "Poppins-Regular",
	}
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
		<>
			<StatusBar />
			<SafeAreaView style={SafeAreaViewAndroid.AndroidSafeArea}>
				<AuthStorageProvider>
					<ThemeProvider>
						<NavigationContainer>
							<Stack.Navigator>
								<Stack.Screen
									name="Login"
									component={Login}
									options={{
										...optionsPrimary
									}} />
								<Stack.Screen
									name="Home"
									component={Home}
									options={{
										...optionsPrimary
									}}
								/>
								<Stack.Screen
									name="Introduction"
									options={{
										...optionsPrimary
									}}
									initialParams={{
										taskOrder: 0,
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
										taskOrder: 0,
										linkOrder: 0,
									}}
								>
									{({ route }: { route: any }) => <PreTask route={route} />}
								</Stack.Screen>
							</Stack.Navigator>
							<Accessibility />
						</NavigationContainer>
					</ThemeProvider>
				</AuthStorageProvider>
			</SafeAreaView>
		</>
	);
}
