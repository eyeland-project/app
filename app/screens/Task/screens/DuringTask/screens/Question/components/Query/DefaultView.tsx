import { View, Text, StyleSheet } from 'react-native';
import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

interface Props {
	text: string;
}
const DefaultView = ({ text }: Props) => {
	const theme = useTheme();
	const styles = getStyles(theme);

	const textFiltered = text.replace(/[\[\]\{\}]/g, '');

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{textFiltered}</Text>
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
		text: {
			fontSize: theme.fontSize.xxl,
			color: theme.colors.black,
			fontFamily: theme.fontWeight.regular,
			letterSpacing: theme.spacing.medium
		}
	});

export default DefaultView;
