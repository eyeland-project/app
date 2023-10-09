import { Character } from '../enums/Character.enum';
import { QuestionLang } from '../enums/QuestionLang.enum';

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
	lang: QuestionLang;
	options: {
		id: number;
		content: string;
		correct: boolean;
		feedback: string;
		mainImgUrl: string | null;
		mainImgAlt: string | null;
		previewImgUrl: string | null;
		previewImgAlt: string | null;
	}[];
}
