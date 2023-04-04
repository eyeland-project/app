import { useState, useCallback } from 'react';
import useAuthStorage from './useAuthStorage';

import axios from 'axios';

import { errorHandler } from '../utils/errorHandler';
import { environment } from "@environments/environment";

import { Team } from '@interfaces/Team.interface';

const errors: Map<number, string> = new Map([
    [400, 'Petición inválida'],
    [401, 'Error de autenticación'],
    [403, 'No está autorizado para acceder a este recurso'],
    [404, 'Recurso no encontrado'],
    [409, 'El estudiante ya tiene un equipo'],
    [410, 'El equipo no está activo'],
    [498, 'Su autenticación ha expirado'],
    [500, 'Un error inesperado ocurrido'],
]);

const useTeams = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Team[] | null>(null);
    const authStorage = useAuthStorage();

    const getTeams = useCallback(async () => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.get(`${environment.apiUrl}/teams`, {
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
            setError(errorHandler(err, errors));
        }
    }, []);

    return { loading, error, data, getTeams };
};

export default useTeams;


