import { View, StyleSheet, ToastAndroid, Text, Image } from 'react-native';

import TextInput from '@components/TextInput';
import Title from './components/Title';
import Button from './components/Button';

import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import useTheme from '@hooks/useTheme';
import useLogin from '@hooks/useLogin';
import useAuthStorage from '@hooks/useAuthStorage';
import useMediaQuery from '@hooks/useMediaQuery';

import { Theme } from '@theme';
import { Login as LoginInterface } from '@interfaces/Login.interface';

const Login = () => {
	const navigation = useNavigation<any>();
	const theme = useTheme();
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			username: '',
			password: ''
		}
	});
	const { data, error, loading, login } = useLogin();
	const authStorage = useAuthStorage();
	const { isPhone, isTablet, isDesktop } = useMediaQuery();
	const styles = getStyles(theme, isPhone, isTablet, isDesktop);

	useEffect(() => {
		authStorage.getAccessToken().then((token) => {
			if (token) {
				navigation.navigate('Home');
			}
		});
	}, [data]);

	const onSubmit = async (inputs: LoginInterface) => {
		await login(inputs);
		if (data && !error) {
			navigation.navigate('Home');
		}
	};

	return (
		<View
			style={styles.container}
			accessible={true}
			accessibilityLabel="Formulario de ingreso"
		>
			<View style={[styles.innerContainer, !isPhone && styles.card]}>
				<Image source={require('@icons/appIcon.png')} style={styles.image} resizeMode='center' />
				<TextInput
					name="username"
					label="Usuario"
					control={control}
					autoCapitalize="none"
					error={errors.username && 'El usuario es requerido'}
					trim={true}
					accessible={true}
					accessibilityLabel="Entrada de nombre de usuario"
					accessibilityHint="Ingrese su nombre de usuario"
					autoComplete='username'
				/>
				<TextInput
					name="password"
					label="Contraseña"
					autoCapitalize="none"
					control={control}
					error={errors.password && 'La contraseña es requerida'}
					secureTextEntry={true}
					accessible={true}
					accessibilityLabel="Entrada de contraseña"
					accessibilityHint="Ingresa tu contraseña"
					autoComplete='password'
				/>
				<Button
					title={loading ? 'Cargando...' : 'Iniciar sesión'}
					onPress={() => {
						!loading && handleSubmit(onSubmit)();
					}}
					accessible={true}
					accessibilityLabel={loading ? 'Cargando...' : 'Iniciar sesión'}
					accessibilityHint="Presiona para iniciar sesión"
				/>
				{error && <Text style={styles.error}>{error}</Text>}
			</View>
		</View>
	);
};

const getStyles = (theme: Theme, isPhone: boolean, isTablet: boolean, isDesktop: boolean) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.white,
			alignItems: 'center',
			justifyContent: 'center',
			padding: isDesktop ? 64 : isTablet ? 48 : 24
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
			letterSpacing: theme.spacing.medium,
			textAlign: isDesktop ? 'center' : 'left'
		},
		image: {
			width: 150,
			height: 150,
			alignSelf: 'center',
			marginBottom: isDesktop ? 40 : isTablet ? 30 : 25
		},
		card: {
			backgroundColor: theme.colors.white,
			borderRadius: theme.borderRadius.large,
			padding: 24,
			...theme.shadow
		},
	});

export default Login;
