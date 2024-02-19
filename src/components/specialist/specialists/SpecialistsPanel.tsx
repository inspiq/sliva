import {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import styled from 'styled-components';

import { Loader } from 'src/components';
import { Filters } from 'src/components/specialist/specialist_filters/FiltersPanel';
import { SpecialistCard } from 'src/components/specialist/specialists/SpecialistCard';
import { db, devices, Specialist } from 'src/shared';

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 300px auto;

  gap: 60px;
  margin: 50px 0;

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

  const filteredSpecialists = useMemo(() => {
    if (!selectedFilters.length) return;

    const uniqueSpecialistIds = new Set<string>();

    const filteredSpecialistsByCategory = specialists.filter((specialist) =>
      specialist.categories.some((category) =>
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
    getSpecialists();
  }, [getSpecialists]);

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

export const SpecialistsList = SpecialistsPanelElement;
