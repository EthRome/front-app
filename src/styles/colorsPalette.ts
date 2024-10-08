type ColorValue = string | Record<string, string>;
type ColorsPalette = Record<string, ColorValue>;

const colorsPalette = {
  inherit: 'inherit',
  white: '#ffffff',
  black: '#000000',
  background: '#130042',
  gray: '#A699C0',
  toast: '#AE55E2',
  pink: '#C140C3',
  purple: '#352272',
  error: {
    validation: '#FF5E5C',
  },

  slate: {
    50: '#F3F5F7',
    100: '#E3E9EF',
    200: '#CFDAE3',
    300: '#BCCBD6',
    400: '#7A8B99',
    500: '#3C5061',
    600: '#182733',
    700: '#16232E',
    800: '#14202A',
    900: '#0F172A',
    950: '#0C131A',
  },
  teal: {
    50: '#F0FDFA',
    100: '#CCFBF4',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#00EAC7',
    600: '#03D1B5',
    700: '#0F766E',
    800: '#111B24',
    900: '#0F3236',
    950: '#111B24',
  },
} satisfies ColorsPalette;

const colors: ColorsPalette = { ...colorsPalette };

export default colors;
