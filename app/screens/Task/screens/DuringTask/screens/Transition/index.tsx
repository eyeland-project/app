import { View, StyleSheet, Platform } from 'react-native';
import Person from './components/Person';
import LottieView from 'lottie-react-native';

import { useEffect, useState } from 'react';
import useTaskContext from '@app/core/hooks/Task/useTaskContext';
import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

const Transition = () => {
	const { setProgress } = useTaskContext();
	const theme = useTheme();
	const [dialog, setDialog] = useState(
		'¡Hola! Soy tu guía turístico. Te daré las instrucciones para que puedas realizar la actividad.'
	);
	const styles = getStyles(theme);
	const currentPlatform = Platform.OS;

	useEffect(() => {
		setProgress(0.1);
		const timeoutId = setTimeout(() => {
			setDialog(
				'¡Bienvenido al recorrido! Primero, iremos hacia el puente Pumarejo'
			);
		}, 5000);

		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<View style={styles.container}>
			<Person dialog={dialog} />
			{currentPlatform !== 'web' && (
				<LottieView
					source={require('@animations/map.json')}
					autoPlay
					loop={false}
					style={styles.animation}
				/>
			)}
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			height: '100%'
		},
		animation: {
			width: 500,
			height: 500,
			marginLeft: -125
		}
		// imageContainer: {
		//     marginHorizontal: 20,
		//     borderRadius: theme.borderRadius.medium,
		//     overflow: 'hidden',
		//     borderWidth: 1,
		//     marginTop: 20,
		//     borderColor: theme.colors.black,
		// },
		// image: {
		//     width: '100%',
		//     height: 300,
		// },
	});

export default Transition;
