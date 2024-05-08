import styled from 'styled-components';

import { Accordion, useToggle } from 'src/shared';

const Answer = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.secondary};
  font-weight: ${({ theme }) => theme.w400};
`;

interface Props {
  question: { prompt: string; answer: string };
  id: string;
}

export const QuestionCard = (props: Props) => {
  const { visible, toggle } = useToggle();
  const { id, question } = props;
  const { prompt, answer } = question;

  return (
    <Accordion isOpen={visible} onChange={toggle} title={prompt} id={id}>
      <Answer>{answer}</Answer>
    </Accordion>
  );
};
