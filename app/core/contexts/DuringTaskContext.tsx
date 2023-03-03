import { createContext } from 'react';
import { Socket } from 'socket.io-client';

interface DuringTaskValues {
    socket: Socket;
}

export const DuringTaskContext = createContext<DuringTaskValues | null>(null);