import { ReactElement } from 'react';

import { Container, Footer, Header, Loader, Wrapper } from 'src/components';
import { PersonalInfoForm } from 'src/components/my_profile/MyProfileForm';
import { useAuthContext } from 'src/context';

const MyProfileElement = (): ReactElement => {
  const { currentAuthUser } = useAuthContext();

  if (!currentAuthUser) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <PersonalInfoForm currentAuthUser={currentAuthUser} />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const MyProfile = MyProfileElement;
