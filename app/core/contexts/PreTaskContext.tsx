import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { PreTask } from '@interfaces/PreTask.interface';

interface PreTaskValues {
	data: PreTask | null;
	setData: Dispatch<SetStateAction<PreTask | null>>;
	index: number;
	setIndex: Dispatch<SetStateAction<number>>;
}

export const PreTaskContext = createContext<PreTaskValues | null>(null);

const PreTaskProvider = ({ children }: { children: React.ReactNode }) => {
	const [data, setData] = useState<PreTask | null>(null);
	const [index, setIndex] = useState<number>(0);

	return (
		<PreTaskContext.Provider value={{ data, setData, index, setIndex }}>
			{children}
		</PreTaskContext.Provider>
	);
};

export default PreTaskProvider;
