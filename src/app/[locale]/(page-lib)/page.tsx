import {
  Categories,
  Container,
  Footer,
  Header,
  Slogan,
  Wrapper,
} from 'src/components';

const HomePage = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <Slogan />
          <Categories />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export default HomePage;
