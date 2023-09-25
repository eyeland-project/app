import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ToastAndroid } from 'react-native';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

import { hexToRgbA } from '@utils/hexToRgba';

interface Props {
	text: string;
	nounTranslations: string[];
}

const MemoryProView = ({ text, nounTranslations }: Props) => {
	const [nouns, setNouns] = useState<string[]>([]);
	const [question, setQuestion] = useState<string[]>([]);
	const theme = useTheme();
	const [showPower, setShowPower] = useState<boolean[]>(
		nounTranslations.map(() => false)
	);
	const [powerOpacity] = useState<Animated.Value[]>(
		nounTranslations.map(() => new Animated.Value(0))
	);
	const [animating, setAnimating] = useState<boolean>(false);
	const styles = getStyles(theme);
	const [nounColors] = useState<Animated.Value[]>(
		nounTranslations.map(() => new Animated.Value(0))
	);

	const textFiltered = text.replace(/[\[\]]/g, '');
	const matchResults = textFiltered.match(/{(.*?)}/g);

	const getInterpolatedColor = (index: number) => {
		return nounColors[index].interpolate({
			inputRange: [0, 1],
			outputRange: [
				hexToRgbA(theme.colors.black, 1),
				hexToRgbA(theme.colors.black, 0.5)
			]
		});
	};

	const animateColors = () => {
		nounColors.forEach((nounColor, index) => {
			if (!showPower[index] && nouns[index] !== nounTranslations[index]) {
				Animated.loop(
					Animated.sequence([
						Animated.timing(nounColor, {
							toValue: 1,
							duration: 1000,
							useNativeDriver: false
						}),
						Animated.timing(nounColor, {
							toValue: 0,
							duration: 1000,
							useNativeDriver: false
						})
					])
				).start();
			}
		});
	};

	useEffect(() => {
		setNouns(
			matchResults
				? matchResults.map((match) => match.replace(/[{}]/g, ''))
				: []
		);
		setQuestion(
			matchResults ? textFiltered.split(/{.*?}/) : [textFiltered]
		);
	}, []);

	useEffect(() => {
		animateColors();
	}, [nouns]);

	const usePower = (index: number) => {
		if (animating) return;
		setAnimating(true);
		setShowPower({
			...showPower,
			[index]: true
		});
		Animated.sequence([
			Animated.timing(powerOpacity[index], {
				toValue: 1,
				duration: 250,
				useNativeDriver: true
			}),
			Animated.timing(powerOpacity[index], {
				toValue: 0,
				duration: 250,
				delay: 250,
				useNativeDriver: true
			})
		]).start(() => {
			setShowPower({
				...showPower,
				[index]: false
			});
			if (
				matchResults &&
				nouns[index] === matchResults[index].replace(/[{}]/g, '')
			) {
				setNouns((prevNouns) =>
					prevNouns.map((prevNoun, i) =>
						i === index ? nounTranslations[index] : prevNoun
					)
				);
			} else {
				setNouns(
					matchResults
						? matchResults.map((match) =>
								match.replace(/[{}]/g, '')
						  )
						: []
				);
			}
			setAnimating(false);
		});
	};

	const handlePress = (index: number) => {
		if (animating) {
			ToastAndroid.show(
				'Por favor espera un momento para volver a usar tu poder...',
				ToastAndroid.SHORT
			);
		}
		usePower(index);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{question.map((part, index) => (
					<React.Fragment key={index}>
						{part}
						{index < nouns.length && (
							<Animated.Text
								style={[
									styles.noun,
									{
										color:
											!showPower[index] &&
											nouns[index] !==
												nounTranslations[index]
												? getInterpolatedColor(index)
												: theme.colors.black
									}
								]}
								onPress={() => handlePress(index)}
							>
								{showPower[index] ? (
									<Animated.View
										style={{ opacity: powerOpacity[index] }}
									>
										<Animated.Image
											source={require('@images/memoryPro.png')}
											style={styles.image}
										/>
									</Animated.View>
								) : (
									nouns[index]
								)}
							</Animated.Text>
						)}
					</React.Fragment>
				))}
			</Text>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			marginHorizontal: 20,
			flexDirection: 'row',
			// marginTop: 10,
			flexWrap: 'wrap'
		},
		image: {
			width: 30,
			height: 30,
			marginBottom: -7
		},
		text: {
			fontSize: theme.fontSize.xxl,
			color: theme.colors.black,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium
		},
		noun: {
			position: 'relative',
			fontSize: theme.fontSize.xxl,
			color: theme.colors.black,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium
		},
		nounContainer: {
			position: 'relative'
		},
		dialog: {
			position: 'absolute',
			bottom: -40,
			borderRadius: theme.borderRadius.medium,
			backgroundColor: theme.colors.gray,
			paddingHorizontal: 10,
			paddingVertical: 5,
			textAlign: 'center',
			justifyContent: 'center',
			alignItems: 'center',
			...theme.shadow,
			elevation: 15
		},
		dialogtext: {
			fontSize: theme.fontSize.medium,
			color: theme.colors.black,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium
		},
		triangle: {
			position: 'absolute',
			top: -10,
			left: 30,
			borderLeftWidth: 10,
			borderRightWidth: 10,
			borderBottomWidth: 10,
			borderStyle: 'solid',
			backgroundColor: 'transparent',
			borderLeftColor: 'transparent',
			borderRightColor: 'transparent',
			borderBottomColor: theme.colors.gray
		}
	});

export default MemoryProView;
