import { memo, type ReactElement } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import type { Review } from 'src/modules/specialist_profile/SpecialistProfile';
import {
  Avatar,
  DEFAULT_AVATAR_URL,
  DEFAULT_AVG_RATING,
  getDayAndYear,
  getInitials,
  Line,
  RateChip,
} from 'src/shared';

const MainLayout = styled.div`
  padding: 15px 20px;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const RateReviewLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserInitials = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.secondary};
  font-weight: ${({ theme }) => theme.w500};
`;

const Date = styled.div`
  padding-bottom: 3px;
  color: ${({ theme }) => theme.grey};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
`;

const UserDetailsLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  align-items: center;
`;

const CommentDetailsLayout = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TextComment = styled.div`
  word-wrap: break-word;
  font-weight: ${({ theme }) => theme.w400};
  font-size: 15px;
  color: ${({ theme }) => theme.secondary};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
  font-size: 15px;
`;

interface Props {
  review?: Review;
  isLoading?: boolean;
}

const SpecialistReviewCardElement = (props: Props): ReactElement => {
  const { review, isLoading } = props;
  const { user, text, rating, date } = review ?? {};
  const t = useTranslations();

  return (
    <div>
      <Line />
      <MainLayout>
        <ReviewHeader>
          <UserDetailsLayout>
            {isLoading ? (
              <Skeleton width={35} height={35} borderRadius={50} />
            ) : (
              <Avatar
                width={35}
                height={35}
                avatarUrl={user?.avatarUrl ?? DEFAULT_AVATAR_URL}
              />
            )}
            <Column>
              {isLoading ? (
                <Skeleton width={110} />
              ) : (
                <UserInitials>
                  {getInitials({
                    firstName: user?.firstName ?? '',
                    lastName: user?.lastName ?? '',
                  })}
                </UserInitials>
              )}
              {isLoading ? (
                <Skeleton width={110} />
              ) : (
                <Date>{getDayAndYear(t, date)}</Date>
              )}
            </Column>
          </UserDetailsLayout>
          <RateReviewLayout>
            <RateChip
              isDisabled
              selectedRating={rating ?? DEFAULT_AVG_RATING}
            />
          </RateReviewLayout>
        </ReviewHeader>
        <CommentDetailsLayout>
          {isLoading ? (
            <Skeleton />
          ) : (
            <Title>{t('SpecialistReviewCard.title')}</Title>
          )}
          {isLoading ? (
            <Skeleton height={100} />
          ) : (
            <TextComment>{text}</TextComment>
          )}
        </CommentDetailsLayout>
      </MainLayout>
    </div>
  );
};

export const SpecialistReviewCard = memo(SpecialistReviewCardElement);
