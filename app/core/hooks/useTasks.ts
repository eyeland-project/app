import { useState, useCallback } from 'react';
import usePlaySound from './usePlaySound';
import axios from 'axios';

import { environment } from "../../../enviroments/environment";

import { Task } from '../../shared/interfaces/Task.interface';

const useTasks = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Task[] | null>(null);

    const getTasks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${environment.apiUrl}/tasks`, {
                timeout: 10000,
            });

            if (response.status === 200) {
                setLoading(false);
                setData(response.data);
                return response.data;
            } else {
                throw new Error(response.data);
            }
        } catch (err) {
            setLoading(false);
            setError((err as any).message || 'An error occurred');
        }
    }, []);

    return { loading, error, data, getTasks };
};

export default useTasks;


