import { ReactElement } from 'react';

import { Container, Footer, Header, Loader, Wrapper } from 'src/components';
import { PersonalInfoForm } from 'src/components/personal_info/PersonalInfoForm';
import { useAuthContext } from 'src/context';

const PersonalInfoElement = (): ReactElement => {
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

export const PersonalInfo = PersonalInfoElement;
