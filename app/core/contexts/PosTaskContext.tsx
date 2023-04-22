import {
	Dispatch,
	SetStateAction,
	createContext,
	useEffect,
	useState
} from 'react';
import { PosTask } from '@interfaces/PosTask.interface';

import usePosTask from '../hooks/Task/PosTask/usePosTask';
import useTaskContext from '../hooks/Task/useTaskContext';

interface PosTaskValues {
	numQuestions: number | null;
}

export const PosTaskContext = createContext<PosTaskValues | null>(null);
