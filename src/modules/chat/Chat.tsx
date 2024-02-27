import { ReactElement } from 'react';

import { Header } from 'src/modules';
import { ChatManagement } from 'src/modules/chat/ChatManagement';
import { Container, Footer, Wrapper } from 'src/shared';

export const ChatElement = (): ReactElement => {
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <ChatManagement />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const Chat = ChatElement;
