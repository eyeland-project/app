import { Text, View, StyleSheet, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import { Link } from '@react-navigation/native';

import { useEffect } from 'react';
import useTheme from '@hooks/useTheme';
import useImageStackStore from '@app/core/hooks/Task/DurinTask/useImageStackStore';
import useTaskContext from '@app/core/hooks/Task/useTaskContext';
import { useDuringTaskContext } from '@app/core/hooks/Task/DurinTask/useDuringTaskContext';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '@theme';
import { SocketEvents } from '@enums/SocketEvents.enum';

const WaitingActive = ({ route }: { route: any }) => {
	const { taskOrder } = route.params;
	const theme = useTheme();
	const { resetContext } = useTaskContext();
	const { socket } = useDuringTaskContext();
	const navigation = useNavigation<any>();
	const { imageStack, clearImageStack } = useImageStackStore();
	const styles = getStyles(theme);
	const currentPlatform = Platform.OS;

	useEffect(() => {
		resetContext();
		if (imageStack.length) clearImageStack();
		socket.once(SocketEvents.SESSION_TEACHER_CREATE, () => {
			navigation.navigate('ChooseGroup', { taskOrder: taskOrder });
		});
	}, []);

	return (
		<View style={styles.container}>
			{currentPlatform !== 'web' && (
				<LottieView
					source={require('@animations/waitingActive.json')}
					autoPlay
					loop
					style={styles.animation}
				/>
			)}
			<Text
				style={styles.text}
				accessible
				accessibilityLabel="Espera que tu profesor active la During-Task para comenzar."
			>
				Espera que tu profesor active la During-Task para comenzar.
			</Text>
			<Link
				to={{
					screen: 'Introduction',
					params: { taskOrder: taskOrder }
				}}
				style={styles.link}
				accessible
				accessibilityLabel="Volver a la lista de tareas"
				accessibilityHint="Presiona dos veces para volver a la lista de tareas."
			>
				<Text style={styles.linkText}>Volver a la lista de tareas</Text>
			</Link>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.white,
			height: '100%',
			alignItems: 'center',
			justifyContent: 'center'
		},
		animation: {
			width: 300,
			height: 300
		},
		text: {
			color: theme.colors.black,
			fontSize: theme.fontSize.xl,
			textAlign: 'center',
			marginTop: 20,
			letterSpacing: theme.spacing.medium,
			fontFamily: theme.fontWeight.bold,
			width: '80%'
		},
		link: {
			marginTop: 40
		},
		linkText: {
			color: theme.colors.black,
			fontSize: theme.fontSize.medium,
			textAlign: 'center',
			letterSpacing: theme.spacing.medium,
			fontFamily: theme.fontWeight.regular,
			width: '80%',
			textDecorationLine: 'underline'
		}
	});

export default WaitingActive;
