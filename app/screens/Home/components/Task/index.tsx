import {
	View,
	StyleSheet,
	Pressable,
	ImageBackground,
	Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Title from "./Title";
import Description from "./Description";
import Button from "./Button";

import useTheme from "../../../../core/hooks/useTheme";
import { Theme } from "../../../../theme";

interface TaskProps {
	orden: number;
	description: string;
	name: string;
}

const Task = ({ orden, name, description }: TaskProps) => {
	const [showDescription, setShowDescription] = useState(false);
	const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
	const animationHeight = useRef(new Animated.Value(70)).current;

	useEffect(() => {
		Animated.timing(animationHeight, {
			toValue: showDescription ? 230 : 70,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [showDescription]);

	const navigation = useNavigation<any>();
	const theme = useTheme();

	return (
		<AnimatedPressable
			style={[getStyles(theme).card, { height: animationHeight }]}
			onPress={() => setShowDescription(!showDescription)}
		>
			<ImageBackground
				source={{
					uri: "https://images.unsplash.com/photo-1601296200639-89349ce76a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
				}}
				style={getStyles(theme).image}
			>
				<LinearGradient
					colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.4)"]}
					style={getStyles(theme).gradient}
					start={[1, 1]}
					end={[0, 1]}
				/>
				<View style={getStyles(theme).container}>
					<Title name={orden + ". " + name} />
					{showDescription ? (
						<>
							<Description text={description} />
							<Button
								text="Comenzar"
								onPress={() => navigation.navigate("Introduction")}
							/>
						</>
					) : null}
				</View>
			</ImageBackground>
		</AnimatedPressable>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		card: {
			backgroundColor: theme.colors.white,
			marginVertical: 10,
			marginHorizontal: 10,
			borderRadius: theme.borderRadius.medium,
			position: "relative",
			...theme.shadow,
		},
		container: {
			paddingHorizontal: 20,
			paddingVertical: 15,
		},
		image: {
			width: "100%",
			height: "100%",
			borderRadius: theme.borderRadius.medium,
			overflow: "hidden",
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