import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import * as yup from 'yup';

import { Line, Loader, UiButton, UiInput, UiSelect } from 'src/components';
import { UiButtonLayout } from 'src/components/forms/ButtonLayout';
import { Error } from 'src/components/forms/Error';
import { FormLayout } from 'src/components/forms/FormLayout';
import { StyledLink } from 'src/components/forms/Link';
import { TextTip, TextTipLayout, Tip } from 'src/components/forms/Tip';
import { auth, db } from 'src/firebase';
import { EmailIcon, PasswordIcon } from 'src/icons';
import { useRouter } from 'src/navigation';

const DownloadLink = styled.a`
  color: ${({ theme }) => theme.primary};
`;

export const SignUpForm = () => {
  const [isRequestError, setIsRequestError] = useState(false);
  const router = useRouter();
  const t = useTranslations();

  const defaultOption = {
    value: 'user',
    label: t('SignUpForm.select.options.user'),
  };

  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const options = [
    { value: 'user', label: t('SignUpForm.select.options.user') },
    { value: 'specialist', label: t('SignUpForm.select.options.specialist') },
  ];

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeat_password: '',
      userType: selectedOption.value,
      country: selectedOption.value,
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email(t('validations.email'))
        .required(t('validations.required')),
      password: yup
        .string()
        .required(t('validations.required'))
        .min(6, t('validations.password.min'))
        .matches(/[A-Z]/, t('validations.password.matches'))
        .matches(/\d/, t('validations.password.second_matches')),
      repeat_password: yup
        .string()
        .required(t('validations.required'))
        .oneOf([yup.ref('password')], t('validations.password.one_of')),
    }),
    validateOnMount: true,
    onSubmit: async ({ email, password }) => {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const usersCollection = collection(db, 'users');
        const userDocRef = doc(usersCollection, user.uid);

        await setDoc(userDocRef, {
          userId: user.uid,
          type: values.userType,
        });

        router.push('/');
        setIsRequestError(false);
      } catch (e) {
        setIsRequestError(true);
      }
    },
  });

  if (isSubmitting) {
    return <Loader size={60} />;
  }

  return (
    <FormLayout title={t('SignUpForm.title')} onSubmit={handleSubmit}>
      <UiInput
        name="email"
        onChange={handleChange}
        value={values.email}
        placeholder={t('SignUpForm.email_input.placeholder')}
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
        placeholder={t('SignUpForm.password_input.placeholder')}
        Icon={<PasswordIcon />}
        onBlur={handleBlur}
        hasError={!!errors.password && !!touched.password}
        textError={errors.password}
      />
      <UiInput
        type="password"
        name="repeat_password"
        onChange={handleChange}
        value={values.repeat_password}
        placeholder={t('SignUpForm.repeat_password_input.placeholder')}
        Icon={<PasswordIcon />}
        onBlur={handleBlur}
        hasError={!!errors.repeat_password && !!touched.repeat_password}
        textError={errors.repeat_password}
      />
      <UiSelect
        onChange={setSelectedOption}
        defaultValue={selectedOption}
        options={options}
        value={selectedOption}
      />
      {isRequestError && <Error>The user with this email already exists</Error>}
      <Tip>{t('SignUpForm.tip.input')}</Tip>
      <Tip>
        {t('privacy_policy.description')}{' '}
        <DownloadLink href="/politika.docx" download>
          {t('privacy_policy.link')}
        </DownloadLink>
      </Tip>
      <UiButtonLayout>
        <UiButton type="submit" size="big" disabled={isSubmitting}>
          {t('SignUpForm.button.text')}
        </UiButton>
      </UiButtonLayout>
      <Line />
      <TextTipLayout>
        <TextTip>
          {t('SignUpForm.tip.link_description')}
          <StyledLink href="/log_in"> {t('SignUpForm.tip.link')}</StyledLink>
        </TextTip>
      </TextTipLayout>
    </FormLayout>
  );
};
