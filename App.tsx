import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
	Provider as PaperProvider,
	MD3LightTheme,
	MD3Colors,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";

const theme = {
	...MD3LightTheme,
	roundness: 2,
	colors: {
		...MD3Colors,
		primary: "#3498db",
		accent: "#f1c40f",
	},
};

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
