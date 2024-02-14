import Image from 'next/image';
import styled from 'styled-components';

import { devices } from 'src/utils';

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
  color: ${({ theme }) => theme.black};
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
  height: 100%;
`;

const CategoryInfoLayout = styled.div`
  display: flex;
  flex-direction: column;

  & > ${StyledImage}:hover + ${Title} {
    color: ${({ theme }) => theme.primary};
  }
`;

export const Categories = () => {
  const CATEGORIES = [
    { title: 'Мастер по ремонту', imgPath: '/images/plumbing.jpg' },
    { title: 'Автомеханик', imgPath: '/images/car-mechanic.jpg' },
    { title: 'Кулинария', imgPath: '/images/cooking.jpg' },
    { title: 'Мувинг', imgPath: '/images/transportation.jpg' },
    { title: 'Мастер красоты', imgPath: '/images/beautiful.jpeg' },
    { title: 'Фитнес', imgPath: '/images/fitness.jpeg' },
    { title: 'Домашние животные', imgPath: '/images/home-pets.jpg' },
    { title: 'Домашний персонал', imgPath: '/images/cleaning.jpg' },
  ];

  return (
    <MainLayout>
      {CATEGORIES.map((category) => (
        <CategoryInfoLayout key={category.title}>
          <StyledImage
            src={category.imgPath}
            alt={category.title}
            width="290"
            height="218"
          />
          <Title>{category.title}</Title>
        </CategoryInfoLayout>
      ))}
    </MainLayout>
  );
};
