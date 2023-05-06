import { Character } from "../enums/Character.enum";
import { PosTaskQuestionType } from "../enums/PosTaskQuestion.enum";

export interface PosTaskQuestion {
	id: number;
	questionOrder: number;
	content: string;
	imgAlt: string;
	imgUrl: string;
	hint: string;
	audioUrl: string;
	videoUrl: string;
	type: PosTaskQuestionType;
	character: Character;
	options: {
		id: number;
		content: string;
		correct: boolean;
		feedback: string;
	}[];
}
