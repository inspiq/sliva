import 'styled-components';

import type { theme } from 'src/theme';

type CustomTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}

type EnMessages = typeof import('src/messages/en.json');
type RuMessages = typeof import('src/messages/ru.json');
type EsMessages = typeof import('src/messages/es.json');

declare interface IntlMessages extends EnMessages, RuMessages, EsMessages {}

declare module 'react-custom-checkbox';
