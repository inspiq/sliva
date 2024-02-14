import { Container, Footer, Header, LogInForm, Wrapper } from 'src/components';

const LogIn = () => {
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

export default LogIn;
