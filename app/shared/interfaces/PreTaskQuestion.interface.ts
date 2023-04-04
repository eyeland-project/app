import { PreTaskTypeQuestion } from "../enums/PreTaskTypeQuestion.enum";

export interface PreTaskQuestion {
    id: number;
    content: string;
    type: PreTaskTypeQuestion;
    imgAlt: string;
    imgUrl: string;
    options: {
        id: number;
        content: string;
        correct: boolean;
        feedback: string;
    }[];
}