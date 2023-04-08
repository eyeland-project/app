import * as Speech from 'expo-speech';

export default function useTextToSpeech() {
    Speech.VoiceQuality.Enhanced;

    const speak = (text: string | string[], language?: string) => {

        if (Array.isArray(text)) {
            Speech.speak(text[0], {
                language: language || 'en',
                onDone() {
                    setTimeout(() => {
                        Speech.speak(text[1], {
                            language: language || 'en',
                        });
                    }, 400);
                },
            });
        } else {
            Speech.speak(text, {
                language: language || 'en',
            });
        }

    };


    return { speak };
}