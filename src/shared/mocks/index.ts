export const getUserTypeOptions = (t: (key: string) => string) => {
  return [
    { value: 'client', label: t('SignUpForm.select.options.client') },
    { value: 'specialist', label: t('SignUpForm.select.options.specialist') },
  ];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSubcategories = (t: (key: string) => string) => {
  return [
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
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategories = (t: (key: string) => string) => {
  return [
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
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAreas = (t: (key: string) => string) => {
  return [
    { value: 'Izhevsk', label: 'Ижевск' },
    { value: 'Arkansas', label: 'Арканзас' },
    { value: 'Texas', label: 'Техас' },
    { value: 'Boston', label: 'Бостон' },
    { value: 'Florida', label: 'Флорида' },
    { value: 'Seattle', label: 'Сиэтл' },
    { value: 'Dortmund', label: 'Дортмунд' },
    { value: 'Catalonia', label: 'Каталония' },
  ];
};
