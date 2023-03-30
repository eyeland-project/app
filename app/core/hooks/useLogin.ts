import { useState, useCallback } from 'react';
import useAuthStorage from './useAuthStorage';
import usePlaySound from './usePlaySound';
import axios from 'axios';

import { errorHandler } from '@utils/errorHandler';
import { environment } from "@environments/environment";

import { Login } from "@interfaces/Login.interface";

const errors: Map<number, string> = new Map([
    [401, 'Usuario o contraseña incorrectos'],
    [500, 'Un error inesperado ocurrido'],
]);

const useLogin = () => {
    const playSoundSuccess = usePlaySound(require('@sounds/loginSucceeded.wav'));
    const playSoundError = usePlaySound(require('@sounds/loginFailed.wav'));
    const authStorage = useAuthStorage();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Login | null>(null);

    const login = useCallback(async (inputs: Login) => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post(`${environment.apiUrl}/login`, {
                username: inputs.username,
                password: inputs.password,
            }, {
                timeout: 10000,
            });

            if (response.status === 200) {
                setLoading(false);
                playSoundSuccess();
                setData(response.data);
                await authStorage.setAccessToken(response.data.token);
                return response.data;
            } else {
                throw new Error(response.data);
            }
        } catch (err: any) {
            setLoading(false);
            setError(errorHandler(err, errors));
            playSoundError();
        }
    }, []);

    return { loading, error, data, login };
};

export default useLogin;
