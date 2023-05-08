import { Character } from "../enums/Character.enum";
export interface DuringTaskQuestion {
	id: number;
	content: string;
	questionOrder: number;
	type: string;
	imgAlt: string;
	imgUrl: string;
	audioUrl: string;
	character: Character;
	videoUrl: string;
	memoryPro: string[];
	superRadar: string[];
	options: {
		id: number;
		content: string;
		correct: boolean;
		feedback: string;
	}[];
}
