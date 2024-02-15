import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import * as yup from 'yup';

import { Line, Loader } from 'src/components';
import { UiButtonLayout } from 'src/components/forms/ButtonLayout';
import { Error } from 'src/components/forms/Error';
import { FormLayout } from 'src/components/forms/FormLayout';
import { StyledLink } from 'src/components/forms/Link';
import { TextTip, TextTipLayout } from 'src/components/forms/Tip';
import { useRouter } from 'src/navigation';
import { auth, UiButton, UiInput } from 'src/shared';
import { EmailIcon, PasswordIcon } from 'src/shared/icons';

export const LogInForm = () => {
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
    return <Loader size={60} />;
  }

  return (
    <FormLayout title={t('LogInForm.title')} onSubmit={handleSubmit}>
      <UiInput
        type="email"
        name="email"
        onChange={handleChange}
        value={values.email}
        placeholder={t('LogInForm.email_input.placeholder')}
        Icon={<EmailIcon />}
        onBlur={handleBlur}
        hasError={!!errors.email && !!touched.email}
        textError={errors.email}
      />
      <UiInput
        type="password"
        name="password"
        onChange={handleChange}
        value={values.password}
        placeholder={t('LogInForm.password_input.placeholder')}
        Icon={<PasswordIcon />}
        onBlur={handleBlur}
        hasError={!!errors.password && !!touched.password}
        textError={errors.password}
      />
      {isRequestError && <Error>Invalid email or password</Error>}
      <UiButtonLayout>
        <UiButton type="submit" size="big" disabled={isSubmitting}>
          {t('LogInForm.button.text')}
        </UiButton>
      </UiButtonLayout>
      <Line />
      <TextTipLayout>
        <TextTip>
          {t('LogInForm.tip.link_description')}
          <StyledLink href="/reset_password">
            {' '}
            {t('LogInForm.tip.link')}
          </StyledLink>
        </TextTip>
      </TextTipLayout>
    </FormLayout>
  );
};
