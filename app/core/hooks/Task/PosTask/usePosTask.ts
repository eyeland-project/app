import { useState, useCallback } from 'react';
import useAuthStorage from '../../useAuthStorage';
import axios from 'axios';

import { errorHandler } from '../../../utils/errorHandler';
import { environment } from '@environments/environment';

import { PosTask } from '@interfaces/PosTask.interface';
import { PosTaskQuestionType } from '@app/shared/enums/PosTaskQuestion.enum';
import { PosTaskQuestion } from '@app/shared/interfaces/PosTaskQuestion.interface';

import { useNavigation } from '@react-navigation/native';
import { usePosTaskContext } from './usePosTaskContext';
import useTaskContext from '../useTaskContext';
import { Platform } from 'react-native';

const errors: Map<number, string> = new Map([
	[400, 'Recurso no encontrado'],
	[401, 'Error de autenticación'],
	[403, 'No está autorizado para acceder a este recurso'],
	[404, 'Recurso no encontrado'],
	[498, 'Su autenticación ha expirado'],
	[500, 'Un error inesperado ocurrido']
]);

const usePosTask = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<PosTask | null>(null);
	const authStorage = useAuthStorage();
	const navigation = useNavigation<any>();
	const { index, data: dataContext, setIndex } = usePosTaskContext();
	const { taskOrder, setProgress } = useTaskContext();

	const getPosTask = useCallback(async (inputs: { taskOrder: number }) => {
		setError(null);
		setLoading(true);
		try {
			const response = await axios.get(
				`${environment.apiUrl}/tasks/${inputs.taskOrder}/postask/questions`,
				{
					headers: {
						Authorization: `Bearer ${await authStorage.getAccessToken()}`
					},
					timeout: 10000
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
	}, []);

	const sendPosTaskAnswer = useCallback(
		async (inputs: {
			taskOrder: number;
			questionOrder: number;
			body: {
				idOption?: number;
				answerSeconds: number;
				text?: string;
				audioUri?: string;
			}
		}) => {
			setError(null);
			setLoading(true);
			try {
				const formData = new FormData();
				if (inputs.body.audioUri) {
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
				} else {
					formData.append('audio', '');
				}

				formData.append('idOption', inputs.body.idOption?.toString() || '');
				formData.append('answerSeconds', inputs.body.answerSeconds.toString());
				formData.append('text', inputs.body.text || '');

				const response = await axios.post(
					`${environment.apiUrl}/tasks/${inputs.taskOrder}/postask/questions/${inputs.questionOrder}`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${await authStorage.getAccessToken()}`,
						},
					}
				);

				setLoading(false);
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error(response.data);
				}
			} catch (err: any) {
				setError(errorHandler(err, errors));
			}
		}
		, [])

	const nextQuestion = () => {
		setTimeout(() => {
			if (!dataContext) return;

			if (index === dataContext.length) {
				navigation.reset({
					index: 1,
					routes: [{ name: 'Complete', params: { taskOrder } }]
				});
				return null;
			}

			const question: PosTaskQuestion = dataContext[index];
			let name = '';

			switch (question.type) {
				case PosTaskQuestionType.SELECT_AND_SPEAKING:
					name = 'SelectAndSpeaking';
					break;
				case PosTaskQuestionType.OPEN:
					name = 'Open';
					break;
				default:
					console.error('Invalid question type');
					break;
			}

			if (name === '') {
				navigation.reset({
					index: 1,
					routes: [{ name: 'Complete', params: { taskOrder } }]
				});
			} else {
				navigation.reset({
					index: 1,
					routes: [{ name: name, params: { question } }]
				});
			}

			setProgress((index + 1) / dataContext.length);
			setIndex(index + 1);
		}, 250);
	};



	return { loading, error, data, getPosTask, sendPosTaskAnswer, nextQuestion };
};

export default usePosTask;
