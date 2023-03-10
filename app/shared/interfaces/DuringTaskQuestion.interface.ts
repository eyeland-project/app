export interface DuringTaskQuestion {
    id: number;
    content: string;
    type: string;
    imgAlt: string;
    imgUrl: string;
    audioUrl: string;
    videoUrl: string;
    nounTranslation: string[];
    prepositionTranslation: string[];
    options: {
        id: number;
        content: string;
        correct: boolean;
        feedback: string;
    }[];
}