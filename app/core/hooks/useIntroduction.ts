import { useState, useCallback } from 'react';
import usePlaySound from './usePlaySound';
import useAuthStorage from './useAuthStorage';
import axios from 'axios';

import { environment } from "../../../enviroments/environment";

import { Introduction, getIntroductionParams } from '../../shared/interfaces/Introduction.interface';

const useIntroduction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Introduction | null>(null);
    const authStorage = useAuthStorage();

    const getIntroduction = useCallback(async (inputs: getIntroductionParams) => {
        setLoading(true);
        try {
            const response = await axios.get(`${environment.apiUrl}/tasks/${inputs.taskOrder}/introduction`, {
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
        } catch (err) {
            setLoading(false);
            switch ((err as any).response.status) {
                case 400:
                    setError('Invalid task order');
                    break;
                case 401:
                    setError('Unauthorized');
                    break;
                case 403:
                    setError('Unauthorized');
                    break;
                case 404:
                    setError('Task not found');
                    break;
                case 498:
                    setError('Token expired');
                    break;
                case 500:
                    setError('Internal server error');
                    break;
                default:
                    setError('An error occurred');
                    break;
            }

        }
    }, []);

    return { loading, error, data, getIntroduction };
};

export default useIntroduction;


