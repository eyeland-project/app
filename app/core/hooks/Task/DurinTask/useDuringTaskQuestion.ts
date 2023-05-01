import { useState, useCallback } from 'react';
import useAuthStorage from '../../useAuthStorage';
import axios from 'axios';

import { errorHandler } from '../../../utils/errorHandler';
import { environment } from '@environments/environment';

import { DuringTaskQuestion } from '@interfaces/DuringTaskQuestion.interface';

const errors: Map<number, string> = new Map([
	[400, 'Recurso no encontrado'],
	[401, 'Error de autenticación'],
	[403, 'No está autorizado para acceder a este recurso'],
	[404, 'Recurso no encontrado'],
	[498, 'Su autenticación ha expirado'],
	[500, 'Un error inesperado ocurrido']
]);

const useDuringTaskQuestion = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<DuringTaskQuestion | null>(null);
	const authStorage = useAuthStorage();

	const getDuringTaskQuestion = useCallback(
		async (inputs: { taskOrder: number }) => {
			setError(null);
			setLoading(true);
			try {
				const response = await axios.get(
					`${environment.apiUrl}/tasks/${inputs.taskOrder}/duringtask/questions/next`,
					{
						headers: {
							Authorization: `Bearer ${await authStorage.getAccessToken()}`
						}
					}
				);

				if (response.status === 200) {
					setLoading(false);
					setData(response.data);
					return response.data;
				} else {
					throw new Error(response.data);
				}
			} catch (err: any) {
				setLoading(false);
				setError(errorHandler(err, errors));
			}
		},
		[]
	);

	const sendDuringTaskAnswer = useCallback(
		async (inputs: {
			taskOrder: number;
			questionOrder: number;
			body: { idOption: number; answerSeconds: number };
		}) => {
			setError(null);
			try {
				const response = await axios.post(
					`${environment.apiUrl}/tasks/${inputs.taskOrder}/duringtask/questions/${inputs.questionOrder}`,
					inputs.body,
					{
						headers: {
							Authorization: `Bearer ${await authStorage.getAccessToken()}`
						}
					}
				);

				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error(response.data);
				}
			} catch (err: any) {
				setError(errorHandler(err, errors));
			}
		},
		[]
	);

	return {
		loading,
		error,
		data,
		getDuringTaskQuestion,
		sendDuringTaskAnswer
	};
};

export default useDuringTaskQuestion;
