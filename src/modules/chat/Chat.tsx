import type { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';

import { Header } from 'src/modules';
import { ChatManagement } from 'src/modules/chat/ChatManagement';
import { Container, Footer, Wrapper } from 'src/shared';
import { sessionStore } from 'src/store';
import type { UserWithAdditionalInfo } from 'src/store/SessionStore';

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

export const Chat = observer(ChatElement);
