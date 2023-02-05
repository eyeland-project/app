import { useState, useCallback } from 'react';
import useAuthStorage from './useAuthStorage';
import usePlaySound from './usePlaySound';
import axios from 'axios';

import { environment } from "../../../enviroments/environment";

import { Login } from "../../shared/interfaces/Login.interface";

const useLogin = () => {
    const playSoundSuccess = usePlaySound(require('../../../assets/sounds/loginSucceeded.wav'));
    const playSoundError = usePlaySound(require('../../../assets/sounds/loginFailed.wav'));
    const authStorage = useAuthStorage();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any | null>(null);

    const login = useCallback(async (inputs: Login) => {
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
                setData(response.data);
                playSoundSuccess();
                await authStorage.setAccessToken(response.data.userToken);
                return response.data;
            } else {
                throw new Error(response.data);
            }
        } catch (err) {
            setLoading(false);
            setError((err as any).message || 'An error occurred');
            playSoundError();
        }
    }, []);

    return { loading, error, data, login };
};

export default useLogin;


