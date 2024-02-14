import {
  Container,
  Footer,
  Header,
  ResetPasswordForm,
  Wrapper,
} from 'src/components';

const ResetPassword = () => {
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

export default ResetPassword;
