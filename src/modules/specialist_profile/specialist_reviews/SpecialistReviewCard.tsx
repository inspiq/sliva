import { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { Review } from 'src/modules/specialist_profile/SpecialistProfile';
import { Avatar, getDayAndYear, getInitials, Line } from 'src/shared';
import { RateChip } from 'src/shared/components/chips/RateChip';

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
  margin-top: 15px;
`;

const TextComment = styled.div`
  word-wrap: break-word;
  font-weight: ${({ theme }) => theme.w400};
  font-size: 15px;
  color: ${({ theme }) => theme.secondary};
  font-weight: ${({ theme }) => theme.w400};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpecialistReviewCardElement = (props: {
  review: Review;
}): ReactElement => {
  const { review } = props;
  const { userInfo, text, rating, date } = review;

  return (
    <>
      <Line />
      <MainLayout>
        <ReviewHeader>
          <UserDetailsLayout>
            <Avatar width={35} height={35} avatarUrl={userInfo.avatarUrl} />
            <Column>
              <UserInitials>
                {getInitials({
                  firstName: userInfo?.firstName,
                  lastName: userInfo?.lastName,
                })}
              </UserInitials>
              <Date>{getDayAndYear(date)}</Date>
            </Column>
          </UserDetailsLayout>
          <RateReviewLayout>
            <RateChip isDisabled selectedRating={rating} />
          </RateReviewLayout>
        </ReviewHeader>
        <CommentDetailsLayout>
          <TextComment>{text}</TextComment>
        </CommentDetailsLayout>
      </MainLayout>
    </>
  );
};

export const SpecialistReviewCard = memo(SpecialistReviewCardElement);
