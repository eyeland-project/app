import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const usePlaySound = (soundPath: any) => {
    const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(soundPath);
        setSoundObject(soundObject);

        console.log('Playing Sound');
        await sound.playAsync();
    };

    useEffect(() => {
        return soundObject
            ? () => {
                console.log('Unloading Sound');
                soundObject.unloadAsync();
            }
            : undefined;
    }, [soundObject]);

    return playSound;
};

export default usePlaySound;
