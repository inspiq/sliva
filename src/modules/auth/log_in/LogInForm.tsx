import { type ReactElement, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import * as yup from 'yup';

import { UiButtonLayout } from 'src/modules/auth/ButtonLayout';
import { Error } from 'src/modules/auth/Error';
import { FormLayout } from 'src/modules/auth/FormLayout';
import { StyledLink } from 'src/modules/auth/Link';
import { TextTip, TextTipLayout } from 'src/modules/auth/Tip';
import { useRouter } from 'src/navigation';
import { auth, Line, Loader, UiButton, UiInput } from 'src/shared';

const LogInFormElement = (): ReactElement => {
  const [isRequestError, setIsRequestError] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnMount: true,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email(t('validations.email'))
        .required(t('validations.required')),
      password: yup.string().required(t('validations.required')),
    }),
    onSubmit: async ({ email, password }) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/');
        setIsRequestError(false);
      } catch (error) {
        setIsRequestError(true);
      }
    },
  });

  if (isSubmitting) {
    return <Loader />;
  }

  return (
    <FormLayout title={t('LogInForm.title')} onSubmit={handleSubmit}>
      <UiInput
        type="email"
        name="email"
        onChange={handleChange}
        value={values.email}
        label={t('LogInForm.email_input.label')}
        onBlur={handleBlur}
        hasError={!!errors.email && !!touched.email}
        textError={errors.email}
        id="email"
      />
      <UiInput
        type="password"
        name="password"
        onChange={handleChange}
        value={values.password}
        label={t('LogInForm.password_input.label')}
        onBlur={handleBlur}
        hasError={!!errors.password && !!touched.password}
        textError={errors.password}
        id="password"
      />
      {isRequestError && (
        <Error>{t('LogInForm.error.invalid_email_or_password')}</Error>
      )}
      <UiButtonLayout>
        <UiButton
          type="submit"
          size="big"
          disabled={isSubmitting}
          isSubmitting={isSubmitting}
        >
          {t('LogInForm.button.text')}
        </UiButton>
      </UiButtonLayout>
      <Line />
      <TextTipLayout>
        <TextTip>
          {t('LogInForm.tip.link_description')}{' '}
          <StyledLink href="/reset_password">
            {t('LogInForm.tip.link')}
          </StyledLink>
        </TextTip>
      </TextTipLayout>
    </FormLayout>
  );
};

export const LogInForm = LogInFormElement;
