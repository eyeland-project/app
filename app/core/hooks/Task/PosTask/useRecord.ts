import { Audio } from 'expo-av';
import { AppState, AccessibilityInfo } from 'react-native';

import { useContext } from 'react';
import usePlaySound from '../../usePlaySound';
import useRecordContext from '../../useRecordContext';
import Record from '@app/screens/Task/components/Record';
import { set } from 'react-hook-form';

const useRecord = () => {
	const {
		recording,
		setRecording,
		isRecording,
		setIsRecording,
		isFinished,
		setIsFinished,
		isDone,
		setIsDone,
		audioUri,
		setAudioUri,
		isPlayingAudio,
		setIsPlayingAudio,
		sound,
		setSound
	} = useRecordContext();

	const playSoundStartRecording = usePlaySound(
		require('@sounds/startRecording.wav')
	);
	const playSoundStopRecording = usePlaySound(
		require('@sounds/stopRecording.wav')
	);
	const playSoundSuccessRecording = usePlaySound(
		require('@sounds/success.wav')
	);
	const playSoundFailRecording = usePlaySound(require('@sounds/wrong.wav'));

	async function startRecording() {
		try {
			if (AppState.currentState !== 'active' || isRecording) {
				console.log("App is in the background or another recording is active, can't start recording");
				return;
			}

			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true
			});
			playSoundStartRecording();
			const { recording: recordingTemp } = await Audio.Recording.createAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY
			);
			AccessibilityInfo.announceForAccessibility('Grabando, presiona el botón nuevamente para detener la grabación');
			setRecording(recordingTemp);
			setIsRecording(true);
		} catch (err) {
			console.error('Failed to start recording', err);
		}
	}

	async function stopRecording(minimumDuration: number) {
		console.log('Stopping recording..');
		playSoundStopRecording();

		if (!recording) {
			console.warn('Can\'t stop recording, as there is no recording object');
			return;
		}

		try {
			await (recording as Audio.Recording).stopAndUnloadAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false
			});
			setIsRecording(false);
			setIsFinished(true);
			setRecording(undefined);

			if (
				recording?._finalDurationMillis &&
				recording?._finalDurationMillis >= minimumDuration
			) {
				const uri = (recording as Audio.Recording).getURI();
				console.log('Recording stopped and stored at', uri);
				if (uri) {
					setAudioUri(uri);
					setIsDone(true);
					AccessibilityInfo.announceForAccessibility('Grabación finalizada con éxito, presiona el botón nuevamente para reproducir la grabación');
				}
			} else {
				setTimeout(() => {
					setIsFinished(false);
				}, 1500);
				AccessibilityInfo.announceForAccessibility('Grabación incorrecta, Intenta nuevamente');
			}
		} catch (err) {
			console.error('Failed to stop recording', err);
		}
	}

	async function playAudio() {
		if (sound) stopAudio();
		if (audioUri && !isPlayingAudio) {
			console.log('Playing audio..');

			setIsPlayingAudio(true);
			try {
				const { sound } = await Audio.Sound.createAsync(
					{ uri: audioUri },
					{ shouldPlay: true }
				);

				sound.setOnPlaybackStatusUpdate(playbackStatus => {
					if (playbackStatus.isLoaded && playbackStatus.didJustFinish) {
						setIsPlayingAudio(false);
					}
				});

				setSound(sound);
				await sound.playAsync();
			} catch (err) {
				console.error('Failed to play audio', err);
				setIsPlayingAudio(false);
			}
		}
	}

	function deleteRecording() {
		AccessibilityInfo.announceForAccessibility('Grabación eliminada');
		reset();
	};

	function reset() {
		setIsFinished(false);
		setIsDone(false);
		setAudioUri('');
		setIsRecording(false);
	}

	async function stopAudio() {
		if (sound) {
			await sound.stopAsync();
			setSound(undefined);
			setIsPlayingAudio(false);
		}
	}

	return { startRecording, stopRecording, reset, playAudio, stopAudio, deleteRecording };
};


export default useRecord;






// 	//TODo make function to stop audio



// export default useRecord;
