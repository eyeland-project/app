import { useState, useCallback } from 'react';
import useAuthStorage from './useAuthStorage';

import axios from 'axios';

import { environment } from "@environments/environment";

import { Task } from '@interfaces/Task.interface';

const useTasks = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Task[] | null>(null);
    const authStorage = useAuthStorage();

    const getTasks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${environment.apiUrl}/tasks`, {
                headers: {
                    Authorization: `Bearer ${await authStorage.getAccessToken()}`,
                },
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
            switch ((err as any).response.status) {
                case 401:
                    setError('Unauthorized');
                    break;
                case 403:
                    setError('Unauthorized');
                    break;
                case 498:
                    setError('Token expired');
                    break;
                case 500:
                    setError('Internal server error');
                    break;
                default:
                    setError('An error occurred');
                    break;
            }
        }
    }, []);

    return { loading, error, data, getTasks };
};

export default useTasks;


