import React from 'react';

import { Container, Footer, Header, Wrapper } from 'src/components';
import { ResetPasswordForm } from 'src/components/auth/reset_password/ResetPasswordForm';

export const ResetPassword = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <ResetPasswordForm />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};
