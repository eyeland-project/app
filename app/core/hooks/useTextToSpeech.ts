import * as Speech from 'expo-speech';
import { useState } from 'react';

export default function useTextToSpeech() {
	const [playing, setPlaying] = useState(false);

	Speech.VoiceQuality.Enhanced;

	const speak = (text: string | string[], language?: string) => {
		if (Array.isArray(text)) {
			Speech.speak(text[0], {
				language: language || 'en',
				onDone() {
					setTimeout(() => {
						Speech.speak(text[1], {
							language: language || 'en'
						});
					}, 400);
				}
			});
		} else {
			Speech.speak(text, {
				language: language || 'en',
				onStart() {
					setPlaying(true);
				},
				onDone() {
					setPlaying(false);
				}
			});
		}
	};

	return { speak, playing };
}
