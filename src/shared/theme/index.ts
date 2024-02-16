import { colors } from 'src/shared/theme/colors';
import { fonts } from 'src/shared/theme/fonts';

export const theme = {
  ...fonts,
  ...colors,
  text: colors.secondary,
  button: {
    primary: {
      text: colors.white,
      bg: colors.primary,
      hover: colors.hover_button_primary,
    },
    outline: {
      text: colors.secondary,
      border: colors.border_ui,
      bg: colors.white,
      hover: colors.border_ui_hover,
    },
    disabled: colors.disabled_button,
  },
  input: {
    placeholder: colors.placeholder,
    value: colors.secondary,
    border: colors.border_ui,
    focus: colors.primary,
    active: colors.border_ui_hover,
    error: colors.error,
  },
  loader: { primary: colors.primary, secondary: colors.white },
};
