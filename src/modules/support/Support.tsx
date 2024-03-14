import { ReactElement } from 'react';
import styled from 'styled-components';

import { Header } from 'src/modules';
import { Accordion, Container, Footer, useToggle, Wrapper } from 'src/shared';

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
`;

const NoteLayout = styled.div`
  padding: 20px;
  background-color: rgba(2, 123, 243, 0.08);
  border-radius: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const NoteTitle = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w600};
  margin-bottom: 15px;
`;

const NoteDescription = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
`;

const AdditionalDescription = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
`;

const QuestionTitle = styled.div`
  margin-top: 20px;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w600};
`;

const QuestionsLayout = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SupportElement = (): ReactElement => {
  const QUESTIONS = [
    {
      question: 'Вопрос о регистрации/входе на сервис',
      answer: 'Чтобы зарегистрироваться вам необходимо',
    },
  ];

  const { visible, toggle } = useToggle();

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
                {QUESTIONS.map(({ question, answer }) => (
                  <Accordion
                    key={question}
                    isOpen={visible}
                    onToggle={toggle}
                    title={question}
                  >
                    {answer}
                  </Accordion>
                ))}
              </QuestionsLayout>
            </SupportContentLayout>
          </SupportLayout>
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const Support = SupportElement;
