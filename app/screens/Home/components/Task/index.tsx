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

import { hexToRgbA } from "@utils/hexToRgba";

interface TaskProps {
	id: number;
	order: number;
	description: string;
	name: string;
	image?: any;
	blocked: boolean;
	completed: boolean;
}

const Task = ({ id, order, name, description, image, blocked, completed }: TaskProps) => {
	const theme = useTheme();
	const navigation = useNavigation<any>();
	return (
		<View
			style={[getStyles(theme).card, completed && getStyles(theme).cardCompleted]}
			accessible={true}
			accessibilityLabel={`${order}. ${name}. ${description}. ${blocked ? "Bloqueado" : "Disponible"}`}
			accessibilityHint={`${blocked ? "Esta tarea está bloqueada." : "Presione el boton de comenzar para iniciar la tarea."}`}
		>
			<ImageBackground
				source={image}
				accessible={false}
				resizeMode="cover"
			>
				<LinearGradient
					colors={[
						theme.colors.white === "#fff" ? hexToRgbA(theme.colors.bluerGreen, 0.9) : "rgba(0,0,0,0.9)",
						theme.colors.white === "#fff" ? hexToRgbA(theme.colors.darkGray, 0.4) : "rgba(0,0,0,0.4)",]}
					style={getStyles(theme).gradient}
					start={[1, 1]}
					end={[0, 1]}
					accessible={false}
				/>
				<View style={getStyles(theme).container}>
					<Title name={order + ". " + name} />
					<Description text={description} />
					<Button
						text="Comenzar"
						icon={completed ? 'reload1' : 'arrowright'}
						style={completed && { backgroundColor: theme.colors.blue }}
						onPress={() => navigation.navigate("Task", { taskOrder: order })}
						disabled={blocked}
						accessible={false}
					/>
				</View>
			</ImageBackground>
			{
				blocked && <View style={getStyles(theme).blockedOverlay} accessible={false} />
			}
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
			position: "relative",
			...theme.shadow,
		},
		cardCompleted: {
			borderColor: theme.colors.blue,
			borderWidth: 2,
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
		},
		blockedOverlay: {
			height: "100%",
			width: "100%",
			backgroundColor: theme.colors.gray,
			opacity: 0.8,
			position: "absolute",
		}
	});

export default Task;
