import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from 'src/shared';
import { Specialist } from 'src/shared';

export const SpecialistsList = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);

  const getSpecialists = useCallback(async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('type', '==', 'specialist'),
      );
      const querySnapshot = await getDocs(q);

      setSpecialists((prev) => {
        const result: Specialist[] = [];

        querySnapshot.forEach((element) => {
          result.push(element.data() as Specialist);
        });

        return [...prev, ...result];
      });
    } catch (e) {
      /* empty */
    }
  }, []);

  useEffect(() => {
    getSpecialists();
  }, [getSpecialists]);

  console.log(specialists);

  return <></>;
};
