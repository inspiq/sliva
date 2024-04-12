import type { ReactElement } from 'react';

import { useAuthContext } from 'src/context';
import { Header } from 'src/modules';
import { MyProfileForm } from 'src/modules/my_profile/MyProfileForm';
import { Container, Footer, Loader, Wrapper } from 'src/shared';

const MyProfileElement = (): ReactElement => {
  const { authUser } = useAuthContext();

  if (!authUser?.additionalInfo) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <MyProfileForm authUser={authUser} />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const MyProfile = MyProfileElement;
