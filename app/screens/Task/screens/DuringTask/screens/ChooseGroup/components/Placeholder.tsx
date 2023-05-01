import {
	Placeholder as PlaceholderRN,
	PlaceholderMedia,
	PlaceholderLine,
	ShineOverlay
} from 'rn-placeholder';
import { View, StyleSheet } from 'react-native';

import useTheme from '@hooks/useTheme';

import { Theme } from '@theme';

const Placeholder = () => {
	const theme = useTheme();
	const styles = getStyles(theme);

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<PlaceholderRN Animation={ShineOverlay}>
					<PlaceholderLine width={40} height={30} />
					<PlaceholderLine />
					<PlaceholderLine width={60} />
					<PlaceholderLine width={70} />
					<PlaceholderLine
						style={styles.button}
						width={40}
						height={40}
						noMargin={true}
					/>
				</PlaceholderRN>
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
		button: {
			borderRadius: theme.borderRadius.full,
			marginLeft: 'auto',
			marginTop: 20,
			...theme.shadow
		}
	});

export default Placeholder;
