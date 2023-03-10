import { Dispatch, SetStateAction, createContext } from 'react';
import { Socket } from 'socket.io-client';
import { Power } from '@enums/Power.enum';

interface DuringTaskValues {
    socket: Socket;
    power: Power;
    setPower: Dispatch<SetStateAction<Power>>
}

export const DuringTaskContext = createContext<DuringTaskValues | null>(null);