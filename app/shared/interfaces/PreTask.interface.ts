export interface PreTask {
    id: number;
    topic: string;
    url: string;
}

export interface getPreTaskParams {
    taskOrder: number;
    linkOrder: number;
}