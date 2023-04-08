import { FlatList, View, StyleSheet } from "react-native";
import Task from "./components/Task";
import ComingSoon from "./components/ComingSoon";
import Title from "./components/Title";
import Placeholder from "./components/Placeholder";
import ErrorScreen from "@components/ErrorScreen";

import { useCallback } from "react";
import useTheme from "@hooks/useTheme";
import useTasks from "@hooks/useTasks";
import { useFocusEffect } from "@react-navigation/native";

import { Theme } from "@theme";
import { Fragment, useRef } from "react";

const Home = () => {
	const theme = useTheme();
	const { loading, error, data, getTasks } = useTasks();
	const firstFocus = useRef(null);

	const initTasks = async () => {
		await getTasks();
	};

	useFocusEffect(
		useCallback(() => {
			initTasks();
		}, [])
	);

	if (loading) return <Placeholder />;

	if (error) return <><Title text="MENÚ" /><ErrorScreen error={error} retryAction={initTasks} /></>;

	if (!data) return <><Title text="MENÚ" /><ErrorScreen error={'No se recibió información'} retryAction={initTasks} /></>;

	return (
		<FlatList
			style={getStyles(theme).container}
			ListHeaderComponent={<Title text="MENÚ" />}
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
						completed={item.completed}
						blocked={item.blocked || item.comingSoon}
					/>
				</>
			)}
			ItemSeparatorComponent={() => <View style={getStyles(theme).separator} />}
			ListFooterComponent={<ComingSoon />}
		/>
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
