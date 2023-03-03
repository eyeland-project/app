export interface Progress {
    pretask: {
        completed: boolean;
        blocked: boolean;
    },
    duringtask: {
        completed: boolean;
        blocked: boolean;
    },
    postask: {
        completed: boolean;
        blocked: boolean;
    }
}

export interface getProgressParams {
    taskOrder: number;
}