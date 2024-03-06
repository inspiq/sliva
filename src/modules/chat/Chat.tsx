import { ReactElement } from 'react';

import { useAuthContext } from 'src/context';
import { Header } from 'src/modules';
import { ChatManagement } from 'src/modules/chat/ChatManagement';
import { Container, Footer, UserWithAdditionalInfo, Wrapper } from 'src/shared';

export interface Props {
  currentAuthUser: UserWithAdditionalInfo | null;
}

export const ChatElement = (): ReactElement => {
  const { currentAuthUser } = useAuthContext();

  return (
    <>
      <Header />
      <Wrapper $position="flex-start">
        <Container>
          <ChatManagement currentAuthUser={currentAuthUser} />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const Chat = ChatElement;
