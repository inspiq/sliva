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
  formattedCategoriesFromBackendToSelectFormat,
  getCategories,
  getSpecialistFilters,
  isSpecialist,
  Option,
  storage,
  UiButton,
  UiForm,
  UiInput,
  UserRole,
  UserWithAdditionalInfo,
} from 'src/shared';

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 250px));
  gap: 12px;

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
  gap: 12px;
`;

const UiButtonLayout = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const SelectRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media ${devices.mobileL} {
    grid-template-columns: 1fr;
  }
`;

const TextArea = styled.textarea`
  height: 150px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.input.border};
  padding: 12px 0 0 12px;
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
  const { additionalInfo, uid } = currentAuthUser;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [fileUpload, setFileUpload] = useState<File>();
  const t = useTranslations();
  const { primary, light_grey, border_ui, border_ui_hover, grey } = useTheme();

  const categories = getCategories(t);
  const subcategories = useMemo(
    () =>
      isSpecialist(additionalInfo)
        ? [
            ...selectedCategories,
            ...(additionalInfo?.categories ?? []),
          ]?.flatMap((item) =>
            getSpecialistFilters(t)
              .filter((filter) => filter.category.value === item)
              .flatMap((item) => item.subcategories),
          )
        : [],
    [additionalInfo, selectedCategories, t],
  );

  const initialValues = useMemo(
    () =>
      isSpecialist(additionalInfo)
        ? {
            firstName: additionalInfo?.firstName ?? '',
            lastName: additionalInfo?.lastName ?? '',
            birthday: additionalInfo?.birthday ?? '',
            experience: additionalInfo?.experience ?? '',
            telegram: additionalInfo?.telegram ?? '',
            phone: additionalInfo?.whatsApp ?? '',
            categories: formattedCategoriesFromBackendToSelectFormat(
              categories,
              additionalInfo.categories,
            ),
            subcategories: formattedCategoriesFromBackendToSelectFormat(
              subcategories,
              additionalInfo.subcategories,
            ),
            extendedInfo: additionalInfo?.extendedInfo ?? '',
            zipCode: additionalInfo.zipCode,
            address: additionalInfo.address,
          }
        : {
            firstName: additionalInfo?.firstName ?? '',
            lastName: additionalInfo?.lastName ?? '',
          },
    [additionalInfo, categories, subcategories],
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
      birthday: yup
        .date()
        .required(t('validations.required'))
        .max(new Date(), t('validations.birthday')),
      experience: yup.number().required(t('validations.required')),
    }),
    onSubmit: async (userDetails) => {
      try {
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, {
          ...userDetails,
          categories: values.categories?.map((item) => item?.value) ?? null,
          subcategories:
            values.subcategories?.map((item) => item?.value) ?? null,
        });
        await uploadFile(fileUpload!);
      } catch (e) {
        /* empty */
      }
    },
  });

  const onChangeCategories = (options: MultiValue<Option>) => {
    setFieldValue('categories', options);
    setSelectedCategories(options.map((item) => item.value));
  };

  const onChangeSubcategories = (options: MultiValue<Option>) => {
    setFieldValue('subcategories', options);
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
      minHeight: 50,
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
              label={t('my_profile.last_name_input.label')}
              value={values.lastName}
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.lastName && !!touched.lastName}
              textError={errors.lastName}
              id="lastName"
            />
            <UiInput
              label={t('my_profile.first_name_input.label')}
              value={values.firstName}
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.firstName && !!touched.firstName}
              textError={errors.firstName}
              id="firstName"
            />
            <UiInput
              label={t('my_profile.birthday_input.label')}
              value={values.birthday}
              name="birthday"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.birthday && !!touched.birthday}
              textError={errors.birthday}
              id="birthday"
            />
            {additionalInfo?.type === UserRole.SPECIALIST && (
              <UiInput
                label={t('my_profile.work_input.label')}
                value={values.experience}
                name="experience"
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!errors.experience && !!touched.experience}
                textError={errors.experience}
                type="number"
                id="experience"
              />
            )}
            <UiInput
              label={t('my_profile.telegram_input.label')}
              value={values.telegram}
              name="telegram"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.telegram && !!touched.telegram}
              textError={errors.telegram}
              id="telegram"
            />
            <UiInput
              label={t('my_profile.phone_input.label')}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.phone && !!touched.phone}
              textError={errors.phone}
              id="phone"
              name="phone"
            />
            <UiInput
              label={t('my_profile.zip_code_input.label')}
              value={values.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.zipCode && !!touched.zipCode}
              textError={errors.zipCode}
              id="zipCode"
              name="zipCode"
            />
            <UiInput
              label={t('my_profile.address_input.label')}
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.address && !!touched.address}
              textError={errors.address}
              id="address"
              name="address"
            />
          </Row>
          {additionalInfo?.type === UserRole.SPECIALIST && (
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
                    primary25: light_grey,
                    primary50: light_grey,
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
                    primary25: light_grey,
                    primary50: light_grey,
                    primary,
                  },
                })}
                isDisabled={!values.categories?.length}
              />
            </SelectRow>
          )}
          {additionalInfo?.type === UserRole.SPECIALIST && (
            <TextAreaRow>
              <TextArea
                value={values.extendedInfo}
                onChange={handleChange}
                placeholder={t('my_profile.additional_information_textarea')}
                name="extendedInfo"
              />
            </TextAreaRow>
          )}
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
