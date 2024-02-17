import { ReactElement } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { devices } from 'src/shared';

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

const Title = styled.h6`
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  font-weight: ${({ theme }) => theme.w600};
  margin-top: 10px;
  padding-left: 10px;
  transition: color 0.3s;

  @media ${devices.mobileL} {
    margin-top: 5px;
    font-size: 15px;
    padding-left: 5px;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
  cursor: pointer;
  object-fit: cover;
  width: 100%;
  height: 220px;
`;

const CategoryInfoLayout = styled.div`
  display: flex;
  flex-direction: column;

  & > ${StyledImage}:hover + ${Title} {
    color: ${({ theme }) => theme.primary};
  }
`;

const CategoriesElement = (): ReactElement => {
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
        <CategoryInfoLayout key={category.title}>
          <StyledImage
            src={category.imgPath}
            alt={category.title}
            width="290"
            height="225"
          />
          <Title>{category.title}</Title>
        </CategoryInfoLayout>
      ))}
    </MainLayout>
  );
};

export const Categories = CategoriesElement;
