import { ReactElement, useEffect, useMemo, useState } from 'react';
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

export interface SpecialistFilter {
  header: string;
  subcategories: string[];
}

const SpecialistsPanelElement = (): ReactElement => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SpecialistFilter[]>(
    [],
  );
  console.log(selectedFilters);
  const filteredSpecialists = useMemo(() => {
    if (!selectedFilters.length) return specialists;

    const uniqueSpecialistIds = new Set();
    let filteredSpecialists: Specialist[] = [];

    selectedFilters.forEach((filter) => {
      if (filter.subcategories.length) {
        filteredSpecialists.push(
          ...specialists.filter((specialist) =>
            specialist?.subcategories?.some((subcategory) =>
              filter.subcategories.includes(subcategory.value),
            ),
          ),
        );
      } else {
        filteredSpecialists.push(
          ...specialists.filter((specialist) =>
            specialist.categories?.some(
              (category) => category.value === filter.header,
            ),
          ),
        );
      }
    });

    filteredSpecialists = filteredSpecialists.filter((specialist) => {
      if (uniqueSpecialistIds.has(specialist.userId)) {
        return false;
      }
      uniqueSpecialistIds.add(specialist.userId);

      return true;
    });

    return filteredSpecialists;
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
};

export const SpecialistsPanel = SpecialistsPanelElement;
