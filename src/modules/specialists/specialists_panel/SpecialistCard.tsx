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
  type Specialist,
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

const RowDetail = styled.div<{ $hasExperience?: boolean }>`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.secondary};

  & > span {
    color: ${({ theme, $hasExperience }) =>
      $hasExperience ? theme.secondary : theme.grey};
  }
`;

const RatingCount = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w500};
  color: ${({ theme }) => theme.secondary};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ReviewsCount = styled(RatingCount)``;

const SpecialistDetails = styled.div`
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
  width: 140px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.aqua};
`;

interface Props {
  specialist?: Specialist;
  isLoading?: boolean;
  isProfileDetails?: boolean;
}

const SpecialistCardElement = (props: Props): ReactElement => {
  const { specialist, isLoading, isProfileDetails } = props;

  const { secondary } = useTheme();
  const t = useTranslations();

  const {
    experience,
    avatarUrl,
    userId,
    reviewDetails,
    lastName,
    firstName,
    address,
    zipCode,
  } = specialist ?? {};
  const reviewsCount = reviewDetails?.count ?? DEFAULT_REVIEWS_COUNT;
  const currentExperience = experience
    ? t('SpecialistCard.experience.info', {
        experience,
      })
    : t('SpecialistCard.experience.no_info');

  return (
    <MainLayout>
      <StyledLink href={`/specialists/${userId}`}>
        {isLoading ? (
          <Skeleton width={120} height={130} borderRadius={10} />
        ) : (
          <Avatar
            src={avatarUrl ?? '/files/images/avatar.png'}
            width={140}
            height={150}
            alt={t('alts.avatar')}
          />
        )}
        <SpecialistDetails>
          <FullName>
            {isLoading ? <Skeleton /> : `${lastName} ${firstName}`}
          </FullName>
          <RowDetail $hasExperience={!!experience}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                {t('SpecialistCard.experience.title')}
                <span> {currentExperience}</span>
              </>
            )}
          </RowDetail>
          <RowDetail>
            {isLoading ? (
              <Skeleton />
            ) : (
              t('SpecialistCard.details.address', { address })
            )}
          </RowDetail>
          <RowDetail>
            {isLoading ? (
              <Skeleton />
            ) : (
              t('SpecialistCard.details.zip_code', { zipCode })
            )}
          </RowDetail>
          <Row>
            {isLoading ? (
              <Skeleton width={200} />
            ) : (
              <>
                <RatingCount>
                  <StarIcon color={secondary} width={18} />
                  {reviewDetails?.avgRating ?? DEFAULT_AVG_RATING}
                </RatingCount>
                <ReviewsCount>
                  <ChatIcon width={20} color={secondary} />
                  {t('SpecialistCard.reviews.info', { reviewsCount })}
                </ReviewsCount>
              </>
            )}
          </Row>
          {!isProfileDetails && (
            <>
              <Service>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  t('SpecialistCard.details.title', { reviewsCount })
                )}
              </Service>
              <Service>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  t('SpecialistCard.details.title_two')
                )}
              </Service>
            </>
          )}
        </SpecialistDetails>
      </StyledLink>
      <LineLayout>
        <Line />
      </LineLayout>
    </MainLayout>
  );
};

export const SpecialistCard = memo(SpecialistCardElement);
