export const getUserTypeOptions = (t: (key: string) => string) => {
  return [
    { value: 'client', label: t('SignUpForm.select.options.client') },
    { value: 'specialist', label: t('SignUpForm.select.options.specialist') },
  ];
};

export const getCategories = (t: (key: string) => string) => {
  return [
    { value: 'renovation', label: t('categories.renovation_and_construction') },
    { value: 'auto_services', label: t('categories.auto_services') },
    { value: 'cooks_services', label: t('categories.cooks_services') },
    {
      value: 'transportation_services',
      label: t('categories.transportation_services'),
    },
    { value: 'beauty_and_health', label: t('categories.beauty_and_health') },
    { value: 'fitness_and_sport', label: t('categories.fitness_and_sport') },
    { value: 'animal_services', label: t('categories.animal_services') },
    { value: 'domestic_staff', label: t('categories.domestic_staff') },
    {
      value: 'freelance_and_creative_services',
      label: t('categories.freelance_and_creative_services'),
    },
  ];
};

export const getChatAdminMenu = (t: (key: string) => string) => {
  return [
    { value: 'delete', label: t('chat_admin_panel.delete') },
    { value: 'recover', label: t('chat_admin_panel.recover') },
    { value: 'block', label: t('chat_admin_panel.block') },
    { value: 'unblock', label: t('chat_admin_panel.unblock') },
  ];
};

export const getCategoriesForHomePage = (t: (key: string) => string) => {
  return [
    {
      title: t('categories.renovation_and_construction'),
      imgPath: '/files/images/categories/renovation_and_construction.jpg',
    },
    {
      title: t('categories.auto_services'),
      imgPath: '/files/images/categories/auto_services.jpg',
    },
    {
      title: t('categories.cooks_services'),
      imgPath: '/files/images/categories/cooks_services.jpg',
    },
    {
      title: t('categories.transportation_services'),
      imgPath: '/files/images/categories/transportation_services.jpg',
    },
    {
      title: t('categories.beauty_and_health'),
      imgPath: '/files/images/categories/beauty_and_health.jpg',
    },
    {
      title: t('categories.animal_services'),
      imgPath: '/files/images/categories/animal_services.jpg',
    },
    {
      title: t('categories.fitness_and_sport'),
      imgPath: '/files/images/categories/fitness_and_sport.jpg',
    },
    {
      title: t('categories.domestic_staff'),
      imgPath: '/files/images/categories/domestic_staff.jpg',
    },
  ];
};

export const getChatRooms = (t: (key: string) => string) => {
  return [{ value: 'global_chat', label: t('chat_rooms.global_chat') }];
};

export const getSpecialistFilters = (t: (key: string) => string) => {
  return [
    {
      category: {
        value: 'renovation',
        label: t('categories.renovation_and_construction'),
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
          value: 'improvement_and_landscape_design',
          label: t('subcategories.improvement_and_landscape_design'),
        },
        {
          value: 'ventilation_and_air_conditioning',
          label: t('subcategories.ventilation_and_air_conditioning'),
        },
        {
          value: 'plasterboard',
          label: t('subcategories.plasterboard'),
        },
        {
          value: 'putty_and_painting',
          label: t('subcategories.putty_and_painting'),
        },
        {
          value: 'roofing_specialist',
          label: t('subcategories.roofing_specialist'),
        },
        {
          value: 'flooring_specialist',
          label: t('subcategories.flooring_specialist'),
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
        label: t('categories.auto_services'),
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
        value: 'cooks_services',
        label: t('categories.cooks_services'),
      },
      subcategories: [
        {
          value: 'homemade_food',
          label: t('subcategories.homemade_food'),
        },
        {
          value: 'cuisines_of_the_world',
          label: t('subcategories.cuisines_of_the_world'),
        },
        {
          value: 'cooking_with_departure',
          label: t('subcategories.cooking_with_departure'),
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
        value: 'beauty_and_health',
        label: t('categories.beauty_and_health'),
      },
      subcategories: [
        {
          value: 'makeup',
          label: t('subcategories.makeup'),
        },
        {
          value: 'manicure_and_pedicure',
          label: t('subcategories.manicure_and_pedicure'),
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
          value: 'tattoo_and_permanent_makeup',
          label: t('subcategories.tattoo_and_permanent_makeup'),
        },
        {
          value: 'solarium_and_tanning',
          label: t('subcategories.solarium_and_tanning'),
        },
        {
          value: 'training_and_consultations',
          label: t('subcategories.training_and_consultations'),
        },
      ],
    },
    {
      category: {
        value: 'fitness_and_sport',
        label: t('categories.fitness_and_sport'),
      },
      subcategories: [
        {
          value: 'fitness_and_training',
          label: t('subcategories.fitness_and_training'),
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
          value: 'equipment_and_clothing',
          label: t('subcategories.equipment_and_clothing'),
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
          value: 'matings_of_pets',
          label: t('subcategories.matings_of_pets'),
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
          value: 'overexposure_of_pets',
          label: t('subcategories.overexposure_of_pets'),
        },
        {
          value: 'aquaristics',
          label: t('subcategories.aquaristics'),
        },
      ],
    },
    {
      category: {
        value: 'domestic_staff',
        label: t('categories.domestic_staff'),
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
      ],
    },
    {
      category: {
        value: 'freelance_and_creative_services',
        label: t('categories.freelance_and_creative_services'),
      },
      subcategories: [
        {
          value: 'web_design',
          label: t('subcategories.web_design'),
        },
        {
          value: 'copywriting_and_editing',
          label: t('subcategories.copywriting_and_editing'),
        },
        {
          value: 'photo_and_video_shooting',
          label: t('subcategories.photo_and_video_shooting'),
        },
      ],
    },
  ];
};

export const getMonthName = (t: (key: string) => string, month: number) => {
  const months = [
    t('months.january'),
    t('months.february'),
    t('months.march'),
    t('months.april'),
    t('months.may'),
    t('months.june'),
    t('months.july'),
    t('months.august'),
    t('months.september'),
    t('months.october'),
    t('months.november'),
    t('months.december'),
  ];

  return months[month];
};

export const getQuestions = (t: (key: string) => string) => {
  return [
    {
      prompt: t('Support.questions.registation.prompt'),
      answer: t('Support.questions.registation.answer'),
    },
    {
      prompt: t('Support.questions.services.prompt'),
      answer: t('Support.questions.services.answer'),
    },
    {
      prompt: t('Support.questions.chat.prompt'),
      answer: t('Support.questions.chat.answer'),
    },
    {
      prompt: t('Support.questions.reviews.prompt'),
      answer: t('Support.questions.reviews.answer'),
    },
  ];
};
