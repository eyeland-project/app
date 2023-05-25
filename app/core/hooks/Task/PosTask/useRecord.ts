import { Audio } from 'expo-av';
import { AppState, ToastAndroid } from 'react-native';

import { useState } from 'react';
import usePlaySound from '../../usePlaySound';

const useRecord = () => {
	const [recording, setRecording] = useState<Audio.Recording>();
	const [finished, setFinished] = useState(false);
	const [done, setDone] = useState(false);
	const [audioUri, setAudioUri] = useState<string>('');
	const [playingAudio, setPlayingAudio] = useState(false);

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
			if (AppState.currentState !== 'active') {
				console.log("App is in the background, can't start recording");
				return;
			}
			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true
			});
			playSoundStartRecording();
			const { recording } = await Audio.Recording.createAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY
			);
			setRecording(recording);
		} catch (err) {
			console.error('Failed to start recording', err);
		}
	}

	async function stopRecording(minimumDuration: number) {
		console.log('Stopping recording..');
		playSoundStopRecording();
		await (recording as Audio.Recording).stopAndUnloadAsync();
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false
		});
		setFinished(true);
		setRecording(undefined);
		let message = '';
		if (
			recording?._finalDurationMillis &&
			recording?._finalDurationMillis >= minimumDuration
		) {
			playSoundSuccessRecording();
			const uri = (recording as Audio.Recording).getURI();
			console.log('Recording stopped and stored at', uri);
			if (uri) {
				setAudioUri(uri);
				setDone(true);
				message = 'Grabación finalizada con éxito';
			}
		} else {
			playSoundFailRecording();
			message = 'Grabación incorrecta, Intenta nuevamente';
			setTimeout(() => {
				setFinished(false);
			}, 1500);
		}
		ToastAndroid.show(message, ToastAndroid.SHORT);
	}


	function playAudio() {
		if (audioUri) {
			console.log('Playing audio..');

			setPlayingAudio(true);
			Audio.Sound.createAsync(
				{ uri: audioUri },
				{ shouldPlay: true }
			).then(({ sound }) => {
				sound.setOnPlaybackStatusUpdate(playbackStatus => {
					if (playbackStatus.isLoaded && playbackStatus.didJustFinish) {
						// The playback has just finished
						setPlayingAudio(false);
					}
				});
				sound.playAsync();
			});
		}
	}

	function reset() {
		setFinished(false);
		setDone(false);
		setAudioUri('');
	}

	return { recording, finished, done, startRecording, stopRecording, audioUri, reset, playAudio, playingAudio };
};

export default useRecord;
