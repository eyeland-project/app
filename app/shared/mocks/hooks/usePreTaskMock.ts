import { useState, useCallback } from 'react';
import useAuthStorage from '@hooks/useAuthStorage';
import { useNavigation } from '@react-navigation/native';

import { PreTask } from '@interfaces/PreTask.interface';
import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface';
import { PreTaskTypeQuestion } from '@enums/PreTaskTypeQuestion.enum';
import { PRETASK } from '../PRETASK';
import useTaskContext from '@hooks/useTaskContext';

import usePreTaskContext from '@hooks/usePreTaskContext';

const usePreTaskMock = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PreTask | null>(null);
    const authStorage = useAuthStorage();
    const navigation = useNavigation<any>();
    const { index, data: dataContext, setIndex } = usePreTaskContext();
    const { taskOrder, setProgress } = useTaskContext();

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

    const nextQuestion = () => {
        setTimeout(() => {
            if (!dataContext) return null;

            if (index === dataContext.length) {
                navigation.reset({
                    index: 0,
                    routes: [
                        { name: 'Introduction', params: { taskOrder } },
                    ]
                })
                return null;
            }

            const question: PreTaskQuestion = dataContext[index];
            let name = '';

            switch (question.type) {
                case PreTaskTypeQuestion.ORDER:
                    name = 'Order';
                    break;
                case PreTaskTypeQuestion.FLASHCARD:
                    name = 'FlashCards';
                    break;
                case PreTaskTypeQuestion.MULTIPLE_CHOICE:
                    name = 'MultipleChoice';
                    break;
                case PreTaskTypeQuestion.FIll_BLANK:
                    name = 'FillBlank';
                    break;
                default:
                    console.error('No question type found');
                    break;
            }

            if (name === '') {
                navigation.reset({
                    index: 0,
                    routes: [
                        { name: 'Introduction', params: { taskOrder } }
                    ]
                })
            } else {
                navigation.reset({
                    index: 1,
                    routes: [
                        { name: name, params: { question } }
                    ]
                })
            }

            setProgress((index + 1) / dataContext.length);
            setIndex(index + 1);
        }, 500);
    }

    return { loading, error, data, getPreTask, setPreTaskComplete, nextQuestion };
};

export default usePreTaskMock;