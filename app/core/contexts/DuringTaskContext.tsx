import { Dispatch, SetStateAction, createContext } from 'react';
import { Socket } from 'socket.io-client';
import { Power } from '@enums/Power.enum';
import { Team } from '@interfaces/Team.interface';

interface DuringTaskValues {
    socket: Socket;
    power: Power;
    setPower: Dispatch<SetStateAction<Power>>
    team: Team | null;
    setTeam: Dispatch<SetStateAction<Team | null>>;
}

export const DuringTaskContext = createContext<DuringTaskValues | null>(null);