import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => any>(
	callback: T,
	delay: number
): T {
	const debouncedFn = useRef<ReturnType<typeof setTimeout> | null>(null);

	const debouncedCallback = useCallback(
		(...args: Parameters<T>) => {
			if (debouncedFn.current) clearTimeout(debouncedFn.current);
			debouncedFn.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	) as T;

	return debouncedCallback;
}
