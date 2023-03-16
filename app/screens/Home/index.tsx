import { FlatList, View, StyleSheet } from "react-native";

import Task from "./components/Task";
import ComingSoon from "./components/ComingSoon";
import Title from "./components/Title";
import Placeholder from "./components/Placeholder";

import { useEffect, useState } from 'react';
import useTheme from "@hooks/useTheme";
import useTasks from "@hooks/useTasks";

import { Theme } from "@theme";
import { Task as TaskInterface } from "@app/shared/interfaces/Task.interface";
import { TabRouter } from "@react-navigation/native";

const Home = () => {
	const theme = useTheme();
	const { loading, error, data, getTasks } = useTasks();
	const [tasks, setTasks] = useState<(TaskInterface & { blocked: boolean })[]>([]);

	const initTasks = async () => {
		await getTasks();
	}

	const assignBlocked = (tasks: TaskInterface[]) => {
		let isBlocked = false;
		const tasksTemp = tasks.map((task: TaskInterface) => {
			const blockedTask = {
				...task,
				blocked: isBlocked,
			};

			if (!task.completed) {
				isBlocked = true;
			}

			return blockedTask;
		});

		setTasks(tasksTemp);
	};

	useEffect(() => {
		if (data) assignBlocked(data);
	}, [data]);


	useEffect(() => {
		initTasks();
	}, []);


	return (
		<View>
			{
				!loading ?
					(
						<FlatList
							style={getStyles(theme).container}
							ListHeaderComponent={<Title text="[Inicio]" />}
							stickyHeaderIndices={[0]}
							stickyHeaderHiddenOnScroll={true}
							// TODO - Remove the slice
							data={tasks.slice(0, 2)}
							renderItem={({ item, index }) => (
								<>
									{index === 0 && <View style={{ marginVertical: 5 }} />}
									<Task
										id={item.idTask}
										name={item.name}
										order={item.taskOrder}
										description={item.description}
										image={{ uri: item.thumbnailUrl }}
										blocked={item.blocked}
									/>
								</>
							)}
							ItemSeparatorComponent={() => <View style={getStyles(theme).separator} />}
							ListFooterComponent={<ComingSoon />}
						/>
					)
					: (<Placeholder />)
			}
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.primary,
		},
		separator: {
			height: 20,
		}
	});



export default Home;