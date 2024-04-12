import { memo, type ReactElement } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import type { Category } from 'src/modules/home/categories/CategoriesPanel';
import { Link } from 'src/navigation';
import { devices } from 'src/shared';

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
  height: 225px;

  @media ${devices.mobileL} {
    height: 200px;
  }
`;

const CategoryInfoLayout = styled(Link)`
  display: flex;
  flex-direction: column;

  & > img:hover + h6 {
    color: ${({ theme }) => theme.primary};
  }
`;

export const CategoryCardElement = (props: {
  category: Category;
}): ReactElement => {
  const { imgPath, title } = props.category;

  return (
    <CategoryInfoLayout href="/specialists">
      <StyledImage src={imgPath} alt={title} width="290" height="225" />
      <Title>{title}</Title>
    </CategoryInfoLayout>
  );
};

export const CategoryCard = memo(CategoryCardElement);
