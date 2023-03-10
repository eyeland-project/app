export interface PosTaskQuestion {
    id: number;
    content: string;
    type: string;
    imgAlt: string;
    imgUrl: string;
    audioUrl: string;
    videoUrl: string;
    options: {
        id: number;
        content: string;
        correct: boolean;
        feedback: string;
    }[];
}