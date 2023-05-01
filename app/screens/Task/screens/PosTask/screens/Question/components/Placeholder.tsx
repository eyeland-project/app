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
			<PlaceholderRN Animation={ShineOverlay}>
				<PlaceholderLine
					width={70}
					height={30}
					noMargin={true}
					style={{ marginBottom: 20 }}
				/>
				<PlaceholderLine
					width={40}
					height={30}
					noMargin={true}
					style={{ marginBottom: 20 }}
				/>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<PlaceholderMedia style={{ width: '45%', height: 60 }} />
					<PlaceholderMedia style={{ width: '45%', height: 60 }} />
				</View>
				<PlaceholderLine
					width={30}
					height={30}
					noMargin={true}
					style={{ marginTop: 60 }}
				/>
				<View
					style={{
						alignContent: 'center',
						justifyContent: 'center',
						marginTop: 100,
						width: '100%',
						alignItems: 'center'
					}}
				>
					<PlaceholderMedia
						style={{ width: 150, height: 150, borderRadius: 999 }}
					/>
				</View>
			</PlaceholderRN>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.white,
			height: '100%',
			paddingHorizontal: 20
		}
	});

export default Placeholder;
