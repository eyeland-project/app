import { useState, useCallback } from 'react';
import useAuthStorage from './useAuthStorage';
import axios from 'axios';

import { environment } from "@environments/environment";

import { Progress, getProgressParams } from '@interfaces/Progress.interface';

const useProgress = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Progress | null>(null);
    const authStorage = useAuthStorage();

    const getProgress = useCallback(async (inputs: getProgressParams) => {
        setLoading(true);

        try {
            const response = await axios.get(`${environment.apiUrl}/tasks/${inputs.taskOrder}/progress`, {
                headers: {
                    Authorization: `Bearer ${await authStorage.getAccessToken()}`,
                },
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
                case 400:
                    setError('Invalid task order');
                    break;
                case 401:
                    setError('Unauthorized');
                    break;
                case 403:
                    setError('Unauthorized');
                    break;
                case 404:
                    setError('Task not found');
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

    return { loading, error, data, getProgress };
}

export default useProgress