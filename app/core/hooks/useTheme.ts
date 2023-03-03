import { useContext } from 'react';
import { ThemeContext } from '@contexts/ThemeContext';

const useTheme = () => {
    const [theme, _modifyTheme] = useContext(ThemeContext);
    return theme;
};

export default useTheme;
