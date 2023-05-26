import { useRef, useEffect, useCallback } from 'react';

const useDebounce = <T extends (...args: any[]) => any>(fn: T, delay: number): T => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const debouncedFn = useCallback((...args: Parameters<T>) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			fn(...args);
		}, delay);
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

