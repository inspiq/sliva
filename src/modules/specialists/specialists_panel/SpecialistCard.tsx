import { memo, ReactElement } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
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
  gap: 15px;

  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 5px;
  }
`;

const Experience = styled.div<{ hasExperience: boolean }>`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.secondary};

  & > span {
    color: ${({ theme, hasExperience }) =>
      hasExperience ? theme.secondary : theme.grey};
  }
`;

const Rating = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w500};
  color: ${({ theme }) => theme.secondary};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ReviewsCount = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w500};
  color: ${({ theme }) => theme.secondary};
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
  color: ${({ theme }) => theme.secondary};
`;

const Service = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w500};
  text-decoration: underline;
  color: ${({ theme }) => theme.secondary};
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
  width: 120px;
  height: 130px;
  border-radius: 10px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.aqua};
`;

interface Props {
  specialist: Specialist;
}

const SpecialistCardElement = (props: Props): ReactElement => {
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
  const t = useTranslations('SpecialistCard');

  return (
    <MainLayout>
      <StyledLink href={`/specialists/${userId}`}>
        <Avatar
          src={avatarUrl ?? '/files/images/avatar.png'}
          width={120}
          height={130}
          alt={t('alts.avatar')}
        />
        <SpecialistInfo>
          <FullName>
            {firstName} {lastName}
          </FullName>
          <Experience hasExperience={!!experience}>
            {t('experience.title')}
            <span>
              {' '}
              {experience
                ? t('experience.info', { experience })
                : t('experience.no_info')}
            </span>
          </Experience>
          <Row>
            <Rating>
              <StarIcon color={secondary} width={18} />
              {reviewDetails?.avgRating ?? 0}
            </Rating>
            <ReviewsCount>
              <ChatIcon width={20} color={secondary} />
              {t('reviews.info', { reviewsCount })}
            </ReviewsCount>
          </Row>
          <Service>{t('details.title', { reviewsCount })}</Service>
          <Service>{t('details.title_two')}</Service>
        </SpecialistInfo>
      </StyledLink>
      <SpecialistAreasPanel areas={areas} />
      <LineLayout>
        <Line />
      </LineLayout>
    </MainLayout>
  );
};

export const SpecialistCard = memo(SpecialistCardElement);
