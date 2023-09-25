import { Dispatch, SetStateAction, createContext } from 'react';
import { Socket } from 'socket.io-client';
import { Power } from '@enums/Power.enum';
import { Team } from '@interfaces/Team.interface';
import { Mechanics } from '@app/shared/enums/Mechanics.enum';

interface DuringTaskValues {
	socket: Socket;
	power: Power | null;
	setPower: Dispatch<SetStateAction<Power | null>>;
	team: Team | null;
	setTeam: Dispatch<SetStateAction<Team | null>>;
	position: number | null;
	setPosition: Dispatch<SetStateAction<number | null>>;
	numQuestions: number | null;
	mechanics: Mechanics[] | null;
	setMechanics: Dispatch<SetStateAction<Mechanics[] | null>>;
}

export const DuringTaskContext = createContext<DuringTaskValues | null>(null);
