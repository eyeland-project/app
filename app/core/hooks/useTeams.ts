import { useState, useCallback } from 'react';
import useAuthStorage from './useAuthStorage';

import axios from 'axios';

import { environment } from "@environments/environment";

import { Team } from '@interfaces/Team.interface';

const getError = (status: number) => {
    switch (status) {
        case 400:
            return "Invalid body";
        case 401:
            return "Missing authentication";
        case 403:
            return "Unauthorized to access this resource | Team is full";
        case 404:
            return "Team not found";
        case 409:
            return "Student already has a team";
        case 410:
            return "Team is not active";
        case 498:
            return "Token expired/invalid";
        case 500:
            return "Server error";
        default:
            return "Unexpected status code";
    }
}

const useTeams = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Team[] | null>(null);
    const authStorage = useAuthStorage();

    const getTeams = useCallback(async () => {
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
            setError(getError((err as any).response.status));
        }
    }, []);

    const joinTeam = useCallback(async (data: { code: string, taskOrder: number }) => {
        setLoading(true);
        try {
            const response = await axios.post(`${environment.apiUrl}/teams`, {
                headers: {
                    Authorization: `Bearer ${await authStorage.getAccessToken()}`,
                },
                body: data,
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
            setError(getError((err as any).response.status));
        }
    }, []);

    const leaveTeam = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.put(`${environment.apiUrl}/teams`, {
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
            setError(getError((err as any).response.status));
        }
    }, []);

    const getMyTeam = useCallback(async () => {
        setLoading(true);
        try {
            console.log("getMyTeam")
            const response = await axios.get(`${environment.apiUrl}/teams/current`, {
                headers: {
                    Authorization: `Bearer ${await authStorage.getAccessToken()}`,
                },
                timeout: 10000,
            });

            console.log("getMyTeam response")
            console.log(response.data)

            if (response.status === 200) {
                setLoading(false);
                setData([response.data]);
                return response.data;
            } else {
                throw new Error(response.data);
            }
        } catch (err) {
            setLoading(false);
            setError(getError((err as any).response.status));
        }
    }, []);

    return { loading, error, data, getTeams, joinTeam, leaveTeam, getMyTeam };
};

export default useTeams;


