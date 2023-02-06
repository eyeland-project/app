import { FlatList, View, StyleSheet } from "react-native";

import Task from "./components/Task";
import ComingSoon from "./components/ComingSoon";
import Title from "./components/Title";

import useTheme from "../../core/hooks/useTheme";
import { Theme } from "../../theme";

// MOCK DATA
import { TASKS } from "../../shared/mocks/TASKS";

const Home = () => {
	const theme = useTheme();

	return (
		<View>
			<FlatList
				style={getStyles(theme).container}
				ListHeaderComponent={<Title text="[Inicio]" />}
				stickyHeaderIndices={[0]}
				stickyHeaderHiddenOnScroll={true}
				data={TASKS}
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
			/>
			{/* <ComingSoon /> */}
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
		},
	});



export default Home;