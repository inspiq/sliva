import { memo, ReactElement, useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import styled from 'styled-components';

import { Filters } from 'src/modules/specialists/filters/FiltersPanel';
import { SpecialistCard } from 'src/modules/specialists/specialists_panel/SpecialistCard';
import { db, devices, Loader, Specialist } from 'src/shared';

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  gap: 60px;
  padding: 25px 0;
  @media ${devices.mobileL} {
    display: flex;
    flex-direction: column;
    margin: 0;
  }
`;

const SpecialistsLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpecialistsPanelElement = memo((): ReactElement => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    { header: string; subcategories: string[] }[]
  >([]);

  const filteredSpecialists = useMemo(() => {
    if (!selectedFilters.length) return;

    const uniqueSpecialistIds = new Set<string>();

    const filteredSpecialistsByCategory = specialists.filter((specialist) =>
      specialist.categories?.some((category) =>
        selectedFilters.some((filter) => filter.header === category.value),
      ),
    );

    const filteredSpecialistsBySubcategory = specialists.filter((specialist) =>
      specialist?.subcategories?.some((subcategory) => {
        const { value } = subcategory;

        return selectedFilters.some((filter) =>
          filter.subcategories.includes(value),
        );
      }),
    );

    const mergedSpecialists = [
      ...filteredSpecialistsBySubcategory,
      ...filteredSpecialistsByCategory,
    ];

    return mergedSpecialists.filter((specialist) => {
      if (uniqueSpecialistIds.has(specialist.userId)) {
        return false;
      }
      uniqueSpecialistIds.add(specialist.userId);

      return true;
    });
  }, [selectedFilters, specialists]);

  useEffect(() => {
    const q = query(collection(db, 'users'), where('type', '==', 'specialist'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const specialists: Specialist[] = [];

      querySnapshot.forEach((element) => {
        specialists.push(element.data() as Specialist);
      });

      setSpecialists(specialists);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!specialists.length) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <Filters setSelectedFilters={setSelectedFilters} />
      <SpecialistsLayout>
        {(filteredSpecialists ?? specialists).map((specialist) => (
          <SpecialistCard specialist={specialist} key={specialist.userId} />
        ))}
      </SpecialistsLayout>
    </MainLayout>
  );
});

SpecialistsPanelElement.displayName = 'SpecialistsPanel';

export const SpecialistsPanel = SpecialistsPanelElement;
