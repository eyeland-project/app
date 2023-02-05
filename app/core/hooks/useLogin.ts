import { useState, useCallback } from 'react';
import axios from 'axios';

import { environment } from "../../../enviroments/environment";

import { Login } from "../../shared/interfaces/Login.interface";

const useLogin = () => {
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
                return response.data;
            } else {
                throw new Error(response.statusText);
            }
        } catch (err) {
            setLoading(false);
            setError((err as any).message || 'An error occurred');
        }
    }, []);

    return { loading, error, data, login };
};

export default useLogin;


