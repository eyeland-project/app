export let theme: Theme = {
    colors: {
        primary: '#fff',
        secondary: '#000',
        white: '#fff',
        black: '#000',
        gray: '#cccccc',
        darkGray: '#707071',
        yellow: '#ffff00',
        green: '#00ff00',
        bluerGreen: '#41fb99',
        lightBluerGreen: '#74efae',
        lightGreen: '#abf5ce',
        darkGreen: '#0d9748',
        darkerGreen: '#07792F',
        darkestGreen: '#0B460C',
        red: '#FD6870',
        blue: '#0496FF',
        orange: '#FFA500',
    },
    borderRadius: {
        small: 4,
        medium: 8,
        large: 16,
        full: 9999,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    fontSize: {
        xs: 12,
        small: 14,
        medium: 16,
        large: 18,
        xl: 20,
        xxl: 24,
        xxxl: 28,
        xxxxl: 32,
        xxxxxl: 36,
        xxxxxxl: 40,
    },
    fontFamily: {
        primary: 'Raleway-Regular',
    },
    fontWeight: {
        regular: 'Raleway-Regular',
        medium: 'Raleway-Medium',
        bold: 'Raleway-Bold',
    },
    spacing: {
        small: -2,
        medium: 0,
        large: 2,
    }
};

export interface Theme {
    colors: {
        primary: string;
        secondary: string;
        white: string;
        black: string;
        gray: string;
        darkGray: string;
        yellow: string;
        green: string;
        bluerGreen: string;
        lightBluerGreen: string;
        lightGreen: string;
        darkGreen: string;
        darkerGreen: string;
        darkestGreen: string;
        red: string;
        blue: string;
        orange: string;
    };
    borderRadius: {
        small: number;
        medium: number;
        large: number;
        full: number;
    };
    shadow: {
        shadowColor: string;
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    fontSize: {
        xs: number;
        small: number;
        medium: number;
        large: number;
        xl: number;
        xxl: number;
        xxxl: number;
        xxxxl: number;
        xxxxxl: number;
        xxxxxxl: number;
    };
    fontFamily: {
        primary: string;
    };
    fontWeight: {
        regular: string;
        medium: string;
        bold: string;
    };
    spacing: {
        small: number;
        medium: number;
        large: number;
    };
}
