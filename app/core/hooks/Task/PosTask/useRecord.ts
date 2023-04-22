import { Audio } from 'expo-av';

import { useState } from 'react';
import usePlaySound from '../../usePlaySound';

const useRecord = () => {
	const [recording, setRecording] = useState<Audio.Recording>();
	const [finished, setFinished] = useState(false);
	const [done, setDone] = useState(false);
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

	async function stopRecording() {
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
			recording?._finalDurationMillis >= 5000
		) {
			setDone(true);
			playSoundSuccessRecording();
			const uri = (recording as Audio.Recording).getURI();
			console.log('Recording stopped and stored at', uri);
			return uri;
		} else {
			playSoundFailRecording();
			setTimeout(() => {
				setFinished(false);
			}, 1500);
		}
	}

	return { recording, finished, done, startRecording, stopRecording };
};

export default useRecord;
