import { memo, ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { devices } from 'src/shared';

import { CategoryCard } from './CategoryCard';

export interface Category {
  title: string;
  imgPath: string;
}

const MainLayout = styled.div`
  margin: 20px 0 100px 0;
  gap: 30px;
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 290px));

  @media ${devices.tablet} {
    gap: 15px;
    grid-template-columns: repeat(3, minmax(100px, 400px));
  }

  @media ${devices.mobileL} {
    gap: 15px;
    grid-template-columns: repeat(2, minmax(100px, 290px));
  }
`;

const CategoriesPanelElement = memo((): ReactElement => {
  const t = useTranslations();
  const CATEGORIES = [
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

  return (
    <MainLayout>
      {CATEGORIES.map((category) => (
        <CategoryCard category={category} key={category.title} />
      ))}
    </MainLayout>
  );
});

CategoriesPanelElement.displayName = 'CategoriesPanelElement';

export const Categories = CategoriesPanelElement;
