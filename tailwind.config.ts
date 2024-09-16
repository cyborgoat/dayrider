import type {Config} from 'tailwindcss'

const {nextui} = require("@nextui-org/theme");
const {
    default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");


const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        // single component styles
        "./node_modules/@nextui-org/theme/dist/components/button.js",
        // or you can use a glob pattern (multiple component styles)
        './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js'
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            screens: {
                '2xl': {'max': '1535px'},
                // => @media (max-width: 1535px) { ... }

                'xl': {'max': '1279px'},
                // => @media (max-width: 1279px) { ... }

                'lg': {'max': '1023px'},
                // => @media (max-width: 1023px) { ... }

                'md': {'max': '767px'},
                // => @media (max-width: 767px) { ... }

                'sm': {'max': '639px'},
                // => @media (max-width: 639px) { ... }
            },
            gridTemplateColumns: {
                // Simple 16 column grid
                '16': 'repeat(16, minmax(0, 1fr))',

                // Complex site-specific column configuration
                'footer': '200px minmax(900px, 1fr) 100px',
            },
            gridColumn: {
                'span-13': 'span 13 / span 13',
                'span-14': 'span 14 / span 14',
                'span-15': 'span 15 / span 15',
                'span-16': 'span 16 / span 16',
            }

        },
    },
    darkMode: "class",
    plugins: [
        addVariablesForColors,
        nextui(
            {
                prefix: "nextui", // prefix for themes variables
                addCommonColors: true, // do not override common colors (e.g. "blue", "green", "pink").
                defaultTheme: "light", // default theme from the themes object
                defaultExtendTheme: "light", // default theme to extend on custom themes
                layout: {}, // common layout tokens (applied to all themes)
                themes: {
                    light: {
                        layout: {}, // light theme layout tokens
                        colors: {
                            primary: {DEFAULT: '#3b82f6', foreground: '#ffffff',},
                        }, // light theme colors
                    },
                    dark: {
                        layout: {}, // dark theme layout tokens
                        colors: {}, // dark theme colors
                    },
                    // ... custom themes
                },
            }
        ), '@tailwindcss/forms'],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({addBase, theme}: any) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}

export default config
