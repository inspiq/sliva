'use client';

import React, { PropsWithChildren } from 'react';
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
    color: ${({ theme }) => theme.black}
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

  .css-13cymwt-control {
    height: 50px!important;
    border-radius: 10px!important;
    font-size: 15px;
    border: 1px solid ${({ theme }) => theme.input.border};
  }

  .css-t3ipsp-control {
    height: 50px!important;
    box-shadow: none!important;
    border-radius: 10px!important;
    font-size: 15px;
    border: 1px solid ${({ theme }) => theme.input.border};
  }

  .css-1nmdiq5-menu {
    font-size: 15px;
  }
`;

export const App = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </ThemeProvider>
    </AuthContextProvider>
  );
};
