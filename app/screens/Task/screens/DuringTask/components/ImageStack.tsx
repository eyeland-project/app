import { ImageStackElement } from '@app/core/hooks/Task/DurinTask/useImageStackStore';
import { Image, StyleSheet, View } from 'react-native';

const ImageStack = ({ imageStack }: { imageStack: ImageStackElement[] }) => {
	const styles = getStyles();

	return (
		<View style={styles.stackImages}>
			{imageStack.map((image, index) => {
				console.log(index, image.imgUrl);

				return (
					<View style={styles.stackImagesElem} key={index}>
						<Image
							style={styles.image}
							source={{
								// uri: `https://picsum.photos/400/200?t=${index}`
								uri: `${image.imgUrl}?t=${index}`
							}}
							// source={require('@images/choose_habitat_1.jpg')}
							resizeMode="contain"
						/>
					</View>
				);
			})}
		</View>
	);
};

const getStyles = () =>
	StyleSheet.create({
		stackImages: {
			position: 'relative',
			width: '100%',
			height: 200
		},
		stackImagesElem: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		},
		image: {
			width: '100%',
			height: '100%'
		}
	});

export default ImageStack;
