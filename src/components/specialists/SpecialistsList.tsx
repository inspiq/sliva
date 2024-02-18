import {
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import styled from 'styled-components';

import { Line, Loader } from 'src/components';
import { Filters } from 'src/components/specialists/specialist_filters/Filters';
import { Link } from 'src/navigation';
import { ChatIcon, db, devices } from 'src/shared';
import { Specialist } from 'src/shared';

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 300px auto;

  gap: 50px;
  margin: 50px 0;

  @media ${devices.mobileL} {
    display: flex;
    flex-direction: column;
    margin: 0;
  }
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

const SpecialistsLayout = styled.div`
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

const SpecialistsListElement = (): ReactElement => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);

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
    return <Loader />;
  }

  return (
    <MainLayout>
      <Filters />
      <SpecialistsLayout>
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
                  <Rating>4,5</Rating>
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
      </SpecialistsLayout>
    </MainLayout>
  );
};

export const SpecialistsList = SpecialistsListElement;
