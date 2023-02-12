import { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';

const useTaskContext = () => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) {
        throw new Error('useTaskContext must be used within a TaskContextProvider');
    }

    return taskContext;
};

export default useTaskContext;