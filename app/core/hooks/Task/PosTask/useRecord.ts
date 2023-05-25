import { Audio } from 'expo-av';
import { AppState } from 'react-native';

import { useState } from 'react';
import usePlaySound from '../../usePlaySound';

const useRecord = () => {
	const [recording, setRecording] = useState<Audio.Recording>();
	const [finished, setFinished] = useState(false);
	const [done, setDone] = useState(false);
	const [audioUri, setAudioUri] = useState<string>('');
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
				return uri;
			}
		} else {
			playSoundFailRecording();
			setTimeout(() => {
				setFinished(false);
			}, 1500);
		}
	}

	function reset() {
		setFinished(false);
		setDone(false);
		setAudioUri('');
	}

	return { recording, finished, done, startRecording, stopRecording, audioUri, reset };
};

export default useRecord;
