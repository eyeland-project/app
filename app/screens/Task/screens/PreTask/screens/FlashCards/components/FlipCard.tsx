import React, { Dispatch, SetStateAction, useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Animated,
	Pressable
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import FlipCardNative from 'react-native-flip-card';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';
import { PreTaskQuestion } from '@interfaces/PreTaskQuestion.interface';

interface Props {
	question: PreTaskQuestion;
	optionIndex: number;
	optionsQuestionShuffled: {
		content: string;
		correct: boolean;
		id: number;
	}[];
	containerCardStyle: {};
	isFlipped: boolean;
	containerStyle: {};
	setIsFlipped: Dispatch<SetStateAction<boolean>>;
}

const FlipCard = ({
	question,
	optionIndex,
	optionsQuestionShuffled,
	containerCardStyle,
	isFlipped,
	containerStyle,
	setIsFlipped
}: Props) => {
	const theme = useTheme();
	const styles = getStyles(theme);
	const flipIndicatorAnimation = useRef(new Animated.Value(0)).current;

	return (
		<Pressable
			onPress={() => {
				setIsFlipped(!isFlipped);
			}}
			accessibilityLabel="Presiona dos veces para girar la tarjeta"
			accessibilityRole="button"
		>
			<Animated.View
				style={[styles.imageContainer, containerStyle]}
				accessible={true}
				accessibilityLabel="Voltear tarjeta"
				accessibilityRole="button"
			>
				<FlipCardNative
					friction={10}
					flipVertical={true}
					perspective={1000}
					style={styles.flipCard}
					flip={isFlipped}
					clickable={false}
					useNativeDriver={true}
				>
					{/* Face Side */}
					{!question.imgUrl ? (
						<View
							style={styles.back}
							accessible={true}
							accessibilityLabel="Parte trasera de la tarjeta"
						>
							<Text style={styles.backText}>
								{question.content}
							</Text>
							<Animated.View
								style={[
									styles.flipIndicator,
									{
										transform: [
											{
												translateY:
													flipIndicatorAnimation.interpolate(
														{
															inputRange: [0, 1],
															outputRange: [0, -5]
														}
													)
											}
										]
									}
								]}
								accessible={true}
								accessibilityLabel="Indicador de voltear"
							>
								<Entypo
									name="arrow-with-circle-up"
									size={24}
									color="black"
								/>
							</Animated.View>
						</View>
					) : (
						<ImageBackground
							style={styles.image}
							source={{ uri: question.imgUrl }}
							resizeMode="cover"
							accessible={true}
							accessibilityLabel={
								question.imgAlt +
								'. Toca dos veces para girar la tarjeta'
							}
						>
							<Animated.View
								style={[
									styles.flipIndicator,
									{
										transform: [
											{
												translateY:
													flipIndicatorAnimation.interpolate(
														{
															inputRange: [0, 1],
															outputRange: [0, -5]
														}
													)
											}
										]
									}
								]}
								accessible={true}
								accessibilityLabel="Indicador de voltear"
							>
								<Entypo
									name="arrow-with-circle-up"
									size={24}
									color="white"
								/>
							</Animated.View>
						</ImageBackground>
					)}
					{/* Back Side */}
					<View
						style={[styles.back, containerCardStyle]}
						accessible={true}
						accessibilityLabel={
							optionsQuestionShuffled[optionIndex].content +
							'. Toca dos veces para girar la tarjeta'
						}
					>
						<Text style={styles.backText}>
							{optionsQuestionShuffled[optionIndex].content}
						</Text>
					</View>
				</FlipCardNative>
			</Animated.View>
		</Pressable>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		imageContainer: {
			marginHorizontal: 20,
			height: 300,
			maxWidth: 500,
			width: '90%',
			alignSelf: 'center',
			borderRadius: theme.borderRadius.medium,
			overflow: 'hidden',
			...theme.shadow
		},
		flipCard: {
			width: '100%',
			height: '100%',
			borderRadius: theme.borderRadius.medium
		},
		image: {
			width: '100%',
			height: '100%'
		},
		back: {
			backgroundColor: theme.colors.primary,
			width: '100%',
			height: '100%',
			justifyContent: 'center',
			alignItems: 'center'
		},
		backText: {
			fontSize: theme.fontSize.xl,
			fontFamily: theme.fontWeight.bold,
			color: theme.colors.black,
			letterSpacing: theme.spacing.medium
		},
		flipIndicator: {
			position: 'absolute',
			bottom: 10,
			right: 10,
			transform: [{ rotate: '45deg' }]
		}
	});

export default FlipCard;
