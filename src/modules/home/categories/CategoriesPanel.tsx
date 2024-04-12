import type { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { CategoryCard } from 'src/modules/home/categories/CategoryCard';
import { devices, getCategoriesForHomePage } from 'src/shared';

const MainLayout = styled.div`
  margin-bottom: 100px;
  gap: 30px 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 290px));

  @media ${devices.tablet} {
    grid-template-columns: repeat(3, minmax(100px, 400px));
    gap: 15px;
  }

  @media ${devices.mobileL} {
    margin-bottom: 80px;
    grid-template-columns: repeat(2, minmax(100px, 290px));
    gap: 15px;
  }
`;

export interface Category {
  title: string;
  imgPath: string;
}

const CategoriesPanelElement = (): ReactElement => {
  const t = useTranslations();
  const mainCategories = getCategoriesForHomePage(t);

  return (
    <MainLayout>
      {mainCategories.map((category) => (
        <CategoryCard category={category} key={category.title} />
      ))}
    </MainLayout>
  );
};

export const Categories = CategoriesPanelElement;
