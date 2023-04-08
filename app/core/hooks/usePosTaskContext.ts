import { useContext } from 'react';
import { PosTaskContext } from '../contexts/PosTaskContext';

export const usePosTaskContext = () => {
    const context = useContext(PosTaskContext);
    if (!context) {
        throw new Error('usePosTaskContext must be used within a PosTaskContextProvider');
    }
    return context;
}