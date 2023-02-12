import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface TaskContextProps {
    progress: number;
    setProgress: Dispatch<SetStateAction<number>>;
    phaseCompleted: boolean;
    setPhaseCompleted: Dispatch<SetStateAction<boolean>>;
    onPressNext: () => void;
    setOnPressNext: Dispatch<SetStateAction<() => void>>;
}

const TaskContext = createContext<TaskContextProps | null>(null);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [progress, setProgress] = useState(0);
    const [phaseCompleted, setPhaseCompleted] = useState(false);
    const [onPressNext, setOnPressNext] = useState<() => void>(() => () => { });

    return (
        <TaskContext.Provider value={{ progress, setProgress, phaseCompleted, setPhaseCompleted, onPressNext, setOnPressNext }}>
            {children}
        </TaskContext.Provider>
    );
};

export { TaskContext, TaskProvider };
