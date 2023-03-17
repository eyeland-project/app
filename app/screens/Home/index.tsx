import { FlatList, View, StyleSheet } from "react-native";

import Task from "./components/Task";
import ComingSoon from "./components/ComingSoon";
import Title from "./components/Title";
import Placeholder from "./components/Placeholder";

import { useEffect, useState, useCallback } from 'react';
import useTheme from "@hooks/useTheme";
import useTasks from "@hooks/useTasks";
import { useFocusEffect } from "@react-navigation/native";

import { Theme } from "@theme";
import { Task as TaskInterface } from "@app/shared/interfaces/Task.interface";

const Home = () => {
	const theme = useTheme();
	const { loading, error, data, getTasks } = useTasks();

	const initTasks = async () => {
		await getTasks();
	}

	useFocusEffect(
		useCallback(() => {
			initTasks();
		}, [])
	)

	return (
		<View>
			{
				!loading ?
					(
						<FlatList
							style={getStyles(theme).container}
							ListHeaderComponent={<Title text="MENU" />}
							stickyHeaderIndices={[0]}
							stickyHeaderHiddenOnScroll={true}
							data={data}
							renderItem={({ item, index }) => (
								<>
									{index === 0 && <View style={{ marginVertical: 5 }} />}
									<Task
										id={item.id}
										name={item.name}
										order={item.taskOrder}
										description={item.description}
										image={{ uri: item.thumbnailUrl }}
										blocked={item.blocked || item.comingSoon}
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
			height: "100%",
		},
		separator: {
			height: 20,
		}
	});



export default Home;