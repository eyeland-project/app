import { View, StyleSheet, ToastAndroid } from "react-native";

import TextInput from "@components/TextInput";
import Title from "./components/Title";
import Button from "./components/Button";

import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import useTheme from "@hooks/useTheme";
import useLogin from "@hooks/useLogin";
import useAuthStorage from "@hooks/useAuthStorage";

import { Theme } from "@theme";
import { Login as LoginInterface } from "@interfaces/Login.interface";

const Login = () => {
	const navigation = useNavigation<any>();
	const theme = useTheme();
	const { control, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			username: '',
			password: ''
		}
	});
	const { data, error, loading, login } = useLogin();
	const authStorage = useAuthStorage();

	useEffect(() => {
		authStorage.getAccessToken().then(token => {
			if (token) {
				navigation.navigate("Home");
			}
		});
	}, []);


	const onSubmit = async (inputs: LoginInterface) => {
		try {
			await login(inputs);
			if (data) {
				navigation.navigate("Home");
			} else {
				ToastAndroid.show(error || "Un error inesperado ha ocurrido", ToastAndroid.SHORT);
			}
		} catch (error) {
			ToastAndroid.show((error as any).message, ToastAndroid.SHORT);
		}
	};

	return (
		<View style={getStyles(theme).container}>
			<Title name="[Lorem Ipsum]" />
			<TextInput name="username" label="Usuario" control={control} error={errors.username && "El usuario es requerido"} />
			<TextInput name="password" label="Contraseña" control={control} error={errors.password && "La contraseña es requerida"} secureTextEntry={true} />
			<Button
				title={loading ? "Cargando..." : "Iniciar sesión"}
				onPress={() => {
					!loading && handleSubmit(onSubmit)();
				}}
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