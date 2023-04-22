import { View, Text, StyleSheet } from 'react-native';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
	groupName?: string;
	position: number | null;
}

const PositionBar = ({ groupName, position }: Props) => {
	const theme = useTheme();
	const styles = getStyles(theme);

	if (!groupName || !position) return null;

	return (
		<View
			style={styles.container}
			accessible={true}
			accessibilityLabel={`Grupo: ${groupName}, posición ${position}`}
			accessibilityRole="text"
		>
			<Text style={styles.groupNameText}>{groupName}</Text>
			<View style={styles.positionContainer}>
				<Text style={styles.positionText}>Posición {position}°</Text>
			</View>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.yellow,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			borderRadius: theme.borderRadius.full,
			marginBottom: 20,
			marginHorizontal: 20,
			borderColor: theme.colors.black,
			borderWidth: 1
		},
		groupNameText: {
			fontSize: theme.fontSize.xl,
			fontFamily: theme.fontWeight.bold,
			letterSpacing: theme.spacing.medium,
			marginLeft: 20,
			marginTop: 10,
			marginBottom: 5
		},
		positionContainer: {
			backgroundColor: theme.colors.green,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: theme.borderRadius.full,
			borderColor: theme.colors.black,
			borderWidth: 1,
			height: '100%',
			width: '50%'
		},
		positionText: {
			fontSize: theme.fontSize.large,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium,
			marginBottom: -5
		}
	});

export default PositionBar;
