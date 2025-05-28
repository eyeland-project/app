import { View, StyleSheet } from 'react-native';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

const Placeholder = () => {
	const theme = useTheme();
	const styles = getStyles(theme);

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<View style={styles.placeholderBox} />
				<View style={styles.placeholderLine} />
				<View style={styles.placeholderLineWide} />
				<View style={styles.placeholderLineWider} />
				<View style={styles.button} />
			</View>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			height: '100%'
		},
		card: {
			backgroundColor: theme.colors.white,
			padding: 20,
			borderRadius: theme.borderRadius.medium,
			marginHorizontal: 20,
			...theme.shadow
		},
		placeholderBox: {
			width: 40,
			height: 30,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		},
		placeholderLine: {
			width: '100%',
			height: 12,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		},
		placeholderLineWide: {
			width: '60%',
			height: 12,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		},
		placeholderLineWider: {
			width: '70%',
			height: 12,
			backgroundColor: '#eee',
			borderRadius: 4,
			marginBottom: 10
		},
		button: {
			width: 40,
			height: 40,
			borderRadius: theme.borderRadius.full,
			backgroundColor: '#eee',
			marginLeft: 'auto',
			marginTop: 20,
			...theme.shadow
		}
	});

export default Placeholder;
