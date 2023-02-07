import { FlatList, View, StyleSheet } from "react-native";

import Task from "./components/Task";
import ComingSoon from "./components/ComingSoon";
import Title from "./components/Title";
import Placeholder from "./components/Placeholder";

import useTheme from "../../core/hooks/useTheme";
import useTasks from "../../core/hooks/useTasks";

import { Theme } from "../../theme";

// MOCK DATA
import { TASKS } from "../../shared/mocks/TASKS";

const Home = () => {
	const theme = useTheme();
	const { loading, error, data, getTasks } = useTasks();

	return (
		<View>
			{
				true ? ( // MOCK DATA
					<FlatList
						style={getStyles(theme).container}
						ListHeaderComponent={<Title text="[Inicio]" />}
						stickyHeaderIndices={[0]}
						stickyHeaderHiddenOnScroll={true}
						data={TASKS} // MOCK DATA
						renderItem={({ item }) => (
							<Task
								id={item.idTask}
								name={item.name}
								orden={item.taskOrder}
								description={item.description}
								image={{ uri: item.thumbnail }}
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