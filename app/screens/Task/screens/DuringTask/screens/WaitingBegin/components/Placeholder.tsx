import { View, StyleSheet } from 'react-native';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

const Placeholder = () => {
	const theme = useTheme();
	const styles = getStyles(theme);

	return (
		<View style={styles.superContainer}>
			<View style={styles.container}>
				<View>
					<View style={styles.placeholderCircle} />
					<View style={styles.placeholderLineSmall} />
					<View style={styles.placeholderLine60} />
					<View style={styles.placeholderLine70} />
					<View style={styles.placeholderLine50} />
					<View style={styles.placeholderLineSmallMargin} />
					<View style={styles.row}>
						<View style={styles.placeholderMediaSmall} />
						<View style={styles.placeholderMediaWide} />
						<View style={styles.placeholderMediaCircle} />
					</View>
				</View>
			</View>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		superContainer: {
			backgroundColor: theme.colors.white,
			height: '100%',
			flex: 1,
			alignItems: 'center'
		},
		container: {
			backgroundColor: theme.colors.white,
			height: '100%',
			width: '90%'
		},
		placeholderCircle: {
			width: 40,
			height: 40,
			borderRadius: 20,
			backgroundColor: '#eee',
			alignSelf: 'center',
			marginBottom: 10
		},
		placeholderLineSmall: {
			width: '30%',
			height: 20,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		},
		placeholderLine60: {
			width: '60%',
			height: 12,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		},
		placeholderLine70: {
			width: '70%',
			height: 12,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		},
		placeholderLine50: {
			width: '50%',
			height: 12,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		},
		placeholderLineSmallMargin: {
			width: '30%',
			height: 20,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginTop: 20,
			marginBottom: 10
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between'
		},
		placeholderMediaSmall: {
			width: 60,
			height: 60,
			backgroundColor: '#eee',
			borderRadius: 8
		},
		placeholderMediaWide: {
			width: '60%',
			height: 60,
			backgroundColor: '#eee',
			borderRadius: 8
		},
		placeholderMediaCircle: {
			width: 50,
			height: 50,
			backgroundColor: '#eee',
			borderRadius: 30
		}
	});

export default Placeholder;
