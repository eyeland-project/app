import { useState, useCallback } from 'react';
import useAuthStorage from '@hooks/useAuthStorage';
import { useNavigation } from '@react-navigation/native';

import { PreTask } from '@interfaces/PreTask.interface';
import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface';
import { PreTaskTypeQuestion } from '@app/shared/enums/PreTaskTypeQuestion.enum';
import { PRETASK } from '../PRETASK';

const usePreTaskMock = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PreTask | null>(null);
    const authStorage = useAuthStorage();
    const navigation = useNavigation<any>();

    const getPreTask = useCallback(async (inputs: { taskOrder: number }) => {
        setError(null);
        setLoading(true);
        try {
            const response = await new Promise<{ status: number; data: PreTask }>((resolve) => {
                setTimeout(() => {
                    resolve({ status: 200, data: PRETASK[inputs.taskOrder - 1] });
                }, 1000);
            });

            if (response.status === 200) {
                setLoading(false);
                setData(response.data);
                return response.data;
            } else {
                throw new Error();
            }
        } catch (err: any) {
            setLoading(false);
            setError(err.message);
        }
    }, []);

    const setPreTaskComplete = useCallback(async (inputs: { taskOrder: number }) => {
        setError(null);
        setLoading(true);
        try {
            const response = await new Promise<{ status: number; data: { success: boolean } }>((resolve) => {
                setTimeout(() => {
                    resolve({ status: 200, data: { success: true } });
                }, 500);
            });

            if (response.status === 200) {
                setLoading(false);
                return response.data;
            } else {
                throw new Error();
            }
        } catch (err: any) {
            setLoading(false);
            setError(err.message);
        }
    }, []);

    const nextQuestion = ({ question, taskOrder }: { question: PreTaskQuestion, taskOrder: number }) => {
        switch (question.type) {
            case PreTaskTypeQuestion.ORDER:
                // navigation.navigate('Duolingo', { taskOrder });
                break;
            case PreTaskTypeQuestion.FLASHCARD:
                navigation.navigate('Flashcard', { taskOrder });
                break;
            case PreTaskTypeQuestion.MULTIPLE_CHOICE:
                navigation.navigate('MultipleChoice', { taskOrder });
                break;
            case PreTaskTypeQuestion.FIll_BLANK:
                navigation.navigate('FillBlank', { taskOrder });
                break;
            default:
                console.error('No question type found');
                break;
        }
    }

    return { loading, error, data, getPreTask, setPreTaskComplete, nextQuestion };
};

export default usePreTaskMock;