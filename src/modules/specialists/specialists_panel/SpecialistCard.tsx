import { ReactElement } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { Link } from 'src/navigation';
import { ChatIcon, devices, Line, Specialist } from 'src/shared';

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

const City = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
`;

const StyledLink = styled(Link)`
  display: flex;
  gap: 20px;
`;

const LineLayout = styled.div`
  padding: 25px 0;
`;

const Avatar = styled(Image)`
  width: 110px;
  height: 130px;
  border-radius: 10px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.light};
`;

interface Props {
  specialist: Specialist;
}

const SpecialistCardElement = (props: Props): ReactElement => {
  const {
    avatarUrl,
    userId,
    firstName,
    lastName,
    city,
    experience,
    reviewDetails,
  } = props.specialist;

  return (
    <>
      <StyledLink href={`/specialists/${userId}`}>
        <Avatar
          src={avatarUrl ?? '/files/images/avatar.png'}
          width={100}
          height={100}
          alt="Avatar"
        />
        <SpecialistInfo>
          <FullName>
            {firstName} {lastName}
          </FullName>
          <City>Область: {city}</City>
          <Experience>
            Стаж: {experience ? `${experience} года` : 'Не указан'}
          </Experience>
          <Row>
            <Rating>
              {reviewDetails ? reviewDetails.avgRating : 'Не указан'}
            </Rating>
            <ReviewsCount>
              <ChatIcon width={20} />
              {reviewDetails ? reviewDetails.count : 0} отзывов
            </ReviewsCount>
          </Row>
        </SpecialistInfo>
      </StyledLink>
      <LineLayout>
        <Line />
      </LineLayout>
    </>
  );
};

export const SpecialistCard = SpecialistCardElement;