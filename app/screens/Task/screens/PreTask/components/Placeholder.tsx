import {
	Placeholder as PlaceholderRN,
	PlaceholderMedia,
	PlaceholderLine,
	ShineOverlay
} from 'rn-placeholder';

const Placeholder = () => {
	return (
		<PlaceholderRN Animation={ShineOverlay}>
			<PlaceholderMedia
				style={{ width: '100%', height: '100%', borderRadius: 8 }}
			/>
		</PlaceholderRN>
	);
};

export default Placeholder;
