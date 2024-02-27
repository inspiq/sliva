import { Header } from 'src/modules';
import { LogInForm } from 'src/modules/auth/log_in/LogInForm';
import { Container, Footer, Wrapper } from 'src/shared';

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
