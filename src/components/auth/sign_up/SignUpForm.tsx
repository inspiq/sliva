import { ReactElement, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';
import * as yup from 'yup';

import { Line, Loader } from 'src/components';
import { UiButtonLayout } from 'src/components/auth/ButtonLayout';
import { Error } from 'src/components/auth/Error';
import { FormLayout } from 'src/components/auth/FormLayout';
import { StyledLink } from 'src/components/auth/Link';
import { TextTip, TextTipLayout, Tip } from 'src/components/auth/Tip';
import { useRouter } from 'src/navigation';
import { auth, db, getUserTypeOptions, UiButton, UiInput } from 'src/shared';
import { Option } from 'src/shared';
import { EmailIcon, PasswordIcon } from 'src/shared/icons';

const DownloadLink = styled.a`
  color: ${({ theme }) => theme.primary};
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const SelectLayout = styled.div`
  width: 100%;
`;

const defaultUserCategories = [
  {
    value: 'all_specialists',
    label: 'Все специалисты',
  },
];

const SignUpFormElement = (): ReactElement => {
  const [isRequestError, setIsRequestError] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const { primary, light, border_ui, border_ui_hover } = useTheme();

  const userTypeOptions = getUserTypeOptions(t);
  const defaultUserTypeOption = userTypeOptions[0];

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      userType: defaultUserTypeOption,
      categories: defaultUserCategories,
    },
    validationSchema: yup.object().shape({
      lastName: yup
        .string()
        .required(t('validations.required'))
        .min(2, t('validations.last_name.min'))
        .matches(/^[A-Za-zА-Яа-яЁё\s-]+$/, t('validations.last_name.matches')),
      firstName: yup
        .string()
        .required(t('validations.required'))
        .min(2, t('validations.first_name.min'))
        .matches(/^[A-Za-zА-Яа-яЁё\s-]+$/, t('validations.first_name.matches')),
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
    onSubmit: async (userDetails) => {
      const { firstName, lastName, email, password, userType } = userDetails;

      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const usersCollection = collection(db, 'users');
        const userDocRef = doc(usersCollection, user.uid);

        await setDoc(userDocRef, {
          firstName,
          lastName,
          type: userType.value,
        });

        router.push('/');
        setIsRequestError(false);
      } catch (e) {
        setIsRequestError(true);
      }
    },
  });

  const onChangeUserType = (option: Option) => {
    setFieldValue('userType', option);
  };

  const styles: StylesConfig = {
    option: (base) => ({
      ...base,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 15,
      paddingTop: 10,
      paddingBottom: 10,
    }),
    control: (styles, { isFocused }) => ({
      ...styles,
      width: '100%',
      height: 50,
      borderRadius: 10,
      borderColor: isFocused ? border_ui_hover : border_ui,
      boxShadow: 'none',
      borderWidth: 1,
      fontSize: 15,
      transition: '0.3s',
      ':hover': {
        ...styles[':hover'],
        borderColor: border_ui_hover,
      },
    }),
  };

  if (isSubmitting) {
    return <Loader />;
  }

  return (
    <FormLayout title={t('SignUpForm.title')} onSubmit={handleSubmit}>
      <Row>
        <UiInput
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
          placeholder={t('SignUpForm.last_name_input.placeholder')}
          onBlur={handleBlur}
          hasError={!!errors.lastName && !!touched.lastName}
          textError={errors.lastName}
        />
        <UiInput
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
          placeholder={t('SignUpForm.first_name_input.placeholder')}
          onBlur={handleBlur}
          hasError={!!errors.firstName && !!touched.firstName}
          textError={errors.firstName}
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
        name="repeatPassword"
        onChange={handleChange}
        value={values.repeatPassword}
        placeholder={t('SignUpForm.repeat_password_input.placeholder')}
        Icon={<PasswordIcon />}
        onBlur={handleBlur}
        hasError={!!errors.repeatPassword && !!touched.repeatPassword}
        textError={errors.repeatPassword}
      />
      <SelectLayout>
        <Select
          value={values.userType}
          onChange={onChangeUserType as VoidFunction}
          options={userTypeOptions}
          defaultValue={defaultUserTypeOption}
          styles={styles}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: light,
              primary50: light,
              primary,
            },
          })}
        />
      </SelectLayout>
      {isRequestError && (
        <Error>{t('SignUpForm.error.user_already_exist')}</Error>
      )}
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

export const SignUpForm = SignUpFormElement;
