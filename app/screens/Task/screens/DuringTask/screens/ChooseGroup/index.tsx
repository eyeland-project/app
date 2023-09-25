import { View, Text, StyleSheet, FlatList } from 'react-native';
import GroupCard from './components/GroupCard';
import Placeholder from './components/Placeholder';

import { Theme } from '@theme';

import { useEffect, useState, useCallback } from 'react';
import useTheme from '@hooks/useTheme';
import useTaskContext from '@app/core/hooks/Task/useTaskContext';
import useTeams from '@app/core/hooks/Task/DurinTask/useTeams';
import { useDuringTaskContext } from '@app/core/hooks/Task/DurinTask/useDuringTaskContext';
import { useFocusEffect } from '@react-navigation/native';
import useTeam from '@app/core/hooks/Task/DurinTask/useTeam';

import { SocketEvents } from '@enums/SocketEvents.enum';
import { Team } from '@interfaces/Team.interface';

const ChooseGroup = ({ route }: any) => {
	const theme = useTheme();
	const { resetContext } = useTaskContext();
	const { error, loading, data, getTeams } = useTeams();
	const { leaveTeam } = useTeam();
	const { socket } = useDuringTaskContext();
	const [groups, setGroups] = useState<Team[]>([]);
	const { taskOrder } = route.params;
	const styles = getStyles(theme);

	const getGroups = async () => {
		setGroups(await getTeams());
	};

	const init = async () => {
		await leaveTeam();
		await getGroups();
		resetContext();

		socket.on(SocketEvents.TEAMS_STUDENT_UPDATE, (data: Team[]) => {
			setGroups(data);
		});

		return () => {
			socket.off(SocketEvents.TEAMS_STUDENT_UPDATE);
		};
	};

	useFocusEffect(
		useCallback(() => {
			init();
		}, [])
	);

	if (loading)
		return (
			<>
				<Text style={styles.text}>
					Es momento de que escojas tu grupo:
				</Text>
				<Placeholder />
			</>
		);

	return (
		<FlatList
			data={groups.filter(
				(group) =>
					group.taskOrder === taskOrder || group.taskOrder === null
			)}
			renderItem={({ item, index }) => (
				<GroupCard
					key={index}
					id={item.code}
					name={item.name}
					members={item.students}
					taskOrder={taskOrder}
				/>
			)}
			keyExtractor={(item) => item.id.toString()}
			ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
			style={styles.flatlist}
			ListHeaderComponent={() => (
				<Text style={styles.text}>
					Es momento de que escojas tu grupo:
				</Text>
			)}
			ListFooterComponent={() => <View style={{ height: 80 }} />}
		/>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white
		},
		text: {
			color: theme.colors.black,
			backgroundColor: theme.colors.white,
			fontSize: theme.fontSize.xxl,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium,
			paddingHorizontal: 20,
			paddingBottom: 20
		},
		flatlist: {
			backgroundColor: theme.colors.white
		}
	});

export default ChooseGroup;
