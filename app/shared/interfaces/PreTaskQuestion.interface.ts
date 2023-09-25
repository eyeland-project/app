import { PreTaskTypeQuestion } from '../enums/PreTaskTypeQuestion.enum';
import { QuestionLang } from '../enums/QuestionLang.enum';

export interface PreTaskQuestion {
	id: number;
	content: string;
	type: PreTaskTypeQuestion;
	imgAlt: string;
	imgUrl: string;
	lang: QuestionLang;
	options: {
		id: number;
		content: string;
		correct: boolean;
		feedback: string;
	}[];
}
