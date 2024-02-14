import { Container, Footer, Header, SignUpForm, Wrapper } from 'src/components';

const SignUp = () => {
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

export default SignUp;
