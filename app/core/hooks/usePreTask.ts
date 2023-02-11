import { useState, useCallback } from 'react';
import usePlaySound from './usePlaySound';
import axios from 'axios';

import { environment } from "../../../enviroments/environment";

import { PreTask, getPreTaskParams } from '../../shared/interfaces/PreTask.interface';

const usePreTask = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PreTask | null>(null);

    const getPreTask = useCallback(async (inputs: getPreTaskParams) => {
        setLoading(true);
        try {
            const response = await axios.get(`${environment.apiUrl}/tasks/${inputs.taskOrder}/pretask/links/${inputs.linkOrder}`, {
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

    return { loading, error, data, getPreTask };
};

export default usePreTask;


