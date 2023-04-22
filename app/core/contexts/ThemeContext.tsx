import React, { useState } from 'react';
import { theme as importedTheme, Theme } from '@theme';

const ThemeContext = React.createContext<[Theme, (newTheme: Theme) => void]>([
	importedTheme,
	(_newTheme: Theme) => {}
]);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<Theme>(importedTheme);

	const modifyTheme = (newTheme: Theme) => {
		setTheme(newTheme);
	};

	return (
		<ThemeContext.Provider value={[theme, modifyTheme]}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };
