import { FlatList, View, StyleSheet } from "react-native";

import Task from "./components/Task";
import ComingSoon from "./components/ComingSoon";
import Title from "./components/Title";

import useTheme from "../../core/hooks/useTheme";
import { Theme } from "../../theme";

const TASKS = [
	{
		id: "1",
		name: "Direcciones",
		orden: 1,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl sit amet nisl. Donec auctor.",
	},
];

const Home = () => {
	const theme = useTheme();

	return (
		<View style={getStyles(theme).container}>
			<Title text="[Inicio]" />
			<FlatList
				data={TASKS}
				renderItem={({ item }) => (
					<Task
						name={item.name}
						orden={item.orden}
						description={item.description}
					/>
				)}
			/>
			<ComingSoon />
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.primary,
			paddingHorizontal: 10,
		},
	});



export default Home;