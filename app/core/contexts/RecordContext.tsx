import { Audio } from 'expo-av';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface RecordContextProps {
	recording?: Audio.Recording;
	setRecording: Dispatch<SetStateAction<Audio.Recording | undefined>>;
	audioUri?: string;
	setAudioUri: Dispatch<SetStateAction<string | undefined>>;
	sound?: Audio.Sound;
	setSound: Dispatch<SetStateAction<Audio.Sound | undefined>>;
	isRecording: boolean;
	setIsRecording: Dispatch<SetStateAction<boolean>>;
	isFinished: boolean;
	setIsFinished: Dispatch<SetStateAction<boolean>>;
	isDone: boolean;
	setIsDone: Dispatch<SetStateAction<boolean>>;
	isPlayingAudio: boolean;
	setIsPlayingAudio: Dispatch<SetStateAction<boolean>>;
}

const RecordContext = createContext<RecordContextProps | null>(null);

const RecordProvider = ({ children }: { children: React.ReactNode }) => {
	const [recording, setRecording] = useState<Audio.Recording>();
	const [audioUri, setAudioUri] = useState<string>();
	const [sound, setSound] = useState<Audio.Sound | undefined>();

	const [isRecording, setIsRecording] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [isDone, setIsDone] = useState(false);

	const [isPlayingAudio, setIsPlayingAudio] = useState(false);

	return (
		<RecordContext.Provider
			value={{
				recording,
				setRecording,
				audioUri,
				setAudioUri,
				sound,
				setSound,
				isRecording,
				setIsRecording,
				isFinished,
				setIsFinished,
				isDone,
				setIsDone,
				isPlayingAudio,
				setIsPlayingAudio
			}}
		>
			{children}
		</RecordContext.Provider>
	);
};

export { RecordContext, RecordProvider };
