import { ReactElement } from 'react';

import { Container, Footer, Header, Wrapper } from 'src/components';
import { ChatManagement } from 'src/components/chat/ChatManagement';

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
