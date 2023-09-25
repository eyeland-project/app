import { Character } from '../enums/Character.enum';
import { PosTaskQuestionType } from '../enums/PosTaskQuestion.enum';
import { QuestionLang } from '../enums/QuestionLang.enum';

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
	lang: QuestionLang;
	options: {
		id: number;
		content: string;
		correct: boolean;
		feedback: string;
	}[];
}
