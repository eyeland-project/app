import { View, Text, StyleSheet } from 'react-native';
import Pressable from '@components/Pressable';
import Icon from './Icon';

import { useState } from 'react';
import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';
import { PowerStatus } from '@enums/PowerStatus.enum';

interface Props {
	title: string;
	image: any;
	status: PowerStatus;
	description: string;
	people?: string[];
}

// Working for just one person
const Power = ({ title, status, image, description, people }: Props) => {
	const theme = useTheme();
	const [peopleList, setPeopleList] = useState(
		people ? people : ([] as string[])
	);
	const styles = getStyles(theme);

	const handleOnPress = () => {
		if (peopleList.find((person) => person === 'Tú')) {
			setPeopleList(peopleList.filter((person) => person !== 'Tú'));
		} else {
			if (peopleList.length > 0) {
				setPeopleList([...peopleList, 'Tú']);
			} else {
				setPeopleList(['Tú']);
			}
		}
	};

	return (
		<Pressable style={styles.container} onPress={handleOnPress}>
			<Icon image={image} status={status} />
			<View style={styles.textContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
				{peopleList.length > 0 ? (
					<View style={styles.selectionBlur}>
						{peopleList.map((person, index) => (
							<Text style={styles.people} key={index}>
								{person}
							</Text>
						))}
					</View>
				) : null}
			</View>
		</Pressable>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.primary,
			flexDirection: 'row',
			marginHorizontal: 20,
			marginBottom: 20,
			position: 'relative',
			justifyContent: 'center'
		},
		textContainer: {
			paddingLeft: 20,
			width: '60%',
			justifyContent: 'center'
		},
		title: {
			color: theme.colors.black,
			fontSize: theme.fontSize.xl,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium,
			textAlign: 'left',
			marginBottom: -5
		},
		selectionBlur: {
			position: 'absolute',
			height: 100,
			width: '100%',
			backgroundColor: theme.colors.white,
			opacity: 0.8,
			justifyContent: 'center',
			alignItems: 'center',
			paddingHorizontal: 20,
			borderWidth: 2,
			borderRadius: theme.borderRadius.medium,
			marginLeft: 15
		},
		description: {
			color: theme.colors.black,
			fontSize: theme.fontSize.medium,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium
		},
		people: {
			color: theme.colors.black,
			fontSize: theme.fontSize.small,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium,
			textAlign: 'left',
			marginBottom: -5
		}
	});

export default Power;
