import { FlatList, View, StyleSheet } from "react-native";

import Task from "./components/Task";
import ComingSoon from "./components/ComingSoon";
import Title from "./components/Title";
import Placeholder from "./components/Placeholder";

import { useEffect } from 'react';
import useTheme from "@hooks/useTheme";
import useTasks from "@hooks/useTasks";

import { Theme } from "@theme";

const Home = () => {
	const theme = useTheme();
	const { loading, error, data, getTasks } = useTasks();

	useEffect(() => {
		getTasks();
	}, []);


	return (
		<View>
			{
				!loading ? (
					<FlatList
						style={getStyles(theme).container}
						ListHeaderComponent={<Title text="[Inicio]" />}
						stickyHeaderIndices={[0]}
						stickyHeaderHiddenOnScroll={true}
						data={data}
						renderItem={({ item }) => (
							<Task
								id={item.idTask}
								name={item.name}
								order={item.taskOrder}
								description={item.description}
								image={{ uri: item.thumbnailUrl }}
							/>
						)}
						ItemSeparatorComponent={() => <View style={getStyles(theme).separator} />}
						ListFooterComponent={<ComingSoon />}
					/>)
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