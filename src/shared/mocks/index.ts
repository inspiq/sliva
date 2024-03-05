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

export const getMainCategories = (t: (key: string) => string) => {
  return [
    {
      title: t('categories.renovation'),
      imgPath: '/files/images/categories/renovation.jpg',
    },
    {
      title: t('categories.auto'),
      imgPath: '/files/images/categories/auto.jpg',
    },
    {
      title: t('categories.kitchen'),
      imgPath: '/files/images/categories/kitchen.jpg',
    },
    {
      title: t('categories.transportation_services'),
      imgPath: '/files/images/categories/transportation_services.jpg',
    },
    {
      title: t('categories.beauty_services'),
      imgPath: '/files/images/categories/beauty_services.jpg',
    },
    {
      title: t('categories.animal_services'),
      imgPath: '/files/images/categories/animal_services.jpg',
    },
    {
      title: t('categories.fitness'),
      imgPath: '/files/images/categories/fitness.jpg',
    },
    {
      title: t('categories.home_staff'),
      imgPath: '/files/images/categories/home_staff.jpg',
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getChatRooms = (t: (key: string) => string) => {
  return [
    { value: 'global_chat', label: t('chat_room.global_chat') },
    { value: 'slesar_chat', label: t('chat_room.chat_for_locksmiths') },
  ];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSpecialistFilters = (t: (key: string) => string) => {
  return [
    {
      category: {
        value: 'repair_and_construction',
        label: t('categories.renovation'),
      },
      subcategories: [
        {
          value: 'laborer',
          label: t('subcategories.laborer'),
        },
        {
          value: 'electrician',
          label: t('subcategories.electrician'),
        },
        {
          value: 'plumber',
          label: t('subcategories.plumber'),
        },
        {
          value: 'landscaping',
          label: t('subcategories.landscaping'),
        },
        {
          value: 'ventilation',
          label: t('subcategories.ventilation'),
        },
        {
          value: 'drywall',
          label: t('subcategories.drywall'),
        },
        {
          value: 'painting',
          label: t('subcategories.painting'),
        },
        {
          value: 'roofing',
          label: t('subcategories.roofing'),
        },
        {
          value: 'flooring',
          label: t('subcategories.flooring'),
        },
        {
          value: 'carpentry',
          label: t('subcategories.carpentry'),
        },
        {
          value: 'other',
          label: t('subcategories.other'),
        },
      ],
    },
    {
      category: {
        value: 'auto_services',
        label: t('categories.auto'),
      },
      subcategories: [
        {
          value: 'repair',
          label: t('subcategories.repair'),
        },
        {
          value: 'interior_cleaning',
          label: t('subcategories.interior_cleaning'),
        },
        {
          value: 'car_wash',
          label: t('subcategories.car_wash'),
        },
      ],
    },
    {
      category: {
        value: 'kitchen',
        label: t('categories.kitchen'),
      },
      subcategories: [
        {
          value: 'home_cooked_meals',
          label: t('subcategories.home_cooked_meals'),
        },
        {
          value: 'world_cuisine',
          label: t('subcategories.world_cuisine'),
        },
        {
          value: 'cooking_with_delivery',
          label: t('subcategories.cooking_with_delivery'),
        },
        {
          value: 'events',
          label: t('subcategories.events'),
        },
        {
          value: 'banquets',
          label: t('subcategories.banquets'),
        },
      ],
    },
    {
      category: {
        value: 'Mooving',
        label: t('categories.transportation_services'),
      },
      subcategories: [
        {
          value: 'moving',
          label: t('subcategories.moving'),
        },
        {
          value: 'delivery',
          label: t('subcategories.delivery'),
        },
        {
          value: 'passenger_transportation',
          label: t('subcategories.passenger_transportation'),
        },
        {
          value: 'cargo_transportation',
          label: t('subcategories.cargo_transportation'),
        },
      ],
    },
    {
      category: {
        value: 'beauty_and_health',
        label: t('categories.beauty_services'),
      },
      subcategories: [
        {
          value: 'makeup',
          label: t('subcategories.makeup'),
        },
        {
          value: 'manicure_pedicure',
          label: t('subcategories.manicure_pedicure'),
        },
        {
          value: 'aesthetic_cosmetology',
          label: t('subcategories.aesthetic_cosmetology'),
        },
        {
          value: 'hairdressing_services',
          label: t('subcategories.hairdressing_services'),
        },
        {
          value: 'spa_procedures',
          label: t('subcategories.spa_procedures'),
        },
        {
          value: 'massage',
          label: t('subcategories.massage'),
        },
        {
          value: 'tattoo_permanent_makeup',
          label: t('subcategories.tattoo_permanent_makeup'),
        },
        {
          value: 'tanning',
          label: t('subcategories.tanning'),
        },
        {
          value: 'training_consultations',
          label: t('subcategories.training_consultations'),
        },
      ],
    },
    {
      category: {
        value: 'fitness_and_training',
        label: t('categories.fitness'),
      },
      subcategories: [
        {
          value: 'fitness_training',
          label: t('subcategories.fitness_training'),
        },
        {
          value: 'personal_trainer',
          label: t('subcategories.personal_trainer'),
        },
        {
          value: 'sports_equipment_rental',
          label: t('subcategories.sports_equipment_rental'),
        },
        {
          value: 'extreme_sports',
          label: t('subcategories.extreme_sports'),
        },
        {
          value: 'equipment_clothing',
          label: t('subcategories.equipment_clothing'),
        },
        {
          value: 'healthy_food',
          label: t('subcategories.healthy_food'),
        },
      ],
    },
    {
      category: {
        value: 'home_animals',
        label: t('categories.animal_services'),
      },
      subcategories: [
        {
          value: 'veterinary',
          label: t('subcategories.veterinary'),
        },
        {
          value: 'dog_walking',
          label: t('subcategories.dog_walking'),
        },
        {
          value: 'pet_breeding',
          label: t('subcategories.pet_breeding'),
        },
        {
          value: 'pet_training',
          label: t('subcategories.pet_training'),
        },
        {
          value: 'pet_care',
          label: t('subcategories.pet_care'),
        },
        {
          value: 'pet_food',
          label: t('subcategories.pet_food'),
        },
        {
          value: 'pet_boarding',
          label: t('subcategories.pet_boarding'),
        },
        {
          value: 'aquarium',
          label: t('subcategories.aquarium'),
        },
      ],
    },
    {
      category: {
        value: 'home_staff',
        label: t('categories.home_staff'),
      },
      subcategories: [
        {
          value: 'housekeeper',
          label: t('subcategories.housekeeper'),
        },
        {
          value: 'caregiver',
          label: t('subcategories.caregiver'),
        },
        {
          value: 'household_helper',
          label: t('subcategories.household_helper'),
        },
        {
          value: 'nanny',
          label: t('subcategories.nanny'),
        },
        {
          value: 'gardener',
          label: t('subcategories.gardener'),
        },
        {
          value: 'cleaner',
          label: t('subcategories.cleaner'),
        },
        {
          value: 'cook',
          label: t('subcategories.cook'),
        },
        {
          value: 'culinary_specialist',
          label: t('subcategories.culinary_specialist'),
        },
        {
          value: 'driver',
          label: t('subcategories.driver'),
        },
        {
          value: 'personal_assistant',
          label: t('subcategories.personal_assistant'),
        },
        {
          value: 'security_guard',
          label: t('subcategories.security_guard'),
        },
        {
          value: 'household_management',
          label: t('subcategories.household_management'),
        },
      ],
    },
    {
      category: {
        value: 'freelance_and_creative_services',
        label: t('categories.freelance_and_creative_services'),
      },
      subcategories: [
        { value: 'web_design', label: t('subcategories.web_design') },
        {
          value: 'copywriting_editing',
          label: t('subcategories.copywriting_editing'),
        },
        {
          value: 'photography_videography',
          label: t('subcategories.photography_videography'),
        },
      ],
    },
  ];
};

export const getMonthName = (month: number) => {
  const months = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ];

  return months[month];
};
