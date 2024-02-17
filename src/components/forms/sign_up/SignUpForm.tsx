import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import * as yup from 'yup';

import { Line, Loader } from 'src/components';
import { UiButtonLayout } from 'src/components/forms/ButtonLayout';
import { Error } from 'src/components/forms/Error';
import { FormLayout } from 'src/components/forms/FormLayout';
import { StyledLink } from 'src/components/forms/Link';
import { TextTip, TextTipLayout, Tip } from 'src/components/forms/Tip';
import { useRouter } from 'src/navigation';
import { auth, db, UiButton, UiInput, UiSelect } from 'src/shared';
import { EmailIcon, PasswordIcon } from 'src/shared/icons';

const DownloadLink = styled.a`
  color: ${({ theme }) => theme.primary};
`;
const Row = styled.div`
  display: flex;
  gap: 10px;
`;

export const SignUpForm = () => {
  const [isRequestError, setIsRequestError] = useState(false);
  const router = useRouter();
  const t = useTranslations();

  const defaultOption = {
    value: 'client',
    label: t('SignUpForm.select.options.client'),
  };

  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const options = [
    { value: 'client', label: t('SignUpForm.select.options.client') },
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
      name: '',
      lastName: '',
      surname: '',
      email: '',
      password: '',
      repeat_password: '',
      userType: selectedOption.value,
      country: selectedOption.value,
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required(t('validations.required'))
        .min(2, t('validations.name.min'))
        .matches(/^[A-Za-zА-Яа-яЁё\s-]+$/, t('validations.name.matches')),
      lastName: yup
        .string()
        .required(t('validations.required'))
        .min(2, t('validations.lastName.min'))
        .matches(/^[A-Za-zА-Яа-яЁё\s-]+$/, t('validations.lastName.matches')),
      surname: yup
        .string()
        .required(t('validations.required'))
        .min(2, t('validations.surname.min'))
        .matches(/^[A-Za-zА-Яа-яЁё\s-]+$/, t('validations.surname.matches')),
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
    onSubmit: async (options) => {
      const { name, lastName, surname, email, password } = options;

      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const usersCollection = collection(db, 'users');
        const userDocRef = doc(usersCollection, user.uid);

        await setDoc(userDocRef, {
          name,
          lastName,
          surname,
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
      <Row>
        <UiInput
          name="name"
          onChange={handleChange}
          value={values.lastName}
          placeholder={t('SignUpForm.lastName_input.placeholder')}
          onBlur={handleBlur}
          hasError={!!errors.lastName && !!touched.lastName}
          textError={errors.lastName}
        />
        <UiInput
          name="lastName"
          onChange={handleChange}
          value={values.name}
          placeholder={t('SignUpForm.name_input.placeholder')}
          onBlur={handleBlur}
          hasError={!!errors.name && !!touched.name}
          textError={errors.name}
        />
        <UiInput
          name="surname"
          onChange={handleChange}
          value={values.surname}
          placeholder={t('SignUpForm.surname_input.placeholder')}
          onBlur={handleBlur}
          hasError={!!errors.surname && !!touched.surname}
          textError={errors.surname}
        />
      </Row>
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
