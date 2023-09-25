import { StyleSheet, Animated, ToastAndroid } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Pressable from '@components/Pressable';
import { Audio } from 'expo-av';

import { useEffect, useRef } from 'react';
import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

import { hexToRgbA } from '@utils/hexToRgba';

interface Props {
	blocked: boolean;
	recording: Audio.Recording | undefined;
	done: boolean;
	finished: boolean;
	onPress: () => void;
}

const Record = ({ blocked, recording, done, finished, onPress }: Props) => {
	const theme = useTheme();

	const scaleValue = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		if (recording) {
			Animated.loop(
				Animated.sequence([
					Animated.timing(scaleValue, {
						toValue: 1.2,
						duration: 500,
						useNativeDriver: true
					}),
					Animated.timing(scaleValue, {
						toValue: 1,
						duration: 500,
						useNativeDriver: true
					})
				])
			).start();
		} else {
			scaleValue.setValue(1);
		}
	}, [recording, scaleValue]);

	const getAccessibilityLabel = () => {
		if (blocked) return 'Debes contestar la pregunta primero';
		if (recording) return 'Detener grabación';
		if (done) return 'Grabación completada';
		if (finished) return 'Finalizado';
		return 'Iniciar grabación';
	};

	return (
		<Animated.View
			style={[
				getStyles(theme, blocked).containerPulse,
				{ transform: [{ scale: scaleValue }] }
			]}
		>
			<Pressable
				style={getStyles(theme, blocked).container}
				onPress={() => {
					blocked
						? ToastAndroid.show(
								'¡Debes contestar la pregunta primero!',
								ToastAndroid.SHORT
						  )
						: onPress();
				}}
				accessibilityLabel={getAccessibilityLabel()}
				accessibilityRole="button"
			>
				<FontAwesome5
					name={
						blocked
							? 'microphone-slash'
							: recording
							? 'stop'
							: done
							? 'check'
							: finished
							? 'exclamation'
							: 'microphone'
					}
					size={70}
					color={blocked ? 'gray' : 'white'}
					accessible={false}
				/>
			</Pressable>
		</Animated.View>
	);
};

const getStyles = (theme: Theme, blocked: boolean) =>
	StyleSheet.create({
		containerPulse: {
			backgroundColor: blocked
				? hexToRgbA(theme.colors.gray, 0.8)
				: hexToRgbA(theme.colors.darkGreen, 0.5),
			width: 180,
			height: 180,
			borderRadius: theme.borderRadius.full,
			justifyContent: 'center',
			alignItems: 'center'
		},
		container: {
			backgroundColor: blocked
				? theme.colors.gray
				: theme.colors.darkGreen,
			borderRadius: theme.borderRadius.full,
			width: 150,
			height: 150,
			justifyContent: 'center',
			alignItems: 'center',
			...theme.shadow
		}
	});

export default Record;
