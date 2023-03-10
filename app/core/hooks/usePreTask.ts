import { useState, useCallback } from 'react';
import usePlaySound from './usePlaySound';
import useAuthStorage from './useAuthStorage';
import axios from 'axios';

import { environment } from "@environments/environment";

import { PreTask, getPreTaskParams } from '@interfaces/PreTask.interface';

const getError = (status: number) => {
    switch (status) {
        case 400:
            return 'Invalid task order';
        case 401:
            return 'Unauthorized';
        case 403:
            return 'Unauthorized';
        case 404:
            return 'Task not found';
        case 498:
            return 'Token expired';
        case 500:
            return 'Internal server error';
        default:
            return 'An error occurred';
    }
};

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
        } catch (err: any) {
            setLoading(false);
            setError(getError(err.response.status));
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
        } catch (err: any) {
            setLoading(false);
            setError(getError(err.response.status));
            return 0;
        }
    }, []);

    const setPreTaskComplete = useCallback(async (inputs: { taskOrder: number }) => {
        setLoading(true);
        try {
            const response = await axios.post(`${environment.apiUrl}/tasks/${inputs.taskOrder}/pretask/complete`, {}, {
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
        } catch (err: any) {
            setLoading(false);
            setError(getError(err.response.status));
        }
    }, []);


    return { loading, error, data, getPreTask, getTotalNumberOfPreTasks, setPreTaskComplete };
};

export default usePreTask;


