import { useState, useCallback } from 'react';
import useAuthStorage from './useAuthStorage';

import axios from 'axios';

import { environment } from "@environments/environment";

import { Power } from '@enums/Power.enum';

const getError = (status: number) => {
    switch (status) {
        case 401:
            return "Missing authentication";
        case 403:
            return "Unauthorized to access this resource";
        case 404:
            return "Power not found";
        case 498:
            return "Token expired/invalid";
        case 500:
            return "Server error";
        default:
            return "Unexpected status code";
    }
}

const usePower = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<{ power: Power } | null>(null);
    const authStorage = useAuthStorage();

    const getMyPower = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${environment.apiUrl}/teams/current/power`, {
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
            getError((err as any).response.status);
        }
    }, []);

    const rollPower = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${environment.apiUrl}/teams/current/power`, {}, {
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
            getError((err as any).response.status);
        }
    }, []);

    return { loading, error, data, getMyPower, rollPower };
};

export default usePower;


