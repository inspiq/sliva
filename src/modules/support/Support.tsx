import { ReactElement } from 'react';
import styled from 'styled-components';

import { Header } from 'src/modules';
import { QuestionsPanel } from 'src/modules/support/questions_panel/QuestionsPanel';
import { Link } from 'src/navigation';
import { Container, Footer, Wrapper } from 'src/shared';

const SupportLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
`;

const SupportContentLayout = styled.div`
  max-width: 850px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
`;

const NoteLayout = styled.div`
  padding: 20px;
  background-color: rgba(2, 123, 243, 0.08);
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const NoteTitle = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w600};
  margin-bottom: 15px;
  color: ${({ theme }) => theme.secondary};
`;

const NoteDescription = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.secondary};
`;

const AdditionalDescription = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.secondary};
`;

const Tip = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.secondary};

  > span {
    color: ${({ theme }) => theme.primary};
    font-weight: ${({ theme }) => theme.w600};
  }

  > a {
    font-weight: ${({ theme }) => theme.w600};
  }
`;

const QuestionTitle = styled.div`
  margin-top: 20px;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w600};
`;

const QuestionsLayout = styled.div`
  margin-top: 15px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

export const SupportElement = (): ReactElement => {
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <SupportLayout>
            <SupportContentLayout>
              <Title>Служба поддержки</Title>
              <NoteLayout>
                <NoteTitle>Примечание</NoteTitle>
                <NoteDescription>
                  Поддержка Sliva работает только с письмами пользователей. Это
                  эффективно: в письме вы можете передать нам скриншоты — так мы
                  быстрее разберемся с проблемой и поможем вам.
                </NoteDescription>
              </NoteLayout>
              <AdditionalDescription>
                Здесь собрана актуальная информация по частым вопросам, которые
                возникают у пользователей Sliva. Чтобы найти ответ на свой
                вопрос, выберите необходимый пункт — под ним будет описание.
              </AdditionalDescription>
              <QuestionTitle>Какой вопрос вас интересует?</QuestionTitle>
              <QuestionsLayout>
                <QuestionsPanel />
              </QuestionsLayout>
              <Tip>
                <span>Остались вопросы?</span> Напишите на почту:{' '}
                <Link href="mailto:test@yandex.ru">test@yandex.ru</Link>
              </Tip>
            </SupportContentLayout>
          </SupportLayout>
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const Support = SupportElement;
