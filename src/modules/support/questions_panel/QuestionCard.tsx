import styled from 'styled-components';

import { Accordion, useToggle } from 'src/shared';

const Answer = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.secondary};
  font-weight: ${({ theme }) => theme.w400};
`;

export const QuestionCard = (props: {
  question: { question: string; answer: string };
}) => {
  const { visible, toggle } = useToggle();
  const { question, answer } = props.question;

  return (
    <Accordion
      key={question}
      isOpen={visible}
      onToggle={toggle}
      title={question}
    >
      <Answer>{answer}</Answer>
    </Accordion>
  );
};
