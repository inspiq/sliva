import { ReactElement, useMemo, useState } from 'react';
import Select, { MultiValue, StylesConfig } from 'react-select';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';
import * as yup from 'yup';

import { UploadAvatar } from 'src/components/personal_info/UploadAvatar';
import {
  db,
  devices,
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
  grid-template-columns: 1fr 1fr;
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

const PersonalInfoFormElement = (props: {
  currentAuthUser: UserWithAdditionalInfo;
}): ReactElement => {
  const { currentAuthUser } = props;
  const { additionalInfo, uid, email } = currentAuthUser;

  const [fileUpload, setFileUpload] = useState<File>();
  const t = useTranslations();
  const { primary, light, border_ui, border_ui_hover } = useTheme();
  const initialValues = useMemo(
    () =>
      isSpecialist(additionalInfo)
        ? {
            firstName: additionalInfo?.firstName ?? '',
            lastName: additionalInfo?.lastName ?? '',
            dayOfBirth: additionalInfo?.dayOfBirth ?? '',
            email: additionalInfo?.email ?? '',
            experience: additionalInfo?.experience ?? '',
            city: additionalInfo?.city ?? '',
            telegram: additionalInfo?.telegram ?? '',
            whatsApp: additionalInfo?.whatsApp ?? '',
            categories: additionalInfo?.categories ?? null,
            subcategories: additionalInfo?.subcategories ?? null,
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

  const onChangeCategories = (options: MultiValue<Option>) => {
    setFieldValue('categories', options);
  };

  const onChangeSubcategories = (options: MultiValue<Option>) => {
    setFieldValue('subcategories', options);
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
  };

  return (
    <>
      <Title>{t('personal_info.title')}</Title>
      <FormLayout>
        <UploadAvatar
          fileUpload={fileUpload}
          setFileUpload={setFileUpload}
          additionalInfo={additionalInfo}
        />
        <StyledUiForm onSubmit={handleSubmit}>
          <Row>
            <UiInput
              placeholder={t('personal_info.last_name_input')}
              value={values.lastName}
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.lastName && !!touched.lastName}
              textError={errors.lastName}
            />
            <UiInput
              placeholder={t('personal_info.first_name_input')}
              value={values.firstName}
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.firstName && !!touched.firstName}
              textError={errors.firstName}
            />
            <UiInput
              placeholder={t('personal_info.birthday_input')}
              value={values.dayOfBirth}
              name="dayOfBirth"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.dayOfBirth && !!touched.dayOfBirth}
              textError={errors.dayOfBirth}
            />
            <UiInput
              placeholder={t('personal_info.work_input')}
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
              placeholder={t('personal_info.city_input')}
              value={values.city}
              name="city"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.city && !!touched.city}
              textError={errors.city}
            />
            <UiInput
              placeholder={t('personal_info.telegram_input')}
              value={values.telegram}
              name="telegram"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.telegram && !!touched.telegram}
              textError={errors.telegram}
            />
            <UiInput
              placeholder={t('personal_info.whats_app_input')}
              value={values.whatsApp}
              name="whatsApp"
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.whatsApp && !!touched.whatsApp}
              textError={errors.whatsApp}
            />
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
          <SelectRow>
            <Select
              isMulti
              name="categories"
              options={categories}
              onChange={(selectedOptions) =>
                onChangeCategories(selectedOptions as MultiValue<Option>)
              }
              value={values.categories}
              placeholder="Выберите категории"
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
              placeholder="Выберите подкатегории"
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
              placeholder={t('personal_info.additional_information_textarea')}
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
              {t('personal_info.button')}
            </UiButton>
          </UiButtonLayout>
        </StyledUiForm>
      </FormLayout>
    </>
  );
};

export const PersonalInfoForm = PersonalInfoFormElement;
