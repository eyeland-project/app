import { useState, useCallback } from 'react';
import useAuthStorage from '../useAuthStorage';
import axios from 'axios';

import { errorHandler } from '../../utils/errorHandler';
import { environment } from '@environments/environment';

import {
	Introduction,
	getIntroductionParams
} from '@interfaces/Introduction.interface';

const errors: Map<number, string> = new Map([
	[400, 'La task no existe'],
	[401, 'Error de autenticación'],
	[403, 'No está autorizado para acceder a este recurso'],
	[404, 'No se encontró el recurso'],
	[498, 'Su autenticación ha expirado'],
	[500, 'Un error inesperado ocurrido']
]);

const useIntroduction = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<Introduction | null>(null);
	const authStorage = useAuthStorage();

	const getIntroduction = useCallback(
		async (inputs: getIntroductionParams) => {
			setError(null);
			setLoading(true);
			try {
				const response = await axios.get(
					`${environment.apiUrl}/tasks/${inputs.taskOrder}/introduction`,
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
		},
		[]
	);

	return { loading, error, data, getIntroduction };
};

export default useIntroduction;
