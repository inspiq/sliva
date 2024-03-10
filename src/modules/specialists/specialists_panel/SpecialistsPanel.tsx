import { ReactElement, useEffect, useState } from 'react';
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import styled from 'styled-components';

import { Filters } from 'src/modules/specialists/filters/FiltersPanel';
import { SpecialistCard } from 'src/modules/specialists/specialists_panel/SpecialistCard';
import {
  db,
  DEFAULT_SKELETON_SPECIALISTS_COUNT,
  devices,
  Option,
  SkeletonPanel,
  Specialist,
  SPECIALISTS_PAGINATION_STEP,
} from 'src/shared';

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  gap: 60px;
  padding: 25px 0;
  position: relative;
  margin-top: 25px;
  margin-bottom: 50px;

  @media ${devices.mobileL} {
    display: flex;
    flex-direction: column;
    margin-top: 0;
  }
`;

const SpecialistsLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ShowMoreSpecialists = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.secondary};
  text-decoration: underline;
  cursor: pointer;
`;

export interface SpecialistFilter {
  category: Option;
  subcategories: Option[];
}

const SpecialistsPanelElement = (): ReactElement => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SpecialistFilter[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showMoreCount, setShowMoreCount] = useState(
    SPECIALISTS_PAGINATION_STEP,
  );
  const [isShowMore, setIsShowMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const getFilters = () => {
      // Переделать..
      return [];
    };

    const q = query(
      collection(db, 'users'),
      where('type', '==', 'specialist'),
      ...getFilters(),
      limit(showMoreCount),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const specialists: Specialist[] = [];

      querySnapshot.forEach((element) => {
        specialists.push(element.data() as Specialist);
      });

      setSpecialists(specialists);
      setIsLoading(false);
      setIsShowMore(specialists.length === showMoreCount);
    });

    return () => {
      unsubscribe();
    };
  }, [selectedFilters, showMoreCount]);

  const showMore = () => {
    setShowMoreCount((prev) => prev + SPECIALISTS_PAGINATION_STEP);
  };

  return (
    <MainLayout>
      <Filters setSelectedFilters={setSelectedFilters} />
      <SpecialistsLayout>
        {isLoading ? (
          <SkeletonPanel
            count={DEFAULT_SKELETON_SPECIALISTS_COUNT}
            SkeletonCard={<SpecialistCard isLoading={isLoading} />}
          />
        ) : (
          specialists.map((specialist) => (
            <SpecialistCard specialist={specialist} key={specialist.userId} />
          ))
        )}
        {isShowMore && !isLoading && (
          <ShowMoreSpecialists onClick={showMore}>
            Показать больше специалистов
          </ShowMoreSpecialists>
        )}
      </SpecialistsLayout>
    </MainLayout>
  );
};

export const SpecialistsPanel = SpecialistsPanelElement;
