import {
	View,
	StyleSheet,
	ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Title from "./Title";
import Description from "./Description";
import Button from "./Button";

import useTheme from "@hooks/useTheme";
import { Theme } from "@theme";

interface TaskProps {
	id: number;
	order: number;
	description: string;
	name: string;
	image?: any;
}

const Task = ({ id, order, name, description, image }: TaskProps) => {
	const theme = useTheme();
	const navigation = useNavigation<any>();
	return (
		<View style={getStyles(theme).card}>
			<ImageBackground
				source={image}
			>
				<LinearGradient
					colors={[
						theme.colors.white === "#fff" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)",
						theme.colors.white === "#fff" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",]}
					style={getStyles(theme).gradient}
					start={[1, 1]}
					end={[0, 1]}
				/>
				<View style={getStyles(theme).container}>
					<Title name={order + ". " + name} />
					<Description text={description} />
					<Button
						text="Comenzar"
						onPress={() => navigation.navigate("Task", { taskOrder: order })}
					/>
				</View>
			</ImageBackground>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		card: {
			backgroundColor: theme.colors.white,
			borderRadius: theme.borderRadius.medium,
			overflow: "hidden",
			marginHorizontal: 20,
			...theme.shadow,
		},
		container: {
			paddingHorizontal: 20,
			paddingVertical: 15,
		},
		gradient: {
			position: "absolute",
			left: 0,
			right: 0,
			top: 0,
			height: "100%",
			width: "100%",
		}
	});

export default Task;