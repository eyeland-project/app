import { Mechanics } from '@enums/Mechanics.enum';

export interface DuringTask {
	description: string;
	keywords: string[];
	numQuestions: number;
	mechanics: Mechanics;
}
