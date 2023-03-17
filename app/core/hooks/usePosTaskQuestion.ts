import { useState, useCallback } from 'react';
import useAuthStorage from './useAuthStorage';
import axios from 'axios';

import { environment } from "@environments/environment";

import { PosTaskQuestion } from '@interfaces/PosTaskQuestion.interface';

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

const usePosTaskQuestion = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PosTaskQuestion | null>(null);
    const authStorage = useAuthStorage();

    const getPosTaskQuestion = useCallback(async (inputs: { taskOrder: number, questionOrder: number }) => {
        setLoading(true);
        try {
            const response = await axios.get(`${environment.apiUrl}/tasks/${inputs.taskOrder}/postask/questions/${inputs.questionOrder}`, {
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

    const sendPosTaskAnswer = useCallback(async (inputs: { taskOrder: number, questionOrder: number, body: { idOption: number, answerSeconds: number } }) => {
        try {
            const response = await axios.post(`${environment.apiUrl}/tasks/${inputs.taskOrder}/postask/questions/${inputs.questionOrder}`, inputs.body, {
                headers: {
                    Authorization: `Bearer ${await authStorage.getAccessToken()}`,
                },
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(response.data);
            }
        } catch (err: any) {
            setError(getError(err.response.status));
        }
    }, [])

    return { loading, error, data, getPosTaskQuestion, sendPosTaskAnswer };
}

export default usePosTaskQuestion