import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { PosTask } from '@interfaces/PosTask.interface';

import usePosTask from '../hooks/usePosTask';
import useTaskContext from '../hooks/useTaskContext';

interface PosTaskValues {
    numQuestions: number | null;
}

export const PosTaskContext = createContext<PosTaskValues | null>(null);