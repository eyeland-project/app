import { View, StyleSheet } from 'react-native';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

const Placeholder = () => {
	const theme = useTheme();
	const styles = getStyles(theme);

	return (
		<View style={styles.container}>
			<View style={styles.placeholderCircle} />
			<View style={styles.placeholderLineWide} />
			<View style={styles.placeholderMedia} />
			<View style={styles.placeholderLine60} />
			<View style={styles.placeholderLine80} />
			<View style={styles.placeholderLine90} />
			<View style={styles.placeholderLine75} />
			<View style={styles.placeholderLine95} />
			<View style={styles.placeholderLine60} />
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			paddingHorizontal: 20,
			height: '100%'
		},
		placeholderCircle: {
			width: 40,
			height: 40,
			borderRadius: 20,
			backgroundColor: '#eee',
			marginTop: 10,
			marginBottom: 10
		},
		placeholderLineWide: {
			width: '50%',
			height: 12,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 20
		},
		placeholderMedia: {
			width: '100%',
			height: 200,
			backgroundColor: '#eee',
			borderRadius: 8,
			marginBottom: 40
		},
		placeholderLine60: {
			width: '60%',
			height: 12,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		},
		placeholderLine80: {
			width: '80%',
			height: 12,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		},
		placeholderLine90: {
			width: '90%',
			height: 12,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		},
		placeholderLine75: {
			width: '75%',
			height: 12,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		},
		placeholderLine95: {
			width: '95%',
			height: 12,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		}
	});

export default Placeholder;
