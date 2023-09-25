import { useWindowDimensions } from 'react-native';
import { useEffect, useState } from 'react';

const useMediaQuery = () => {
	const [isPhone, setIsPhone] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);

	const { width: windowWidth } = useWindowDimensions();

	const updateStates = (
		phoneState: boolean,
		tabletState: boolean,
		desktopState: boolean
	) => {
		setIsPhone(phoneState);
		setIsTablet(tabletState);
		setIsDesktop(desktopState);
	};

	useEffect(() => {
		if (windowWidth < 768) {
			updateStates(true, false, false);
		} else if (windowWidth >= 768 && windowWidth < 1024) {
			updateStates(false, true, false);
		} else {
			updateStates(false, false, true);
		}
	}, [windowWidth]);

	return { isPhone, isTablet, isDesktop };
};

export default useMediaQuery;
