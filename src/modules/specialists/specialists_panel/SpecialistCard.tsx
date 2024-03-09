import { memo, ReactElement } from 'react';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';

import { Link } from 'src/navigation';
import {
  ChatIcon,
  DEFAULT_AVG_RATING,
  DEFAULT_REVIEWS_COUNT,
  devices,
  Line,
  Specialist,
  StarIcon,
} from 'src/shared';

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

const Experience = styled.div<{ $hasExperience: boolean }>`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.secondary};

  & > span {
    color: ${({ theme, $hasExperience }) =>
      $hasExperience ? theme.secondary : theme.grey};
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
  specialist?: Specialist;
  isLoading?: boolean;
}

const SpecialistCardElement = (props: Props): ReactElement => {
  const { specialist, isLoading } = props;

  const { secondary } = useTheme();
  const t = useTranslations();

  const reviewsCount =
    specialist?.reviewDetails?.count ?? DEFAULT_REVIEWS_COUNT;
  const experience = specialist?.experience
    ? t('SpecialistCard.experience.info', {
        experience: specialist?.experience,
      })
    : t('SpecialistCard.experience.no_info');

  return (
    <MainLayout>
      <StyledLink href={`/specialists/${specialist?.userId}`}>
        {isLoading ? (
          <Skeleton width={120} height={130} />
        ) : (
          <Avatar
            src={specialist?.avatarUrl ?? '/files/images/avatar.png'}
            width={120}
            height={130}
            alt={t('alts.avatar')}
          />
        )}
        <SpecialistInfo>
          <FullName>
            {isLoading ? (
              <Skeleton />
            ) : (
              `${specialist?.lastName} ${specialist?.firstName}`
            )}
          </FullName>
          <Experience $hasExperience={!!specialist?.experience}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                {t('SpecialistCard.experience.title')}
                <span> {experience}</span>
              </>
            )}
          </Experience>
          <Row>
            {isLoading ? (
              <Skeleton width={200} height={24} />
            ) : (
              <>
                <Rating>
                  <StarIcon color={secondary} width={18} />
                  {specialist?.reviewDetails?.avgRating ?? DEFAULT_AVG_RATING}
                </Rating>
                <ReviewsCount>
                  <ChatIcon width={20} color={secondary} />
                  {t('SpecialistCard.reviews.info', { reviewsCount })}
                </ReviewsCount>
              </>
            )}
          </Row>
          <Service>
            {isLoading ? (
              <Skeleton />
            ) : (
              t('SpecialistCard.details.title', { reviewsCount })
            )}
          </Service>
          <Service>
            {isLoading ? <Skeleton /> : t('SpecialistCard.details.title_two')}
          </Service>
        </SpecialistInfo>
      </StyledLink>
      <LineLayout>
        <Line />
      </LineLayout>
    </MainLayout>
  );
};

export const SpecialistCard = memo(SpecialistCardElement);
