import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const usePlaySound = (soundPath: any, soundPathDescription?: string) => {
	const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(soundPath);
		setSoundObject(sound);

		await sound.playAsync();
	};

	useEffect(() => {
		return soundObject
			? () => {
					soundObject.unloadAsync();
			  }
			: undefined;
	}, [soundObject]);

	return playSound;
};

export default usePlaySound;
