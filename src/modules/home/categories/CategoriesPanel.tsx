import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { devices, getMainCategories } from 'src/shared';

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
    margin: 20px 0 50px 0;
    gap: 15px;
    grid-template-columns: repeat(2, minmax(100px, 290px));
  }
`;

const CategoriesPanelElement = (): ReactElement => {
  const t = useTranslations();
  const mainCategories = getMainCategories(t);

  return (
    <MainLayout>
      {mainCategories.map((category) => (
        <CategoryCard category={category} key={category.title} />
      ))}
    </MainLayout>
  );
};

export const Categories = CategoriesPanelElement;
