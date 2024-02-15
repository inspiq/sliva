import { colors } from 'src/shared/theme/colors';
import { fonts } from 'src/shared/theme/fonts';

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
      border: colors.border_ui,
      bg: colors.white,
      hover: colors.border_ui_hover,
    },
    disabled: colors.disabled_button,
  },
  input: {
    placeholder: colors.placeholder,
    value: colors.black,
    border: colors.border_ui,
    focus: colors.primary,
    active: colors.border_ui_hover,
    error: colors.error,
  },
  loader: { primary: colors.primary, secondary: colors.white },
};
