import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from './src/styles/colorsPalette';
import daisyui from 'daisyui';

const config = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  plugins: [daisyui],
  theme: {
    colors,
    extend: {
      fontFamily: {
        base: ['var(--font-base)', ...defaultTheme.fontFamily.sans],
      },
      minWidth: {
        content: 'max-content',
      },
    },
  },
} satisfies Config;

export default config;
