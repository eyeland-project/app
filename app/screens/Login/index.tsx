import { View, StyleSheet, Text, Image } from "react-native";

import TextInput from "@components/TextInput";
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
			<Image
				source={require("@icons/loginTraceLogo.png")}
				style={[
					getStyles(theme).traceLogo,
					{ top: '10%', right: '-25%' }
					// : { top: 160, right: -60 }
				]}
				resizeMode="center"
			/>
			<Image
				source={require("@icons/loginTraceLogo.png")}
				style={[
					getStyles(theme).traceLogo,
					{ top: '-10%', right: '10%' }
					// : { top: -50, right: 200 },
				]}
				resizeMode="center"
			/>
			<View style={getStyles(theme).innerContainer}>
				<Image source={require('@icons/loginLogo.png')} style={getStyles(theme).logo} resizeMode="center" />
				<TextInput
					name="username"
					placeholder="Usuario"
					control={control}
					autoCapitalize="none"
					error={errors.username && "El usuario es requerido"}
					accessible={true}
					accessibilityLabel="Entrada de nombre de usuario"
					accessibilityHint="Ingrese su nombre de usuario"
					placeholderTextColor={theme.colors.darkGray}
				/>
				<TextInput
					name="password"
					placeholder="Contraseña"
					autoCapitalize="none"
					control={control}
					error={errors.password && "La contraseña es requerida"}
					secureTextEntry={true}
					accessible={true}
					accessibilityLabel="Entrada de contraseña"
					accessibilityHint="Ingresa tu contraseña"
					placeholderTextColor={theme.colors.darkGray}
				/>
				<Button
					title={loading ? "Cargando..." : "Ingresar"}
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
		</View>
	);
}

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.primary,
			alignItems: "center",
			justifyContent: "center",
			height: "100%",
			position: "relative",
		},
		innerContainer: {
			maxWidth: 420,
			width: "100%",
			paddingHorizontal: 20,
		},
		error: {
			color: theme.colors.red,
			fontSize: theme.fontSize.medium,
			marginTop: 20,
			fontFamily: theme.fontWeight.medium,
			letterSpacing: theme.spacing.medium
		},
		logo: {
			width: 139,
			height: 139,
			marginBottom: 20,
			alignSelf: "center",
		},
		traceLogo: {
			width: 270,
			height: 270,
			position: "absolute",
		},
	});

export default Login
