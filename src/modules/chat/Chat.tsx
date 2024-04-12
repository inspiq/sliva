import type { ReactElement } from 'react';

import { useAuthContext } from 'src/context';
import { Header } from 'src/modules';
import { ChatManagement } from 'src/modules/chat/ChatManagement';
import { Container, Footer, Wrapper } from 'src/shared';
import type { UserWithAdditionalInfo } from 'src/types';

export interface Props {
  authUser: UserWithAdditionalInfo | null;
  isLoading: boolean;
}

export const ChatElement = (): ReactElement => {
  const { authUser, isLoading } = useAuthContext();

  return (
    <>
      <Header />
      <Wrapper $position="flex-start">
        <Container>
          <ChatManagement authUser={authUser} isLoading={isLoading} />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const Chat = ChatElement;
