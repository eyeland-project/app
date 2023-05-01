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
		<View style={styles.superContainer}>
			<View style={styles.container}>
				<View>
					<PlaceholderRN Animation={ShineOverlay}>
						<PlaceholderLine
							width={40}
							height={40}
							style={{ alignSelf: 'center' }}
						/>
						<PlaceholderLine width={30} height={20} />
						<PlaceholderLine width={60} />
						<PlaceholderLine width={70} />
						<PlaceholderLine width={50} />
						<PlaceholderLine
							width={30}
							height={20}
							style={{ marginTop: 20 }}
						/>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
						>
							<PlaceholderMedia
								style={{
									width: 60,
									height: 60,
									borderRadius: 8
								}}
							/>
							<PlaceholderMedia
								style={{
									width: '60%',
									height: 60,
									borderRadius: 8
								}}
							/>

							<PlaceholderMedia
								style={{
									width: 50,
									height: 50,
									borderRadius: 30
								}}
							/>
						</View>
					</PlaceholderRN>
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
