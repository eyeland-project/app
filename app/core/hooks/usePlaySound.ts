import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const usePlaySound = (soundPath: any, soundPathDescription?: string) => {
    const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);

    const playSound = async () => {
        if (soundPath === 28) return
        const { sound } = await Audio.Sound.createAsync(soundPath);
        setSoundObject(soundObject);

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
