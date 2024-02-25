import React from 'react';

import { Container, Footer, Header, Wrapper } from 'src/components';
import { SignUpForm } from 'src/components/auth/sign_up/SignUpForm';

export const SignUp = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <SignUpForm />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};
