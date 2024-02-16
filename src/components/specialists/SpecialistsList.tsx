import { Fragment, useCallback, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import styled, { useTheme } from 'styled-components';

import { Line, Loader } from 'src/components';
import { Link } from 'src/navigation';
import { ChatIcon, db, devices, StarIcon } from 'src/shared';
import { Specialist } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0;
`;

const SpecialistCardLayout = styled(Link)`
  display: flex;
  gap: 20px;
`;

const LineLayout = styled.div`
  padding: 25px 0;
`;

const Avatar = styled(Image)`
  width: 100px;
  height: 130px;
  border-radius: 10px;
  object-fit: cover;
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

const Row = styled.div`
  display: flex;
  gap: 20px;

  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 5px;
  }
`;

export const SpecialistsList = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const { primary } = useTheme();

  const getSpecialists = useCallback(async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('type', '==', 'specialist'),
      );
      const querySnapshot = await getDocs(q);

      setSpecialists(() => {
        const result: Specialist[] = [];

        querySnapshot.forEach((element) => {
          result.push(element.data() as Specialist);
        });

        return [...result];
      });
    } catch (e) {
      /* empty */
    }
  }, []);

  useEffect(() => {
    getSpecialists();
  }, [getSpecialists]);

  if (!specialists.length) {
    return <Loader size={60} />;
  }

  return (
    <MainLayout>
      {specialists.map((specialist) => (
        <Fragment key={specialist.userId}>
          <SpecialistCardLayout href={`/specialists/${specialist.userId}`}>
            <Avatar
              src={specialist.avatarUrl}
              width={100}
              height={100}
              alt="Avatar"
            />
            <SpecialistInfo>
              <FullName>
                {specialist.name} {specialist.surname}
              </FullName>
              <City>Область: {specialist.city}</City>
              <Experience>Стаж: {specialist.experience} года</Experience>
              <Row>
                <Rating>
                  <StarIcon width={20} color={primary} />
                  4,5
                </Rating>
                <ReviewsCount>
                  <ChatIcon width={20} />
                  590 отзывов
                </ReviewsCount>
              </Row>
            </SpecialistInfo>
          </SpecialistCardLayout>
          <LineLayout>
            <Line />
          </LineLayout>
        </Fragment>
      ))}
    </MainLayout>
  );
};
