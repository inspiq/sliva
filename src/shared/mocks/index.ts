export const getUserTypeOptions = (t: (key: string) => string) => {
  return [
    { value: 'client', label: t('SignUpForm.select.options.client') },
    { value: 'specialist', label: t('SignUpForm.select.options.specialist') },
  ];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSubcategories = (t: (key: string) => string) => {
  return [
    { value: 'electrician', label: t('subcategories.electrician') },
    { value: 'plumber', label: t('subcategories.plumber') },
    { value: 'landscaping_and_design', label: t('subcategories.landscaping') },
    {
      value: 'ventilation_and_air_conditioning',
      label: t('subcategories.ventilation'),
    },
    { value: 'finishing', label: t('subcategories.finishing') },
    { value: 'roofing', label: t('subcategories.roofing') },
    { value: 'flooring_master', label: t('subcategories.flooring') },
    { value: 'carpenter', label: t('subcategories.carpentry') },
    { value: 'mechanic', label: t('subcategories.other') },
    { value: 'car_washer', label: t('subcategories.car_wash') },
    { value: 'cook', label: t('subcategories.cook') },
    {
      value: 'on_site_cooking',
      label: t('subcategories.cooking_with_delivery'),
    },
    { value: 'events', label: t('subcategories.events') },
    { value: 'moving', label: t('subcategories.moving') },
    { value: 'delivery', label: t('subcategories.delivery') },
    {
      value: 'passenger_transport',
      label: t('subcategories.passenger_transportation'),
    },
    {
      value: 'cargo_transportation',
      label: t('subcategories.cargo_transportation'),
    },
    { value: 'makeup_artist', label: t('subcategories.makeup') },
    { value: 'cosmetology', label: t('subcategories.aesthetic_cosmetology') },
    {
      value: 'hairdresser_services',
      label: t('subcategories.hairdressing_services'),
    },
    { value: 'spa_procedures', label: t('subcategories.spa_procedures') },
    { value: 'masseur', label: t('subcategories.massage') },
    {
      value: 'tattoo_microblading_and_permanent_makeup',
      label: t('subcategories.tattoo_permanent_makeup'),
    },
    { value: 'solarium', label: t('subcategories.tanning') },
    { value: 'fitness_trainer', label: t('subcategories.fitness_training') },
    {
      value: 'sports_equipment_rental',
      label: t('subcategories.sports_equipment_rental'),
    },
    {
      value: 'equipment_and_clothing',
      label: t('subcategories.equipment_clothing'),
    },
    { value: 'sports_nutrition', label: t('subcategories.healthy_food') },
    { value: 'veterinarian', label: t('subcategories.veterinary') },
    { value: 'dog_walking', label: t('subcategories.dog_walking') },
    { value: 'animal_breeding', label: t('subcategories.pet_breeding') },
    { value: 'animal_training', label: t('subcategories.pet_training') },
    { value: 'pet_care', label: t('subcategories.pet_care') },
    { value: 'pet_food', label: t('subcategories.pet_food') },
    { value: 'animal_boarding', label: t('subcategories.pet_boarding') },
    { value: 'aquaristics', label: t('subcategories.aquarium') },
    { value: 'domestic_workers', label: t('subcategories.housekeeper') },
    { value: 'caregivers', label: t('subcategories.caregiver') },
    { value: 'nannies', label: t('subcategories.nanny') },
    { value: 'gardeners', label: t('subcategories.gardener') },
    { value: 'housekeepers', label: t('subcategories.cleaner') },
    { value: 'cooks', label: t('subcategories.cook') },
    { value: 'personal_driver', label: t('subcategories.driver') },
    { value: 'personal_security', label: t('subcategories.security_guard') },
    {
      value: 'household_management',
      label: t('subcategories.household_management'),
    },
    { value: 'web_development', label: t('subcategories.web_design') },
    { value: 'design', label: t('subcategories.design') },
    { value: 'copywriting', label: t('subcategories.copywriting_editing') },
    { value: 'operator', label: t('subcategories.operator') },
    { value: 'laborer', label: t('subcategories.laborer') },
  ];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategories = (t: (key: string) => string) => {
  return [
    { value: 'renovation', label: t('categories.renovation') },
    { value: 'auto', label: t('categories.auto') },
    { value: 'kitchen', label: t('categories.kitchen') },
    {
      value: 'transportation_services',
      label: t('categories.transportation_services'),
    },
    { value: 'beauty_services', label: t('categories.beauty_services') },
    { value: 'fitness', label: t('categories.fitness') },
    { value: 'animal_services', label: t('categories.animal_services') },
    { value: 'home_staff', label: t('categories.home_staff') },
    {
      value: 'freelance_and_creative_services',
      label: t('categories.freelance_and_creative_services'),
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
    { value: 'British_Columbia_Kanada', label: 'British Columbia Kanada' },
    { value: 'Washington_DS', label: 'Washington DS' },
    { value: 'Virginia_VA', label: 'Virginia VA' },
    { value: 'Meriland_MD', label: 'Meriland MD' },
  ];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getChatRooms = (t: (key: string) => string) => {
  return [{ value: 'global_chat', label: t('chat_room.global_chat') }];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSpecialistFilters = (t: (key: string) => string) => {
  return [
    {
      category: {
        value: 'renovation',
        label: t('categories.renovation'),
      },
      subcategories: [
        {
          value: 'handyman',
          label: t('subcategories.handyman'),
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
        value: 'auto',
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
        value: 'transportation_services',
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
        value: 'beauty_services',
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
        value: 'fitness',
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
        value: 'animal_services',
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
