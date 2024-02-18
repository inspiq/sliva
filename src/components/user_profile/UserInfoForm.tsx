import { ReactElement, useState } from 'react';
import Select from 'react-select';
import { doc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import * as yup from 'yup';

import { useAuthContext } from 'src/context';
import {
  db,
  devices,
  Option,
  Specialist,
  UiButton,
  UiForm,
  UiInput,
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
`;

const SelectRow = styled.div`
  width: 100%;
  height: auto;
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

interface Props {
  userMetaData: Specialist;
  uploadFile: (fileUpload: File) => Promise<void>;
  fileUpload?: File;
}

const UserInfoFormElement = (props: Props): ReactElement => {
  const { userMetaData, uploadFile, fileUpload } = props;
  const [categories, setCategories] = useState<Option[]>();
  const [subcategories, setSubcategories] = useState<Option[]>();
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

  const colourOptions = [
    { value: 'ocean', label: 'Разнорабочий' },
    { value: 'blue', label: 'Электрик' },
    { value: 'purple', label: 'Сантехник' },
    { value: 'red', label: 'Дизайн' },
    { value: 'orange', label: 'Вентиляция и кондиционеры' },
    { value: 'yellow', label: 'Гипсокартон шпатлевка и покраска' },
    { value: 'green', label: 'Кровля' },
    { value: 'forest', label: 'Терраса' },
    { value: 'slate', label: 'Столяр' },
    { value: 'silver', label: 'Ремонт' },
    { value: 'silver', label: 'Чистка салона' },
    { value: 'silver', label: 'Мойка автомобиля' },
    { value: 'silver', label: 'Продажа авто' },
    { value: 'silver', label: 'Аренда' },
    { value: 'silver', label: 'Запчасти' },
    { value: 'silver', label: 'Домашняя еда' },
    { value: 'silver', label: 'Кухни мира' },
    { value: 'silver', label: 'Готовка с выездом' },
    { value: 'silver', label: 'Мероприятия' },
    { value: 'silver', label: 'Переезд' },
    { value: 'silver', label: 'Доставка' },
    { value: 'silver', label: 'Пассажирские перевозки' },
    { value: 'silver', label: 'Грузоперевозки' },
    { value: 'silver', label: 'Тренировки и фитнес' },
    { value: 'silver', label: 'Персональный трене' },
    { value: 'silver', label: 'Прокат спорт инвентаря' },
    { value: 'silver', label: 'Экстремальные виды спорта' },
    { value: 'silver', label: 'Экипировка и одежда' },
    { value: 'silver', label: 'Спортивное питание' },
    { value: 'silver', label: 'Ветеринария' },
    { value: 'silver', label: 'Ветеринария' },
    { value: 'silver', label: 'Выгул собак' },
    { value: 'silver', label: 'Вязка животных' },
    { value: 'silver', label: 'Дрессировка животных' },
    { value: 'silver', label: 'Уход за животных' },
    { value: 'silver', label: 'Корм для ваших питомцев' },
    { value: 'silver', label: 'Передержка животных' },
  ];

  return (
    <StyledUiForm onSubmit={handleSubmit}>
      <Row>
        <UiInput
          placeholder={t('user_profile.surname_input')}
          value={values.surname}
          name="surname"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.surname && !!touched.surname}
          textError={errors.surname}
        />
        <UiInput
          placeholder={t('user_profile.name_input')}
          value={values.name}
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.name && !!touched.name}
          textError={errors.name}
        />
        <UiInput
          placeholder={t('user_profile.last_name_input')}
          value={values.lastName}
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.lastName && !!touched.lastName}
          textError={errors.lastName}
        />
        <UiInput
          placeholder={t('user_profile.birthday_input')}
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
          placeholder={t('user_profile.work_input')}
          value={values.experience}
          name="experience"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.experience && !!touched.experience}
          textError={errors.experience}
          type="number"
        />
        <UiInput
          placeholder={t('user_profile.city_input')}
          value={values.city}
          name="city"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.city && !!touched.city}
          textError={errors.city}
        />
        <UiInput
          placeholder={t('user_profile.telegram_input')}
          value={values.telegram}
          name="telegram"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.telegram && !!touched.telegram}
          textError={errors.telegram}
        />
        <UiInput
          placeholder={t('user_profile.whats_app_input')}
          value={values.whatsApp}
          name="whatsApp"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.whatsApp && !!touched.whatsApp}
          textError={errors.whatsApp}
        />
      </Row>
      <SelectRow>
        <Select
          isMulti
          name="colors"
          options={colourOptions}
          onChange={setCategories as VoidFunction}
          value={categories}
          placeholder="Выберите категории"
        />
      </SelectRow>
      <SelectRow>
        <Select
          isMulti
          name="colors2"
          onChange={setSubcategories as VoidFunction}
          options={colourOptions}
          value={subcategories}
          placeholder="Выберите подкатегории"
        />
      </SelectRow>
      <Row>
        <UiInput
          placeholder="Почта"
          value={values.email}
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.email && !!touched.email}
          textError={errors.email}
          disabled={true}
        />
      </Row>
      <TextAreaRow>
        <StyledTextArea
          placeholder={t('user_profile.additional_information_input')}
        />
      </TextAreaRow>
      <UiButtonLayout>
        <UiButton
          type="submit"
          size="big"
          disabled={isSubmitting}
          isStretching={false}
        >
          {t('user_profile.button')}
        </UiButton>
      </UiButtonLayout>
    </StyledUiForm>
  );
};

export const UserInfoForm = UserInfoFormElement;
