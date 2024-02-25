import React from 'react';

import { Container, Footer, Header, Wrapper } from 'src/components';
import { LogInForm } from 'src/components/auth/log_in/LogInForm';

export const LogIn = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <LogInForm />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};
