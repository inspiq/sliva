import { ReactElement } from 'react';
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
  const t = useTranslations();
  const { currentUser } = useAuthContext();
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
      categories: userMetaData.categories ?? null,
      subcategories: userMetaData.subcategories ?? null,
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

  const onChangeCategories = (option: Option) => {
    setFieldValue('categories', option);
  };

  const onChangeSubcategories = (option: Option) => {
    setFieldValue('subcategories', option);
  };

  const categories = [
    { value: 'repair_and_construction', label: 'Ремонт и строительство' },
    { value: 'auto_services', label: 'Авто услуги' },
    { value: 'kitchen', label: 'Кухня' },
    { value: 'transport_services', label: 'Транспортные услуги' },
    { value: 'beauty_and_health', label: 'Красота и здоровье' },
    { value: 'services_for_animals', label: 'Услуги для животных' },
    { value: 'fitness_and_sports', label: 'Фитнес и спорт' },
    { value: 'household_staff', label: 'Домашний персонал' },
    {
      value: 'freelance_and_creative_services',
      label: 'Фриланс и креативные услуги',
    },
  ];
  const subcategories = [
    { value: 'laborer', label: 'Разнорабочий' },
    { value: 'electrician', label: 'Электрик' },
    { value: 'plumber', label: 'Сантехник' },
    {
      value: 'landscaping_and_design',
      label: 'Благоустройство и ландшафтный дизайн',
    },
    {
      value: 'ventilation_and_air_conditioning',
      label: 'Вентиляция и кондиционеры',
    },
    { value: 'finishing', label: 'Отделка' },
    { value: 'roofing', label: 'Кровля' },
    { value: 'flooring_master', label: 'Мастер напольных покрытий' },
    { value: 'carpenter', label: 'Столяр' },
    { value: 'mechanic', label: 'Механик' },
    { value: 'car_washer', label: 'Автомойщик' },
    { value: 'cook', label: 'Кулинар' },
    { value: 'on_site_cooking', label: 'Готовка с выездом' },
    { value: 'events', label: 'Мероприятия' },
    { value: 'moving', label: 'Переезд' },
    { value: 'delivery', label: 'Доставка' },
    { value: 'passenger_transport', label: 'Пассажирские перевозы' },
    { value: 'cargo_transportation', label: 'Грузоперевозки' },
    { value: 'makeup_artist', label: 'Визажист' },
    { value: 'cosmetology', label: 'Косметология' },
    { value: 'hairdresser_services', label: 'Парикмахерские услуги' },
    { value: 'spa_procedures', label: 'Спа процедуры' },
    { value: 'masseur', label: 'Массажист' },
    {
      value: 'tattoo_microblading_and_permanent_makeup',
      label: 'Тату татуаж и перманентный макияж',
    },
    { value: 'solarium', label: 'Солярий' },
    { value: 'fitness_trainer', label: 'Фитнес тренер' },
    { value: 'sports_equipment_rental', label: 'Прокат спорт инвентаря' },
    { value: 'equipment_and_clothing', label: 'Экипировка и одежда' },
    { value: 'sports_nutrition', label: 'Спортивное питание' },
    { value: 'veterinarian', label: 'Ветеринар' },
    { value: 'dog_walking', label: 'Выгул собак' },
    { value: 'animal_breeding', label: 'Вязка животных' },
    { value: 'animal_training', label: 'Дрессировка животных' },
    { value: 'pet_care', label: 'Уход за животными' },
    { value: 'pet_food', label: 'Корм для питомцев' },
    { value: 'animal_boarding', label: 'Передержка животных' },
    { value: 'aquaristics', label: 'Аквариумистика' },
    { value: 'domestic_workers', label: 'Домработники' },
    { value: 'caregivers', label: 'Сиделки' },
    { value: 'nannies', label: 'Няни' },
    { value: 'gardeners', label: 'Садовники' },
    { value: 'housekeepers', label: 'Горничные' },
    { value: 'cooks', label: 'Повара' },
    { value: 'personal_driver', label: 'Личный водитель' },
    { value: 'personal_security', label: 'Личный охранник' },
    { value: 'household_management', label: 'Управление домашним хозяйством' },
    { value: 'web_development', label: 'Веб-разработка' },
    { value: 'design', label: 'Дизайн' },
    { value: 'copywriting', label: 'Копирайтинг' },
    { value: 'operator', label: 'Оператор' },
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
          name="categories"
          options={categories}
          onChange={onChangeCategories as VoidFunction}
          value={values.categories}
          placeholder="Выберите категории"
        />
      </SelectRow>
      <SelectRow>
        <Select
          isMulti
          name="subcategories"
          onChange={onChangeSubcategories as VoidFunction}
          options={subcategories}
          value={values.subcategories}
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
