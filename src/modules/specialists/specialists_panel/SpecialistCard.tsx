import { memo, ReactElement } from 'react';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';

import { Link } from 'src/navigation';
import {
  ChatIcon,
  DEFAULT_AVATAR_URL,
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
  flex-direction: row;
  gap: 15px;
  white-space: pre-line;

  @media ${devices.mobileL} {
    gap: 10px;
  }
`;

const RowDetail = styled.div<{ $isNotSpecified?: boolean }>`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.secondary};

  & > span {
    color: ${({ theme, $isNotSpecified }) =>
      $isNotSpecified ? theme.secondary : theme.grey};
  }
`;

const RatingCount = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w600};
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
  width: 130px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.aqua};
`;

const ExtendedInfoTitle = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 10px;
`;

const ExtendedInfoLayout = styled.div`
  margin-top: 15px;
`;

const ExtendedInfo = styled.div<{ $isNotSpecified: boolean }>`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.secondary};
  white-space: pre-line;

  & > span {
    color: ${({ theme, $isNotSpecified }) =>
      $isNotSpecified ? theme.secondary : theme.grey};
  }
`;

interface Props {
  specialist?: Specialist;
  isLoading?: boolean;
  showExtendedInfo?: boolean;
}

const SpecialistCardElement = (props: Props): ReactElement => {
  const { specialist, isLoading, showExtendedInfo = false } = props;

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
    phone,
    extendedInfo,
  } = specialist ?? {};
  const reviewsCount = reviewDetails?.count ?? DEFAULT_REVIEWS_COUNT;
  const currentExperience = experience
    ? t('SpecialistCard.experience.info', {
        experience,
      })
    : t('SpecialistCard.experience.no_info');
  const currentExtendedInfo =
    extendedInfo ?? t('SpecialistCard.extended_info.no_info');
  const currentPhone = phone ?? t('SpecialistCard.phone.no_info');

  return (
    <MainLayout>
      <StyledLink href={`/specialists/${userId}`}>
        {isLoading ? (
          <Skeleton width={130} height={150} borderRadius={10} />
        ) : (
          <Avatar
            src={avatarUrl ?? DEFAULT_AVATAR_URL}
            width={130}
            height={150}
            alt={t('alts.avatar')}
          />
        )}
        <SpecialistDetails>
          <FullName>
            {isLoading ? <Skeleton /> : `${lastName} ${firstName}`}
          </FullName>
          {isLoading ? (
            <Skeleton />
          ) : (
            showExtendedInfo && (
              <RowDetail $isNotSpecified={!!phone}>
                {t('SpecialistCard.phone.title')}
                <span> {currentPhone}</span>
              </RowDetail>
            )
          )}
          <RowDetail $isNotSpecified={!!experience}>
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
              t('SpecialistCard.address', { address })
            )}
          </RowDetail>
          <RowDetail>
            {isLoading ? (
              <Skeleton />
            ) : (
              t('SpecialistCard.zip_code', { zipCode })
            )}
          </RowDetail>
          <Row>
            {isLoading ? (
              <Skeleton width={200} />
            ) : (
              <>
                <RatingCount>
                  <StarIcon width={18} strokeWidth={2.5} stroke={secondary} />
                  {reviewDetails?.avgRating ?? DEFAULT_AVG_RATING}
                </RatingCount>
                <ReviewsCount>
                  <ChatIcon width={20} color={secondary} />
                  {t('SpecialistCard.reviews.info', { reviewsCount })}
                </ReviewsCount>
              </>
            )}
          </Row>
          {!showExtendedInfo && (
            <Service>
              {isLoading ? <Skeleton /> : t('SpecialistCard.services')}
            </Service>
          )}
        </SpecialistDetails>
      </StyledLink>
      {showExtendedInfo && (
        <ExtendedInfoLayout>
          {isLoading ? (
            <Skeleton />
          ) : (
            <ExtendedInfoTitle>
              {t('SpecialistCard.extended_info.title')}
            </ExtendedInfoTitle>
          )}
          {isLoading ? (
            <Skeleton />
          ) : (
            <ExtendedInfo $isNotSpecified={!!extendedInfo}>
              <span>{currentExtendedInfo}</span>
            </ExtendedInfo>
          )}
        </ExtendedInfoLayout>
      )}
      <LineLayout>
        <Line />
      </LineLayout>
    </MainLayout>
  );
};

export const SpecialistCard = memo(SpecialistCardElement);
