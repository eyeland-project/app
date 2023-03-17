import { View, StyleSheet, ToastAndroid, Text } from "react-native";

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
	}, [data]);


	const onSubmit = async (inputs: LoginInterface) => {
		await login(inputs);
		if (data && !error) {
			navigation.navigate("Home");
		}
	};

	return (
		<View
			style={getStyles(theme).container}
			accessible={true}
			accessibilityLabel="Formulario de ingreso"
		>
			<Title name="EYELAND" />
			<TextInput
				name="username"
				label="Usuario"
				control={control}
				autoCapitalize="none"
				error={errors.username && "El usuario es requerido"}
				accessible={true}
				accessibilityLabel="Entrada de nombre de usuario"
				accessibilityHint="Ingrese su nombre de usuario"
			/>
			<TextInput
				name="password"
				label="Contraseña"
				autoCapitalize="none"
				control={control}
				error={errors.password && "La contraseña es requerida"}
				secureTextEntry={true}
				accessible={true}
				accessibilityLabel="Entrada de contraseña"
				accessibilityHint="Ingresa tu contraseña"
			/>
			<Button
				title={loading ? "Cargando..." : "Iniciar sesión"}
				onPress={() => {
					!loading && handleSubmit(onSubmit)();
				}}
				accessible={true}
				accessibilityLabel={loading ? "Cargando..." : "Iniciar sesión"}
				accessibilityHint="Presiona para iniciar sesión"
			/>
			{
				error && <Text style={getStyles(theme).error}>{error}</Text>
			}
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
		error: {
			color: theme.colors.red,
			fontSize: theme.fontSize.medium,
			marginTop: 20,
			fontFamily: theme.fontWeight.medium,
			letterSpacing: theme.spacing.medium
		}
	});

export default Login
