import { useState, useCallback } from 'react';
import useAuthStorage from '../../useAuthStorage';
import { useDuringTaskContext } from './useDuringTaskContext';

import axios from 'axios';

import { errorHandler } from '../../../utils/errorHandler';
import { environment } from '@environments/environment';

import { Team } from '@interfaces/Team.interface';
import { Power } from '@enums/Power.enum';

const errors: Map<number, string> = new Map([
	[400, 'Petición inválida'],
	[401, 'Error de autenticación'],
	[403, 'No está autorizado para acceder a este recurso'],
	[404, 'Recurso no encontrado'],
	[409, 'El estudiante ya tiene un equipo'],
	[410, 'El equipo no está activo'],
	[498, 'Su autenticación ha expirado'],
	[500, 'Un error inesperado ocurrido']
]);

const useTeam = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<(Team & { myPower: Power }) | null>(null);
	const authStorage = useAuthStorage();
	const { setTeam, setPower } = useDuringTaskContext();

	const joinTeam = useCallback(
		async (data: { code: string; taskOrder: number }) => {
			setError(null);
			setLoading(true);
			try {
				const response = await axios.post(
					`${environment.apiUrl}/teams`,
					data,
					{
						headers: {
							Authorization: `Bearer ${await authStorage.getAccessToken()}`,
							'Content-Type': 'application/json'
						},
						timeout: 10000
					}
				);

				if (response.status === 200) {
					setLoading(false);
					setData(response.data);
					// TODO - Remove this from here
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

	const leaveTeam = useCallback(async () => {
		setError(null);
		setLoading(true);
		try {
			const response = await axios.put(
				`${environment.apiUrl}/teams`,
				null,
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
				setTeam(null);
				return response.data;
			} else {
				throw new Error(response.data);
			}
		} catch (err: any) {
			setLoading(false);
			setError(errorHandler(err, errors));
		}
	}, []);

	const getMyTeam = async () => {
		setError(null);
		setLoading(true);
		try {
			const response = await axios.get(
				`${environment.apiUrl}/teams/current`,
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
				setTeam(response.data);
				setPower(response.data.myPower);
				return response.data;
			} else {
				throw new Error(response.data);
			}
		} catch (err: any) {
			setLoading(false);
			setError(errorHandler(err, errors));
		}
	};

	return { loading, error, data, joinTeam, leaveTeam, getMyTeam };
};

export default useTeam;
