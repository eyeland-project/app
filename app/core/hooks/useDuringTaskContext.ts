import { useContext } from 'react';
import { DuringTaskContext } from '../contexts/DuringTaskContext';

export const useDuringTaskContext = () => {
    const context = useContext(DuringTaskContext);
    if (!context) {
        throw new Error('useDuringTaskContext must be used within a DuringTaskContextProvider');
    }
    return context;
}
