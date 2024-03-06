import { ReactElement } from 'react';

import { useAuthContext } from 'src/context';
import { Header } from 'src/modules';
import { PersonalInfoForm } from 'src/modules/my_profile/MyProfileForm';
import { Container, Footer, Loader, Wrapper } from 'src/shared';

const MyProfileElement = (): ReactElement => {
  const { currentAuthUser } = useAuthContext();

  if (!currentAuthUser?.additionalInfo) {
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
