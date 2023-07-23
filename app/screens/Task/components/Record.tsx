import { Animated, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Pressable from '@app/shared/components/Pressable';
import { Theme } from '@app/theme';
import { hexToRgbA } from '@app/core/utils/hexToRgba';
import useDebounce from '@app/core/hooks/useDebounce';
import useRecord from '@app/core/hooks/Task/PosTask/useRecord';
import useRecordContext from '@app/core/hooks/useRecordContext';
import useTheme from '@app/core/hooks/useTheme';

interface Props {
	blocked: boolean;
	minimumTime: number;
	maximumTime: number;
	setRecorded: (recorded: boolean) => void;
	setRecording: (recording: string) => void;
}

function Record({
	blocked,
	minimumTime,
	maximumTime,
	setRecorded,
	setRecording
}: Props) {
	const theme = useTheme();
	const styles = getStyles(theme, blocked);
	const {
		startRecording,
		stopRecording,
		reset,
		playAudio,
		stopAudio,
		deleteRecording
	} = useRecord();
	const { recording, isDone, isFinished, audioUri, isPlayingAudio } =
		useRecordContext();
	const [duration, setDuration] = useState<number | null>(null);
	const scaleValue = useRef(new Animated.Value(1)).current;

	const accessibilityLabel = useMemo(() => {
		if (blocked) {
			return 'Debes contestar la pregunta primero';
		}
		if (recording) return 'Detener grabación';
		if (isDone) return 'Reproduce la grabación';
		if (isFinished) return 'Finalizado';
		return 'Iniciar grabación';
	}, [blocked, recording, isDone, isFinished]);

	const handleOnPress = useCallback(async () => {
		if (recording) {
			stopRecording(minimumTime);
		} else if (isDone) {
			playAudio();
		} else {
			startRecording();
		}
	}, [recording, isDone]);

	const debouncedHandleOnPress = useDebounce(handleOnPress, 300);

	const getTime = async () => {
		const status = await recording?.getStatusAsync();
		setDuration(status?.durationMillis ?? null);
		if (status?.durationMillis && status?.durationMillis >= maximumTime) {
			stopRecording(0);
		}
	};

	const handleDeleteRecording = () => {
		setDuration(null);
		deleteRecording();
	};

	useEffect(() => {
		let intervalId: NodeJS.Timeout | null = null;

		if (recording) {
			getTime();
			intervalId = setInterval(() => {
				getTime();
			}, 1000);
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [recording]);

	useEffect(() => {
		if (recording || isPlayingAudio) {
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
	}, [recording, scaleValue, isPlayingAudio]);

	useEffect(() => {
		if (isDone && audioUri) {
			setRecorded(true);
			setRecording(audioUri);
		} else {
			setRecorded(false);
		}
	}, [isDone]);

	useEffect(() => {
		if (recording) stopRecording(99999999);
		stopAudio();
		reset();
	}, []);

	return (
		<View>
			<View style={styles.row}>
				<View style={{ marginRight: 55 }}></View>
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
								: debouncedHandleOnPress();
						}}
						accessibilityLabel={accessibilityLabel}
						accessibilityRole="button"
					>
						<FontAwesome5
							name={
								blocked
									? 'microphone-slash'
									: recording
									? 'stop'
									: isDone
									? 'play'
									: isFinished
									? 'exclamation'
									: 'microphone'
							}
							size={70}
							color={blocked ? 'gray' : 'white'}
							accessible={false}
						/>
					</Pressable>
				</Animated.View>
				{isDone && (
					<View style={styles.deleteContainer}>
						<Pressable
							style={styles.deleteButton}
							onPress={handleDeleteRecording}
							accessibilityLabel="Borrar grabación"
							accessibilityRole="button"
						>
							<MaterialIcons
								name="delete"
								size={30}
								color="white"
								accessible={false}
							/>
						</Pressable>
					</View>
				)}
			</View>
			<Text style={styles.subtitle}>
				{recording &&
					`Grabando... ${Math.floor(
						(duration as number) / 1000
					)} segundos`}
			</Text>
		</View>
	);
}

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
		},
		subtitle: {
			color: theme.colors.black,
			fontSize: theme.fontSize.small,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium,
			textAlign: 'center',
			width: 250,
			marginHorizontal: 20,
			marginTop: 30
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		deleteContainer: {
			marginLeft: 20
		},
		deleteButton: {
			backgroundColor: theme.colors.red,
			borderRadius: theme.borderRadius.full,
			width: 60,
			height: 60,
			justifyContent: 'center',
			alignItems: 'center',
			...theme.shadow
		}
	});

export default Record;
