import { ReactElement, useMemo, useState } from 'react';
import Select, { MultiValue, StylesConfig } from 'react-select';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';
import * as yup from 'yup';

import { UploadAvatar } from 'src/modules/my_profile/UploadAvatar';
import {
  db,
  devices,
  getAreas,
  getCategories,
  getSubcategories,
  isSpecialist,
  Option,
  storage,
  UiButton,
  UiForm,
  UiInput,
  UserWithAdditionalInfo,
} from 'src/shared';

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 250px));
  gap: 10px;

  @media ${devices.mobileL} {
    grid-template-columns: repeat(2, minmax(100px, 250px));
  }
`;

const TextAreaRow = styled.div`
  display: flex;
  width: 100%;
`;

const StyledUiForm = styled(UiForm)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UiButtonLayout = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const SelectRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;

  @media ${devices.mobileL} {
    grid-template-columns: 1fr;
  }
`;

const StyledTextArea = styled.textarea`
  height: 150px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.input.border};
  padding: 15px 5px 0 15px;
  border-radius: 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.input.value};
  font-weight: ${({ theme }) => theme.w400};
  transition: border 0.3s;

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
    font-weight: ${({ theme }) => theme.w400};
  }

  &:hover {
    border-color: ${({ theme }) => theme.input.active};
  }

  &:focus {
    border-color: ${({ theme }) => theme.input.active};
  }
`;

const FormLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-bottom: 50px;

  @media ${devices.mobileL} {
    flex-direction: column;
  }
`;

const Title = styled.h6`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 40px;
  margin-top: 50px;
`;

const MyProfileFormElement = (props: {
  currentAuthUser: UserWithAdditionalInfo;
}): ReactElement => {
  const { currentAuthUser } = props;
  const { additionalInfo, uid, email } = currentAuthUser;

  const [fileUpload, setFileUpload] = useState<File>();
  const t = useTranslations();
  const { primary, light, border_ui, border_ui_hover, grey } = useTheme();
  const initialValues = useMemo(
    () =>
      isSpecialist(additionalInfo)
        ? {
            firstName: additionalInfo?.firstName ?? '',
            lastName: additionalInfo?.lastName ?? '',
            dayOfBirth: additionalInfo?.dayOfBirth ?? '',
            email: email ?? '',
            experience: additionalInfo?.experience ?? '',
            city: additionalInfo?.city ?? null,
            telegram: additionalInfo?.telegram ?? null,
            whatsApp: additionalInfo?.whatsApp ?? null,
            areas: additionalInfo?.areas ?? null,
            categories: additionalInfo?.categories ?? null,
            subcategories: additionalInfo?.subcategories ?? null,
            extendedInfo: additionalInfo?.extendedInfo ?? null,
          }
        : {
            firstName: additionalInfo?.firstName ?? '',
            lastName: additionalInfo?.lastName ?? '',
            dayOfBirth: additionalInfo?.dayOfBirth ?? '',
            email: email ?? '',
          },
    [additionalInfo, email],
  );

  const uploadFile = async (fileUpload?: File) => {
    if (!fileUpload) return;

    const filesFolderRef = ref(storage, `uploads/${fileUpload.name}`);

    try {
      const userDocRef = doc(db, 'users', uid);

      const { ref } = await uploadBytes(filesFolderRef, fileUpload);
      const downloadUrl = await getDownloadURL(ref);

      await updateDoc(userDocRef, { avatarUrl: downloadUrl });
    } catch (e) {
      /* empty */
    }
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      firstName: yup.string().required(t('validations.required')),
      lastName: yup.string().required(t('validations.required')),
      dayOfBirth: yup.string().required(t('validations.required')),
      experience: yup.number().required(t('validations.required')),
    }),
    onSubmit: async (userDetails) => {
      try {
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, { ...userDetails });
        await uploadFile(fileUpload!);
      } catch (e) {
        /* empty */
      }
    },
  });

  const categories = getCategories(t);
  const subcategories = getSubcategories(t);
  const areas = getAreas(t);

  const onChangeCategories = (options: MultiValue<Option>) => {
    setFieldValue('categories', options);
  };

  const onChangeSubcategories = (options: MultiValue<Option>) => {
    setFieldValue('subcategories', options);
  };

  const onChangeArea = (option: MultiValue<Option>) => {
    setFieldValue('areas', option);
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
      minHeight: 50,
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
    placeholder: (styles) => ({
      ...styles,
      color: grey,
    }),
  };

  return (
    <>
      <Title>{t('my_profile.title')}</Title>
      <FormLayout>
        <UploadAvatar
          fileUpload={fileUpload}
          setFileUpload={setFileUpload}
          additionalInfo={additionalInfo}
        />
        <StyledUiForm onSubmit={handleSubmit}>
          <Row>
            <UiInput
              placeholder={t('my_profile.last_name_input')}
              value={values.lastName}
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.lastName && !!touched.lastName}
              textError={errors.lastName}
            />
            <UiInput
              placeholder={t('my_profile.first_name_input')}
              value={values.firstName}
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.firstName && !!touched.firstName}
              textError={errors.firstName}
            />
            <UiInput
              placeholder={t('my_profile.birthday_input')}
              value={values.dayOfBirth}
              name="dayOfBirth"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.dayOfBirth && !!touched.dayOfBirth}
              textError={errors.dayOfBirth}
            />
            <UiInput
              placeholder={t('my_profile.work_input')}
              value={values.experience}
              name="experience"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.experience && !!touched.experience}
              textError={errors.experience}
              type="number"
            />
          </Row>
          <Row>
            <UiInput
              placeholder={t('my_profile.city_input')}
              value={values.city}
              name="city"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.city && !!touched.city}
              textError={errors.city}
            />
            <UiInput
              placeholder={t('my_profile.telegram_input')}
              value={values.telegram}
              name="telegram"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.telegram && !!touched.telegram}
              textError={errors.telegram}
            />
            <UiInput
              placeholder={t('my_profile.whats_app_input')}
              value={values.whatsApp}
              name="whatsApp"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.whatsApp && !!touched.whatsApp}
              textError={errors.whatsApp}
            />
            <UiInput
              placeholder={t('my_profile.email_input')}
              value={values.email}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.email && !!touched.email}
              textError={errors.email}
              disabled
            />
          </Row>
          <SelectRow>
            <Select
              isMulti
              name="categories"
              options={categories}
              onChange={(selectedOptions) =>
                onChangeCategories(selectedOptions as MultiValue<Option>)
              }
              value={values.categories}
              placeholder={t('my_profile.categories_select')}
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
            <Select
              isMulti
              name="subcategories"
              onChange={(selectedOptions) =>
                onChangeSubcategories(selectedOptions as MultiValue<Option>)
              }
              options={subcategories}
              value={values.subcategories}
              placeholder={t('my_profile.subcategories_select')}
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
            <Select
              isMulti
              name="area"
              options={areas}
              onChange={onChangeArea as VoidFunction}
              value={values.areas}
              placeholder="Выберите области работы"
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
          </SelectRow>
          <TextAreaRow>
            <StyledTextArea
              value={values.extendedInfo}
              onChange={handleChange}
              placeholder={t('my_profile.additional_information_textarea')}
              name="extendedInfo"
            />
          </TextAreaRow>
          <UiButtonLayout>
            <UiButton
              type="submit"
              size="big"
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isStretching={false}
            >
              {t('my_profile.button')}
            </UiButton>
          </UiButtonLayout>
        </StyledUiForm>
      </FormLayout>
    </>
  );
};

export const PersonalInfoForm = MyProfileFormElement;
