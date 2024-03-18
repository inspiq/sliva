import { useTranslations } from 'next-intl';

import { QuestionCard } from 'src/modules/support/questions_panel/QuestionCard';
import { getQuestions } from 'src/shared';

export const QuestionsPanel = () => {
  const t = useTranslations();
  const questions = getQuestions(t);

  return questions.map((question, i) => (
    <QuestionCard question={question} key={i} />
  ));
};
