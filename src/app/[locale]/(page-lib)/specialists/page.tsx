import {
  Container,
  Footer,
  Header,
  SpecialistsList,
  Wrapper,
} from 'src/components';

const Specialists = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <SpecialistsList />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Specialists;
