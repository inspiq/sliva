import { Header } from 'src/modules';
import { SignUpForm } from 'src/modules/auth/sign_up/SignUpForm';
import { Container, Footer, Wrapper } from 'src/shared';

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
