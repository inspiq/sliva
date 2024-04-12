'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import type { PropsWithChildren } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Montserrat } from 'next/font/google';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import StyledComponentsRegistry from 'src/app/[locale]/(page-lib)/registry';
import { AuthContextProvider } from 'src/context';
import { theme } from 'src/shared';

const montserrat = Montserrat({ subsets: ['latin'] });
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
   
  body {
    margin: 0;
    position: relative;
  }

  button {
    outline: none;
    border: none;
    font-family: ${montserrat.style.fontFamily};
  }

  a {
    outline: none;
    text-decoration: none;
    color: ${({ theme }) => theme.text}
  }

  input {
    outline: none;
    font-family: ${montserrat.style.fontFamily};
  }

  p {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.white} inset !important;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  textarea {
    resize: none;
    outline: none;
    font-family: ${montserrat.style.fontFamily};
  }

  @keyframes anvil {
    0% {
      transform: scale(1) translateY(0px);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }
    1% {
      transform: scale(0.96) translateY(10px);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }
    100% {
      transform: scale(1) translateY(0px);
      opacity: 1;
      box-shadow: 0 0 500px rgba(241, 241, 241, 0);
    }
  }

  .popup-content {
    -webkit-animation: anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  }
`;

export const App = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <CookiesProvider>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ThemeProvider>
      </AuthContextProvider>
    </CookiesProvider>
  );
};
