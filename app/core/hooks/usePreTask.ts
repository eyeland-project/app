import { useState, useCallback } from 'react';
import useAuthStorage from './useAuthStorage';
import axios from 'axios';

import { environment } from "@environments/environment";

import { PreTask, getPreTaskParams } from '@interfaces/PreTask.interface';
import { errorHandler } from '../utils/errorHandler';

const errors: Map<number, string> = new Map([
    [400, 'Recurso no encontrado'],
    [401, 'Error de autenticación'],
    [403, 'No está autorizado para acceder a este recurso'],
    [404, 'Recurso no encontrado'],
    [498, 'Su autenticación ha expirado'],
    [500, 'Un error inesperado ocurrido'],
]);

const usePreTask = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PreTask | null>(null);
    const authStorage = useAuthStorage();

    const getPreTask = useCallback(async (inputs: getPreTaskParams) => {
        setError(null);
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
            setError(errorHandler(err, errors));
        }
    }, []);

    const getTotalNumberOfPreTasks = useCallback(async (taskOrder: number): Promise<number> => {
        setError(null);
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
            setError(errorHandler(err, errors));
            return 0;
        }
    }, []);

    const setPreTaskComplete = useCallback(async (inputs: { taskOrder: number }) => {
        setError(null);
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
            setError(errorHandler(err, errors));
        }
    }, []);


    return { loading, error, data, getPreTask, getTotalNumberOfPreTasks, setPreTaskComplete };
};

export default usePreTask;


