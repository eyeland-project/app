import { useRef, useEffect, useCallback } from 'react';

const useDebounce = <T extends (...args: any[]) => any>(fn: T, delay: number): T => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const firstCall = useRef<boolean>(true);

	const debouncedFn = useCallback((...args: Parameters<T>) => {
		if (firstCall.current) {
			fn(...args);
			firstCall.current = false;
			timeoutRef.current = setTimeout(() => {
				firstCall.current = true;
			}, delay);
		} else {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => {
				fn(...args);
				firstCall.current = true;
			}, delay);
		}
	}, [fn, delay]) as T;

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return debouncedFn;
};

export default useDebounce;


