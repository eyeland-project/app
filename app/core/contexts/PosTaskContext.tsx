import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { PosTask } from '@interfaces/PosTask.interface';

interface PosTaskValues {
	data: PosTask | null;
	setData: Dispatch<SetStateAction<PosTask | null>>;
	index: number;
	setIndex: Dispatch<SetStateAction<number>>;
}

export const PosTaskContext = createContext<PosTaskValues | null>(null);

const PosTaskProvider = ({ children }: { children: React.ReactNode }) => {
	const [data, setData] = useState<PosTask | null>(null);
	const [index, setIndex] = useState<number>(0);

	return (
		<PosTaskContext.Provider value={{ data, setData, index, setIndex }}>
			{children}
		</PosTaskContext.Provider>
	);
};

export default PosTaskProvider;
