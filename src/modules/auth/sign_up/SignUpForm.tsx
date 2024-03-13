import { ReactElement, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';
import * as yup from 'yup';

import { UiButtonLayout } from 'src/modules/auth/ButtonLayout';
import { Error } from 'src/modules/auth/Error';
import { FormLayout } from 'src/modules/auth/FormLayout';
import { StyledLink } from 'src/modules/auth/Link';
import { TextTip, TextTipLayout, Tip } from 'src/modules/auth/Tip';
import { useRouter } from 'src/navigation';
import {
  auth,
  db,
  getUserTypeOptions,
  Line,
  Loader,
  Option,
  UiButton,
  UiInput,
} from 'src/shared';

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

const SignUpFormElement = (): ReactElement => {
  const [isRequestError, setIsRequestError] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const { primary, light_grey, border_ui, border_ui_hover } = useTheme();
  const [isAgree, setIsAgree] = useState(false);

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
      zipCode: '',
      address: '',
      userType: defaultUserTypeOption,
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
      zipCode: yup.number().required(t('validations.required')),
      address: yup.string().required(t('validations.required')),
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
      repeatPassword: yup
        .string()
        .required(t('validations.required'))
        .oneOf([yup.ref('password')], t('validations.password.one_of')),
    }),
    validateOnMount: true,
    onSubmit: async (userDetails) => {
      const {
        firstName,
        lastName,
        email,
        password,
        userType,
        address,
        zipCode,
      } = userDetails;

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
          firstName,
          lastName,
          type: userType.value,
          address,
          zipCode,
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
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 12,
      paddingBottom: 12,
      fontSize: 15,
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
      paddingLeft: 2,
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

  console.log(isAgree);

  return (
    <FormLayout title={t('SignUpForm.title')} onSubmit={handleSubmit}>
      <Row>
        <UiInput
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
          label={t('SignUpForm.last_name_input.label')}
          onBlur={handleBlur}
          hasError={!!errors.lastName && !!touched.lastName}
          textError={errors.lastName}
          id="lastName"
        />
        <UiInput
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
          label={t('SignUpForm.first_name_input.label')}
          onBlur={handleBlur}
          hasError={!!errors.firstName && !!touched.firstName}
          textError={errors.firstName}
          id="firstName"
        />
      </Row>
      <Row>
        <UiInput
          name="zipCode"
          onChange={handleChange}
          value={values.zipCode}
          label={t('SignUpForm.zip_code_input.label')}
          onBlur={handleBlur}
          hasError={!!errors.zipCode && !!touched.zipCode}
          textError={errors.zipCode}
          type="number"
          id="zipCode"
        />
        <UiInput
          name="address"
          onChange={handleChange}
          value={values.address}
          label={t('SignUpForm.address_input.label')}
          onBlur={handleBlur}
          hasError={!!errors.address && !!touched.address}
          textError={errors.address}
          id="address"
        />
      </Row>
      <UiInput
        name="email"
        onChange={handleChange}
        value={values.email}
        label={t('SignUpForm.email_input.label')}
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
        label={t('SignUpForm.password_input.label')}
        onBlur={handleBlur}
        hasError={!!errors.password && !!touched.password}
        textError={errors.password}
        id="password"
      />
      <UiInput
        type="password"
        name="repeatPassword"
        onChange={handleChange}
        value={values.repeatPassword}
        label={t('SignUpForm.repeat_password_input.label')}
        onBlur={handleBlur}
        hasError={!!errors.repeatPassword && !!touched.repeatPassword}
        textError={errors.repeatPassword}
        id="repeatPassword"
      />
      <SelectLayout>
        <Select
          value={values.userType}
          onChange={(selectedUserType) =>
            onChangeUserType(selectedUserType as Option)
          }
          options={userTypeOptions}
          defaultValue={defaultUserTypeOption}
          styles={styles}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: light_grey,
              primary50: light_grey,
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
        <input
          type="checkbox"
          id="privacyPolicy"
          onChange={(e) => setIsAgree(e.target.checked)}
        />
        <label htmlFor="privacyPolicy">
          {t('privacy_policy.description')}{' '}
          <DownloadLink href="/files/politika.docx" download>
            {t('privacy_policy.link')}
          </DownloadLink>
        </label>
      </Tip>
      <UiButtonLayout>
        <UiButton
          type="submit"
          size="big"
          disabled={isSubmitting || !isAgree}
          isSubmitting={isSubmitting}
        >
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
