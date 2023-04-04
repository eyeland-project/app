import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { PreTask } from '@interfaces/PreTask.interface';

interface PreTaskValues {
    data: PreTask | null;
    setData: Dispatch<SetStateAction<PreTask | null>>;
}

export const PreTaskContext = createContext<PreTaskValues | null>(null);

const PreTaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<PreTask | null>(null);

    return (
        <PreTaskContext.Provider value={{ data, setData }}>
            {children}
        </PreTaskContext.Provider>
    );
};

export default PreTaskProvider;