import { useState, useCallback } from 'react';
import useAuthStorage from './useAuthStorage';

import axios from 'axios';

import { errorHandler } from '../utils/errorHandler';
import { environment } from "@environments/environment";

import { Task } from '@interfaces/Task.interface';

const errors: Map<number, string> = new Map([
    [401, 'Error de autenticación'],
    [403, 'No está autorizado para acceder a este recurso'],
    [498, 'Su autenticación ha expirado'],
    [500, 'Un error inesperado ocurrido'],
]);

const useTasks = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Task[] | null>(null);
    const authStorage = useAuthStorage();

    const getTasks = useCallback(async () => {
        setError(null);
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
        } catch (err: any) {
            setLoading(false);
            setError(errorHandler(err, errors));
        }
    }, []);

    return { loading, error, data, getTasks };
};

export default useTasks;


