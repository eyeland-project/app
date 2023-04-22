import { useContext } from 'react';
import { PreTaskContext } from '@contexts/PreTaskContext';

const usePreTaskContext = () => {
	const preTaskContext = useContext(PreTaskContext);

	if (!preTaskContext) {
		throw new Error(
			'usePreTaskContext must be used within a PreTaskContextProvider'
		);
	}

	return preTaskContext;
};

export default usePreTaskContext;
