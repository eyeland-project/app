import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import Login from "@screens/Login";
import Home from "@screens/Home";
import Task from "@screens/Task";

import { useState, useEffect } from "react";

import { ThemeProvider } from "@contexts/ThemeContext";
import { AuthStorageContext } from "@contexts/AuthStorageContext";
import { TaskProvider } from "@contexts/TaskContext";

import Accessibility from "@components/AccessibilityMenu";
import SafeAreaViewAndroid from "@components/SafeAreaViewAndroid";
import AuthStorage from '@utils/authStorage';


const Stack = createNativeStackNavigator<ParamListBase>();

const optionsPrimary: NativeStackNavigationOptions = {
	animation: "fade_from_bottom",
	headerBackVisible: false,
	headerShown: false,
}

export default function App() {
	// assets\fonts\SchibstedGortesk\SchibstedGrotesk-Black.ttf
	const [loaded] = useFonts({
		"SchibstedGortesk-Regular": require("@fonts/SchibstedGortesk/SchibstedGrotesk-Regular.ttf"),
		"SchibstedGortesk-Medium": require("@fonts/SchibstedGortesk/SchibstedGrotesk-Medium.ttf"),
		"SchibstedGortesk-Bold": require("@fonts/SchibstedGortesk/SchibstedGrotesk-Black.ttf"),
		"Roboto-Regular": require("@fonts/Roboto/Roboto-Regular.ttf"),
		"Roboto-Medium": require("@fonts/Roboto/Roboto-Medium.ttf"),
		"Roboto-Bold": require("@fonts/Roboto/Roboto-Bold.ttf"),
		"Ubuntu-Regular": require("@fonts/Ubuntu/Ubuntu-Regular.ttf"),
		"Ubuntu-Medium": require("@fonts/Ubuntu/Ubuntu-Medium.ttf"),
		"Ubuntu-Bold": require("@fonts/Ubuntu/Ubuntu-Bold.ttf"),
	});

	const [isLogged, setIsLogged] = useState(false);
	const authStorage = new AuthStorage();

	useEffect(() => {
		authStorage.getAccessToken().then((token) => {
			if (token) {
				setIsLogged(true);
			}
		})
	}, [])

	if (!loaded) {
		return null;
	}

	return (
		<>
			<StatusBar />
			<SafeAreaView style={SafeAreaViewAndroid.AndroidSafeArea}>
				<AuthStorageContext.Provider value={authStorage}>
					<TaskProvider>
						<ThemeProvider>
							<NavigationContainer>
								<Stack.Navigator>
									{
										!isLogged
											? <>
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
											</>
											: <>
												<Stack.Screen
													name="Home"
													component={Home}
													options={{
														...optionsPrimary
													}}
												/>
												<Stack.Screen
													name="Login"
													component={Login}
													options={{
														...optionsPrimary
													}} />
											</>
									}

									<Stack.Screen
										name="Task"
										component={Task}
										options={{
											...optionsPrimary
										}}
										initialParams={{
											taskOrder: 0,
										}}
									/>
								</Stack.Navigator>
								<Accessibility />
							</NavigationContainer>
						</ThemeProvider>
					</TaskProvider>
				</AuthStorageContext.Provider>
			</SafeAreaView>
		</>
	);
}
