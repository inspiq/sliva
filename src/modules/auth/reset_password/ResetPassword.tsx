import { Header } from 'src/modules';
import { ResetPasswordForm } from 'src/modules/auth/reset_password/ResetPasswordForm';
import { Container, Footer, Wrapper } from 'src/shared';

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
