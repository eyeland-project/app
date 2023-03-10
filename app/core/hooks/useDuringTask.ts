import { useState, useCallback } from 'react';
import useAuthStorage from './useAuthStorage';
import axios from 'axios';

import { environment } from "@environments/environment";

import { DuringTask } from '@interfaces/DuringTask.interface';

const getError = (status: number) => {
    switch (status) {
        case 400:
            return 'Invalid task order'
        case 401:
            return 'Unauthorized'
        case 403:
            return 'Unauthorized'
        case 404:
            return 'Task not found'
        case 498:
            return 'Token expired'
        case 500:
            return 'Internal server error'
        default:
            return 'An error occurred'
    }
}

const useDuringTask = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<DuringTask | null>(null);
    const authStorage = useAuthStorage();

    const getDuringTask = useCallback(async (inputs: { taskOrder: number }) => {
        setLoading(true);
        try {
            const response = await axios.get(`${environment.apiUrl}/tasks/${inputs.taskOrder}/duringtask`, {
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
        } catch (err: any) {
            setLoading(false);
            setError(getError(err.response.status));
        }
    }, []);

    return { loading, error, data, getDuringTask }
}

export default useDuringTask