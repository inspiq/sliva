import {
  Container,
  Footer,
  Header,
  SpecialistAccount,
  Wrapper,
} from 'src/components';

const Specialist = (props: { params: { specialistId: string } }) => {
  const { params } = props;

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <SpecialistAccount specialistId={params.specialistId} />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Specialist;
