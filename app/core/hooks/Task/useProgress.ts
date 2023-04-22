import { useState, useCallback } from 'react';
import useAuthStorage from '../useAuthStorage';
import axios from 'axios';

import { errorHandler } from '../../utils/errorHandler';
import { environment } from '@environments/environment';

import { Progress, getProgressParams } from '@interfaces/Progress.interface';

const errors: Map<number, string> = new Map([
	[400, 'Recurso no encontrado'],
	[401, 'Error de autenticación'],
	[403, 'No está autorizado para acceder a este recurso'],
	[404, 'Recurso no encontrado'],
	[498, 'Su autenticación ha expirado'],
	[500, 'Un error inesperado ocurrido']
]);

const useProgress = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<Progress | null>(null);
	const authStorage = useAuthStorage();

	const getProgress = useCallback(async (inputs: getProgressParams) => {
		setError(null);
		setLoading(true);
		try {
			const response = await axios.get(
				`${environment.apiUrl}/tasks/${inputs.taskOrder}/progress`,
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
		} catch (err) {
			setLoading(false);
			setError(errorHandler(err, errors));
		}
	}, []);

	return { loading, error, data, getProgress };
};

export default useProgress;
