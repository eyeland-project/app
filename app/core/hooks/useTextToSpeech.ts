import * as Speech from 'expo-speech';

export default function useTextToSpeech() {
    Speech.VoiceQuality.Enhanced;

    const speak = (text: string, language?: string) => {
        Speech.speak(text, {
            language: language || 'en',
        });
    };


    return { speak };
}