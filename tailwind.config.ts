import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Lex Scripta tri-font system
        sans: ['var(--font-public-sans)', 'sans-serif'],     // Body & primary UI
        serif: ['var(--font-newsreader)', 'serif'],           // Display & headlines
        mono: ['var(--font-inter)', 'monospace'],             // Labels, data, timestamps
        headline: ['var(--font-newsreader)', 'serif'],
        body: ['var(--font-public-sans)', 'sans-serif'],
        label: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        full: '9999px',
      },
      colors: {
        primary: '#005ab4',
        'primary-container': '#0873df',
        'on-primary': '#ffffff',
        'primary-fixed': '#d6e3ff',
        'primary-fixed-dim': '#aac7ff',
        'inverse-primary': '#aac7ff',
        secondary: '#465f89',
        'secondary-container': '#b7cfff',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#405882',
        tertiary: '#964400',
        'tertiary-container': '#bd5700',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#fffbff',
        'tertiary-fixed': '#ffdbc9',
        'tertiary-fixed-dim': '#ffb68c',
        surface: '#f9f9ff',
        'surface-dim': '#d8dae3',
        'surface-bright': '#f9f9ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f2f3fd',
        'surface-container': '#ecedf7',
        'surface-container-high': '#e6e8f1',
        'surface-container-highest': '#e0e2ec',
        'surface-variant': '#e0e2ec',
        'surface-tint': '#005db8',
        'on-surface': '#181c22',
        'on-surface-variant': '#414753',
        'inverse-surface': '#2d3038',
        'inverse-on-surface': '#eff0fa',
        background: '#f9f9ff',
        'on-background': '#181c22',
        outline: '#717785',
        'outline-variant': '#c1c6d5',
        error: '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
      },
    },
  },
  plugins: [],
}

export default config
