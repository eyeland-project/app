import * as Speech from 'expo-speech';

export default function useTextToSpeech() {
    Speech.VoiceQuality.Enhanced;

    const speak = (text: string) => {
        Speech.speak(text, {
            language: 'en',
        });
    };


    return { speak };
}