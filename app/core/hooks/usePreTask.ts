import { useState, useCallback } from 'react';
import usePlaySound from './usePlaySound';
import useAuthStorage from './useAuthStorage';
import axios from 'axios';

import { environment } from "@environments/environment";

import { PreTask } from '@interfaces/PreTask.interface';
import { errorHandler } from '../utils/errorHandler';
import { PreTaskTypeQuestion } from '@enums/PreTaskTypeQuestion.enum';
import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface';

import { useNavigation } from '@react-navigation/native';

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
    const navigation = useNavigation<any>();

    const getPreTask = useCallback(async (inputs: { taskOrder: number }) => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.get(`${environment.apiUrl}/tasks/${inputs.taskOrder}/pretask`, {
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
            setError((err as any).message || 'An error occurred');
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

    const nextQuestion = ({ question, taskOrder }: { question: PreTaskQuestion, taskOrder: number }) => {
        switch (question.type) {
            case PreTaskTypeQuestion.DUOLINGO:
                navigation.navigate('Duolingo', { taskOrder });
                break;
            case PreTaskTypeQuestion.FLASHCARD:
                navigation.navigate('Flashcard', { taskOrder });
                break;
            case PreTaskTypeQuestion.MULTIPLE_CHOICE:
                navigation.navigate('MultipleChoice', { taskOrder });
                break;
            case PreTaskTypeQuestion.MISSING_WORD:
                navigation.navigate('MissingWord', { taskOrder });
                break;
            default:
                console.error('No question type found');
                break;
        }
    }

    return { loading, error, data, getPreTask, setPreTaskComplete, nextQuestion };
};

export default usePreTask;
