import { useState, useCallback } from 'react';
import usePlaySound from './usePlaySound';
import useAuthStorage from './useAuthStorage';
import axios from 'axios';

import { environment } from "@environments/environment";

import { PreTask, getPreTaskParams } from '@interfaces/PreTask.interface';

const usePreTask = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PreTask | null>(null);
    const authStorage = useAuthStorage();

    const getPreTask = useCallback(async (inputs: getPreTaskParams) => {
        setLoading(true);
        try {
            const response = await axios.get(`${environment.apiUrl}/tasks/${inputs.taskOrder}/pretask/links/${inputs.linkOrder}`, {
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
                case 400:
                    setError('Invalid taskOrder | Invalid linkOrder');
                    break;
                case 401:
                    setError('Missing authentication');
                    break;
                case 403:
                    setError('Unauthorized to access this resource');
                    break;
                case 404:
                    setError('Task not found');
                    break;
                case 410:
                    setError('Endpoint deprecated');
                    break;
                case 498:
                    setError('Invalid token');
                    break;
                case 500:
                    setError('Internal server error');
                    break;
                default:
                    setError('Un error ha ocurrido');
                    break;
            }
        }
    }, []);

    const getTotalNumberOfPreTasks = useCallback(async (taskOrder: number): Promise<number> => {
        setLoading(true);
        try {
            const response = await axios.get(`${environment.apiUrl}/tasks/${taskOrder}/pretask`, {
                headers: {
                    Authorization: `Bearer ${await authStorage.getAccessToken()}`,
                },
                timeout: 10000,
            });

            if (response.status === 200) {
                setLoading(false);
                return response.data.numLinks as number;
            } else {
                throw new Error(response.data);
            }
        } catch (err) {
            setLoading(false);
            switch ((err as any).response.status) {
                case 400:
                    setError('Invalid taskOrder | Invalid linkOrder');
                    break;
                case 401:
                    setError('Missing authentication');
                    break;
                case 403:
                    setError('Unauthorized to access this resource');
                    break;
                case 404:
                    setError('Task not found');
                    break;
                case 498:
                    setError('Invalid token');
                    break;
                case 500:
                    setError('Internal server error');
                    break;
                default:
                    setError('Un error ha ocurrido');
                    break;
            }
            return 0;
        }
    }, []);

    const setPreTaskFinished = useCallback(async (taskOrder: number) => {
        setLoading(true);
        try {
            const response = await axios.post(`${environment.apiUrl}/tasks/${taskOrder}/pretask/done`, {}, {
                headers: {
                    Authorization: `Bearer ${await authStorage.getAccessToken()}`,
                },
                timeout: 10000,
            });

            if (response.status === 200) {
                setLoading(false);
                return response.data;
            } else {
                throw new Error(response.data);
            }
        } catch (err) {
            setLoading(false);
            switch ((err as any).response.status) {
                case 400:
                    setError('Invalid taskOrder | Invalid linkOrder');
                    break;
                case 401:
                    setError('Missing authentication');
                    break;
                case 403:
                    setError('Unauthorized to access this resource');
                    break;
                case 404:
                    setError('Task not found');
                    break;
                case 498:
                    setError('Invalid token');
                    break;
                case 500:
                    setError('Internal server error');
                    break;
                default:
                    setError('Un error ha ocurrido');
                    break;
            }
        }
    }, []);


    return { loading, error, data, getPreTask, getTotalNumberOfPreTasks, setPreTaskDone: setPreTaskFinished };
};

export default usePreTask;


