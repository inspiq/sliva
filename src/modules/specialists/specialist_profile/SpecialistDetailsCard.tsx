import { ReactElement } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { ReviewDocument } from 'src/modules/specialists/specialist_profile/specialist_account/SpecialistProfile';
import { ChatIcon, Specialist } from 'src/shared';

const Avatar = styled(Image)`
  width: 150px;
  height: 180px;
  border-radius: 10px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.light};
`;

const SpecialistProfileLayout = styled.div`
  display: flex;
  align-self: flex-start;
  gap: 20px;
  margin: 40px 10px;
`;

const SpecialistListInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FullName = styled.div`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.w600};
`;

const City = styled.div`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w400};
`;

const Experience = styled.div`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w400};
`;

const Row = styled.div`
  display: flex;
  gap: 30px;
`;

const Rating = styled.div`
  font-size: 18px;
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

interface Props {
  specialist: Specialist;
  reviewsDocument?: ReviewDocument;
}

const SpecialistDataCardElement = (props: Props): ReactElement => {
  const { specialist, reviewsDocument } = props;
  const { avatarUrl, firstName, lastName, reviewDetails, experience, city } =
    specialist;

  return (
    <SpecialistProfileLayout>
      <Avatar
        src={avatarUrl ?? '/files/images/avatar.png'}
        width={100}
        height={100}
        alt="Avatar"
      />
      <SpecialistListInfo>
        <FullName>
          {firstName}
          {lastName}
        </FullName>
        <City>Область:{city}</City>
        <Experience>Стаж:{experience}</Experience>
        <Row>
          <Rating>{reviewDetails?.avgRating}</Rating>
          <ReviewsCount>
            <ChatIcon width={20} />
            {reviewsDocument?.reviews?.length} отзывов
          </ReviewsCount>
        </Row>
      </SpecialistListInfo>
    </SpecialistProfileLayout>
  );
};

export const SpecialistDetailsCard = SpecialistDataCardElement;
