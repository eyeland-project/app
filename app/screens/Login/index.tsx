import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import TextInput from "../../shared/components/TextInput";
import Title from "./components/Title";
import Button from "./components/Button";

import useTheme from "../../core/hooks/useTheme";

import { Theme } from "../../theme";

const Login = () => {
	const navigation = useNavigation<any>();
	const theme = useTheme();

	return (
		<View style={getStyles(theme).container}>
			<Title name="[Lorem Ipsum]" />
			<TextInput placeholder="Email" />
			<TextInput placeholder="Contraseña" />
			<Button
				title="Iniciar sesión"
				onPress={() => navigation.navigate("Home")}
			/>
		</View>
	);
}

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.primary,
			alignItems: "center",
			justifyContent: "center",
			padding: 42,
		},
	});

export default Login