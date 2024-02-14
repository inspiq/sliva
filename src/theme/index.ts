import { colors } from 'src/theme/colors';
import { fonts } from 'src/theme/fonts';

export const theme = {
  ...fonts,
  ...colors,
  logo: {
    primary: colors.primary,
    secondary: colors.black,
  },
  button: {
    primary: {
      text: colors.white,
      bg: colors.primary,
      hover: colors.hover_button_primary,
    },
    outline: {
      text: colors.black,
      border: colors.border_button,
      bg: colors.white,
      hover: colors.hover_button_outline,
    },
    disabled: colors.disabled_button,
  },
  input: {
    placeholder: colors.placeholder,
    value: colors.black,
    border: colors.border_input,
    focus: colors.primary,
    active: colors.grey,
    error: colors.error,
  },
  loader: { primary: colors.primary, secondary: colors.white },
};
