import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from './src/styles/colorsPalette';
import daisyui from 'daisyui';
import { withAccountKitUi, createColorSet } from '@account-kit/react/tailwind';

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

export default withAccountKitUi(
  config,

  {
    // override account kit themes
    colors: {
      'btn-primary': createColorSet('#363FF9', '#9AB7FF'),
      'fg-accent-brand': createColorSet('#363FF9', '#9AB7FF'),
    },
  }
);
