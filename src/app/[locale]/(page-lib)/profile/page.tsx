import {
  Container,
  Footer,
  Header,
  UserProfile,
  Wrapper,
} from 'src/components';

const Profile = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <UserProfile />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Profile;
