import { FlatList, Text } from "react-native";
import React from "react";
import Task from "./components/Task";
import ComingSoon from "./components/ComingSoon";

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
	return (
		<>
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
		</>
	);
};

export default Home;