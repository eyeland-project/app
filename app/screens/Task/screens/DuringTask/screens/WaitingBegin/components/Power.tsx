import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Power as PowerEnum } from '@enums/Power.enum';
import Pressable from '@components/Pressable';
import { Ionicons } from '@expo/vector-icons';

import useTheme from '@hooks/useTheme';
import useMediaQuery from '@hooks/useMediaQuery';
import React, { useState, useEffect } from 'react';

import { Theme } from '@theme';

interface Props {
	power: PowerEnum;
	blockReRoll: boolean;
	onReRoll: () => void;
	loading: boolean;
}

const Power = ({ power, blockReRoll, onReRoll, loading }: Props) => {
	const theme = useTheme();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState<any>(null);
	const { isPhone } = useMediaQuery();
	const styles = getStyles(theme, isPhone);

	useEffect(() => {
		switch (power) {
			case PowerEnum.MEMORY_PRO:
				setTitle('Memory Pro');
				setDescription(
					'Puede recordar la traducción de los sustantivos.'
				);
				setImage(require('@images/memoryPro.png'));
				break;
			case PowerEnum.SUPER_HEARING:
				setTitle('Super hearing');
				setDescription('Puede recordar lo que el guía dijo.');
				setImage(require('@images/superHearing.png'));
				break;
			case PowerEnum.SUPER_RADAR:
				setTitle('Super radar');
				setDescription(
					'Puede recordar la traducción de las preposiciones.'
				);
				setImage(require('@images/superRadar.png'));
				break;
		}
	}, [power]);

	return (
		<View
			style={styles.container}
			accessible
			accessibilityLabel={`Tu superpoder es ${title}. ${description}.`}
		>
			<View style={styles.imageContainer}>
				<Image
					source={image}
					style={styles.image}
					accessible
					accessibilityLabel={`Imagen del superpoder ${title}`}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
			{!blockReRoll && (
				<Pressable
					onPress={onReRoll}
					accessibilityLabel="Recargar superpoder"
				>
					<View style={styles.iconContainer}>
						{loading ? (
							<ActivityIndicator color={theme.colors.white} />
						) : (
							<Ionicons
								name={'reload'}
								size={26}
								color={theme.colors.white}
							/>
						)}
					</View>
				</Pressable>
			)}
		</View>
	);
};

const getStyles = (theme: Theme, isPhone: boolean) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			marginHorizontal: 20,
			alignItems: 'center',
			alignSelf: 'flex-start'
			// justifyContent: 'space-between',
		},
		iconContainer: {
			backgroundColor: theme.colors.darkGreen,
			width: 45,
			height: 45,
			borderRadius: theme.borderRadius.full,
			justifyContent: 'center',
			alignItems: 'center',
			marginStart: !isPhone ? 10 : 0,
			...theme.shadow
		},
		title: {
			color: theme.colors.black,
			fontSize: theme.fontSize.small,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium
		},
		description: {
			color: theme.colors.black,
			fontSize: theme.fontSize.small,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium
		},
		textContainer: {
			flex: 1,
			marginHorizontal: 10
		},
		imageContainer: {
			width: 70,
			height: 70,
			borderRadius: theme.borderRadius.medium,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.colors.yellow,
			marginBottom: 5,
			...theme.shadow
		},
		image: {
			width: 50,
			height: 50
		}
	});

export default Power;
