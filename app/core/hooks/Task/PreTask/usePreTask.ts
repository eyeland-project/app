import { useState, useCallback } from 'react';
import useAuthStorage from '../../useAuthStorage';
import axios from 'axios';

import { environment } from '@environments/environment';
import { errorHandler } from '../../../utils/errorHandler';

import { PreTask } from '@interfaces/PreTask.interface';
import { PreTaskTypeQuestion } from '@enums/PreTaskTypeQuestion.enum';
import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface';

import { useNavigation } from '@react-navigation/native';
import usePreTaskContext from './usePreTaskContext';
import useTaskContext from '../useTaskContext';

const errors: Map<number, string> = new Map([
	[400, 'Recurso no encontrado'],
	[401, 'Error de autenticación'],
	[403, 'No está autorizado para acceder a este recurso'],
	[404, 'Recurso no encontrado'],
	[498, 'Su autenticación ha expirado'],
	[500, 'Un error inesperado ocurrido']
]);

const usePreTask = () => {
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
			const response = await axios.get(
				`${environment.apiUrl}/tasks/${inputs.taskOrder}/pretask/questions`,
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
		} catch (err) {
			setLoading(false);
			setError(errorHandler(err, errors));
		}
	}, []);

	const setPreTaskComplete = useCallback(
		async (inputs: { taskOrder: number }) => {
			setError(null);
			setLoading(true);
			try {
				const response = await axios.post(
					`${environment.apiUrl}/tasks/${inputs.taskOrder}/pretask/complete`,
					{},
					{
						headers: {
							Authorization: `Bearer ${await authStorage.getAccessToken()}`
						},
						timeout: 10000
					}
				);

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
		},
		[]
	);

	const nextQuestion = () => {
		setTimeout(() => {
			if (!dataContext) return null;

			if (index === dataContext.length) {
				navigation.reset({
					index: 1,
					routes: [{ name: 'Complete', params: { taskOrder } }]
				});
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
				case PreTaskTypeQuestion.AUDIO_MULTIPLE_CHOICE:
					name = 'AudioMultipleChoice';
					break;
				case PreTaskTypeQuestion.AUDIO_ORDER:
					name = 'AudioOrder';
					break;
				case PreTaskTypeQuestion.AUDIO_SPEAKING:
					name = 'AudioSpeaking';
					break;
				case PreTaskTypeQuestion.ORDER_A_WORD:
					name = 'OrderAWord';
					break;
				case PreTaskTypeQuestion.ORDER_A_WORD_AUDIO:
					name = 'AudioOrderAWord';
					break;
				default:
					console.error('No question type found');
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

	return {
		loading,
		error,
		data,
		getPreTask,
		setPreTaskComplete,
		nextQuestion
	};
};

export default usePreTask;
