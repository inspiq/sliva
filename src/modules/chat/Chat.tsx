import type { ReactElement } from 'react';

import { sessionStore } from 'src/app_store';
import { Header } from 'src/modules';
import { ChatManagement } from 'src/modules/chat/ChatManagement';
import { Container, Footer, Wrapper } from 'src/shared';
import type { UserWithAdditionalInfo } from 'src/types';

export interface Props {
  authUser: UserWithAdditionalInfo | null;
  isLoading: boolean;
}

export const ChatElement = (): ReactElement => {
  return (
    <>
      <Header />
      <Wrapper $position="flex-start">
        <Container>
          <ChatManagement
            authUser={sessionStore.authUser}
            isLoading={sessionStore.lockState.progress}
          />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const Chat = ChatElement;
