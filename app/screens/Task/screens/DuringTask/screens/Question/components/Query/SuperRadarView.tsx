import { View, Text, StyleSheet, Animated, ToastAndroid } from 'react-native';

import React, { useState, useEffect } from 'react';
import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
	text: string;
	prepositionTranslations: string[];
}

const SuperRadarView = ({ text, prepositionTranslations }: Props) => {
	const [prepositions, setPrepositions] = useState<string[]>([]);
	const [question, setQuestion] = useState<string[]>([]);
	const theme = useTheme();
	const [showPower, setShowPower] = useState<boolean[]>(
		prepositionTranslations.map(() => false)
	);
	const [powerOpacity] = useState<Animated.Value[]>(
		prepositionTranslations.map(() => new Animated.Value(0))
	);
	const [animating, setAnimating] = useState<boolean>(false);
	const styles = getStyles(theme);

	const textFiltered = text.replace(/[{}]/g, '');
	const matchResults = textFiltered.match(/\[(.*?)\]/g);

	useEffect(() => {
		setPrepositions(
			matchResults
				? matchResults?.map((match) => match.replace(/[\[\]]/g, ''))
				: []
		);
		setQuestion(
			matchResults ? textFiltered.split(/\[.*?\]/) : [textFiltered]
		);
	}, []);

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
				prepositions[index] ===
					matchResults[index].replace(/[\[\]]/g, '')
			) {
				setPrepositions((prevPrepositions) =>
					prevPrepositions.map((prevPreposition, i) =>
						i === index
							? prepositionTranslations[index]
							: prevPreposition
					)
				);
			} else {
				setPrepositions(
					matchResults
						? matchResults.map((match) =>
								match.replace(/[\[\]]/g, '')
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
				{question.map((word, index) => (
					<React.Fragment key={index}>
						{word}
						{index < prepositions.length && (
							<Text
								style={styles.prepostion}
								onPress={() => handlePress(index)}
							>
								{showPower[index] ? (
									<Animated.View
										style={{ opacity: powerOpacity[index] }}
									>
										<Animated.Image
											source={require('@images/superRadar.png')}
											style={styles.image}
										/>
									</Animated.View>
								) : (
									prepositions[index]
								)}
							</Text>
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
			marginTop: 10,
			flexWrap: 'wrap'
		},
		image: {
			// position: 'absolute',
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
		prepostion: {
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
			width: 'auto',
			bottom: -40,
			borderRadius: theme.borderRadius.medium,
			backgroundColor: theme.colors.gray,
			paddingHorizontal: 10,
			paddingVertical: 5,
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
			left: '50%',
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

export default SuperRadarView;
