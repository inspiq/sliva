import type { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';

import { sessionStore } from 'src/app_store';
import { Header } from 'src/modules';
import { MyProfileForm } from 'src/modules/my_profile/MyProfileForm';
import { Container, Footer, Loader, Wrapper } from 'src/shared';

const MyProfileElement = (): ReactElement => {
  if (!sessionStore.authUser?.additionalInfo) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <MyProfileForm authUser={sessionStore.authUser} />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const MyProfile = observer(MyProfileElement);
