import { doc, DocumentData, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import * as yup from 'yup';

import { UiButton, UiForm, UiInput } from 'src/components';
import { db } from 'src/firebase';
import { useAuthContext } from 'src/hooks';
import { devices } from 'src/utils';

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 250px));
  gap: 15px;

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
  gap: 20px;
`;

const UiButtonLayout = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
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

export const UserInfoForm = (props: {
  userMetaData: DocumentData;
  uploadFile: (fileUpload: File) => Promise<void>;
  fileUpload?: File;
}) => {
  const { userMetaData, uploadFile, fileUpload } = props;

  const t = useTranslations();
  const { currentUser } = useAuthContext();
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
      name: userMetaData.name ?? '',
      surname: userMetaData.surname ?? '',
      lastName: userMetaData.lastName ?? '',
      dayOfBirth: userMetaData.dayOfBirth ?? '',
      email: currentUser?.email ?? '',
      experience: userMetaData.experience ?? '',
      city: userMetaData.city ?? '',
      telegram: userMetaData.telegram ?? '',
      whatsApp: userMetaData.whatsApp ?? '',
    },
    validateOnMount: true,
    validationSchema: yup.object().shape({
      name: yup.string().required(t('validations.required')),
      surname: yup.string().required(t('validations.required')),
      lastName: yup.string().required(t('validations.required')),
      dayOfBirth: yup.string().required(t('validations.required')),
    }),
    onSubmit: async (metaData) => {
      if (!currentUser) return;

      try {
        const userDocRef = doc(db, 'users', currentUser?.uid);
        await updateDoc(userDocRef, { ...metaData });
        uploadFile(fileUpload!);
      } catch (e) {
        /* empty */
      }
    },
  });

  return (
    <StyledUiForm onSubmit={handleSubmit}>
      <Row>
        <UiInput
          placeholder="Фамилия"
          value={values.surname}
          name="surname"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.surname && !!touched.surname}
          textError={errors.surname}
        />
        <UiInput
          placeholder="Имя"
          value={values.name}
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.name && !!touched.name}
          textError={errors.name}
        />
        <UiInput
          placeholder="Отчество"
          value={values.lastName}
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.lastName && !!touched.lastName}
          textError={errors.lastName}
        />
        <UiInput
          placeholder="Дата рождения"
          value={values.dayOfBirth}
          name="dayOfBirth"
          type="date"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.dayOfBirth && !!touched.dayOfBirth}
          textError={errors.dayOfBirth}
        />
      </Row>
      <Row>
        <UiInput
          placeholder="Рабочий стаж"
          value={values.experience}
          name="experience"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.experience && !!touched.experience}
          textError={errors.experience}
          type="number"
        />
        <UiInput
          placeholder="Город"
          value={values.city}
          name="city"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.city && !!touched.city}
          textError={errors.city}
        />
        <UiInput
          placeholder="Телеграм"
          value={values.telegram}
          name="telegram"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.telegram && !!touched.telegram}
          textError={errors.telegram}
        />
        <UiInput
          placeholder="Вацап"
          value={values.whatsApp}
          name="whatsApp"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.whatsApp && !!touched.whatsApp}
          textError={errors.whatsApp}
        />
      </Row>
      <Row>
        <UiInput
          placeholder="Почта"
          value={values.email}
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.email && !!touched.email}
          textError={errors.email}
          isDisabled={true}
        />
      </Row>
      <TextAreaRow>
        <StyledTextArea placeholder="Дополнительная информация" />
      </TextAreaRow>
      <UiButtonLayout>
        <UiButton
          type="submit"
          size="big"
          isDisabled={isSubmitting}
          isStretching={false}
        >
          Сохранить
        </UiButton>
      </UiButtonLayout>
    </StyledUiForm>
  );
};
