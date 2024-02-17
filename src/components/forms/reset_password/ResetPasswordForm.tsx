import { ReactElement, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import * as yup from 'yup';

import { UiButtonLayout } from 'src/components/forms/ButtonLayout';
import { FormLayout } from 'src/components/forms/FormLayout';
import { Tip } from 'src/components/forms/Tip';
import { EmailIcon, UiButton, UiInput } from 'src/shared';
import { auth } from 'src/shared/firebase';

const ResetPasswordFormElement = (): ReactElement => {
  const [isSentLinkResetPassword, setIsSentLinkResetPassword] = useState(false);
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
    },
    validateOnMount: true,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email(t('validations.email'))
        .required(t('validations.required')),
    }),
    onSubmit: async ({ email }) => {
      try {
        await sendPasswordResetEmail(auth, email);
        setIsSentLinkResetPassword(true);
      } catch (e) {
        /* empty */
      }
    },
  });

  const buttonText = isSentLinkResetPassword
    ? t('ResetPasswordForm.button.sent')
    : t('ResetPasswordForm.button.to_send');

  return (
    <FormLayout title={t('ResetPasswordForm.title')} onSubmit={handleSubmit}>
      <UiInput
        name="email"
        onChange={handleChange}
        value={values.email}
        placeholder={t('ResetPasswordForm.email_input.placeholder')}
        Icon={<EmailIcon />}
        onBlur={handleBlur}
        hasError={!!errors.email && !!touched.email}
        textError={errors.email}
      />
      <Tip>{t('ResetPasswordForm.tip.text')}</Tip>
      <UiButtonLayout>
        <UiButton
          type="submit"
          size="big"
          disabled={isSentLinkResetPassword || isSubmitting}
          isSubmitting={isSubmitting}
        >
          {buttonText}
        </UiButton>
      </UiButtonLayout>
    </FormLayout>
  );
};

export const ResetPasswordForm = ResetPasswordFormElement;
