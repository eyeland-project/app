import { useState, useCallback } from 'react';
import useAuthStorage from '../../useAuthStorage';
import axios from 'axios';
import { Platform } from 'react-native';

import { errorHandler } from '../../../utils/errorHandler';
import { environment } from '@environments/environment';

import { PosTaskQuestion } from '@interfaces/PosTaskQuestion.interface';

const errors: Map<number, string> = new Map([
	[400, 'Recurso no encontrado'],
	[401, 'Error de autenticación'],
	[403, 'No está autorizado para acceder a este recurso'],
	[404, 'Recurso no encontrado'],
	[498, 'Su autenticación ha expirado'],
	[500, 'Un error inesperado ocurrido']
]);

const usePosTaskQuestion = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<PosTaskQuestion | null>(null);
	const authStorage = useAuthStorage();

	const getPosTaskQuestion = useCallback(
		async (inputs: { taskOrder: number; questionOrder: number }) => {
			setError(null);
			setLoading(true);
			try {
				const response = await axios.get(
					`${environment.apiUrl}/tasks/${inputs.taskOrder}/postask/questions/${inputs.questionOrder}`,
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

	const sendPosTaskAnswer = useCallback(
		async (inputs: {
			taskOrder: number;
			questionOrder: number;
			body: { idOption: number; answerSeconds: number; audioUri: string };
		}) => {
			setError(null);
			try {
				const formData = new FormData();
				if (Platform.OS === 'web') {
					const response = await fetch(inputs.body.audioUri);
					const audioBlob = await response.blob();
					formData.append('audio', audioBlob, 'audio.m4a');
				} else {
					formData.append('audio', {
						uri: inputs.body.audioUri,
						type: 'audio/m4a',
						name: 'audio.m4a'
					} as any);
				}

				formData.append('idOption', inputs.body.idOption.toString());
				formData.append(
					'answerSeconds',
					inputs.body.answerSeconds.toString()
				);

				const response = await axios.post(
					`${environment.apiUrl}/tasks/${inputs.taskOrder}/postask/questions/${inputs.questionOrder}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
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

	return { loading, error, data, getPosTaskQuestion, sendPosTaskAnswer };
};

export default usePosTaskQuestion;
