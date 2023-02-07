export interface Introduction {
    idTask: number;
    name: string;
    description: string;
    thumbnail: string;
    taskOrder: number;
    keywords: string[];
    longDescription: string;
}

export interface getIntroductionParams {
    taskOrder: number;
}
