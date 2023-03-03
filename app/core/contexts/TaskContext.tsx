import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface TaskContextProps {
    progress?: number;
    setProgress: Dispatch<SetStateAction<number | undefined>>;
    phaseCompleted: boolean;
    setPhaseCompleted: Dispatch<SetStateAction<boolean>>;
    onPressNext: () => void;
    setOnPressNext: Dispatch<SetStateAction<() => void>>;
    resetContext: () => void;
}

const TaskContext = createContext<TaskContextProps | null>(null);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [progress, setProgress] = useState<number | undefined>(undefined);
    const [phaseCompleted, setPhaseCompleted] = useState(false);
    const [onPressNext, setOnPressNext] = useState<() => void>(() => () => { });

    const resetContext = () => {
        setProgress(undefined);
        setPhaseCompleted(false);
        setOnPressNext(() => () => { });
    };

    return (
        <TaskContext.Provider value={{ progress, setProgress, phaseCompleted, setPhaseCompleted, onPressNext, setOnPressNext, resetContext }}>
            {children}
        </TaskContext.Provider>
    );
};

export { TaskContext, TaskProvider };
