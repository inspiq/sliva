import { ReactElement } from 'react';
import Image from 'next/image';
import styled, { useTheme } from 'styled-components';

import { SpecialistAreasPanel } from 'src/modules/specialist_profile/specialist_areas/SpecialistAreasPanel';
import { Link } from 'src/navigation';
import { ChatIcon, devices, Line, Specialist, StarIcon } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;

  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 5px;
  }
`;

const Experience = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
`;

const Rating = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w500};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ReviewsCount = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w500};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SpecialistInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FullName = styled.div`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w600};
`;

const StyledLink = styled(Link)`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;

const LineLayout = styled.div`
  padding: 25px 0;
`;

const Avatar = styled(Image)`
  width: 110px;
  height: 130px;
  border-radius: 10px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.aqua};
`;

interface Props {
  specialist: Specialist;
}

const SpecialistDetailsElement = (props: Props): ReactElement => {
  const { specialist } = props;
  const {
    avatarUrl,
    userId,
    firstName,
    lastName,
    experience,
    reviewDetails,
    areas,
  } = specialist;
  const reviewsCount = reviewDetails?.count ?? 0;

  const { secondary } = useTheme();

  return (
    <MainLayout>
      <StyledLink href={`/specialists/${userId}`}>
        <Avatar
          src={avatarUrl ?? '/files/images/avatar.png'}
          width={50}
          height={50}
          alt="Avatar"
        />
        <SpecialistInfo>
          <FullName>
            {firstName} {lastName}
          </FullName>
          <Experience>Опыт работы: {experience} года</Experience>
          <Row>
            <Rating>
              <StarIcon color={secondary} width={18} />
              {reviewDetails?.avgRating ?? 0}
            </Rating>
            <ReviewsCount>
              <ChatIcon width={20} color={secondary} />
              {reviewsCount} отзывов
            </ReviewsCount>
          </Row>
        </SpecialistInfo>
      </StyledLink>
      <SpecialistAreasPanel areas={areas} />
      <LineLayout>
        <Line />
      </LineLayout>
    </MainLayout>
  );
};

export const SpecialistDetails = SpecialistDetailsElement;
