import { useCallback, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import { db, Specialist } from 'src/shared';

interface Props {
  specialistId: string;
}

export const SpecialistInfo = (props: Props) => {
  const { specialistId } = props;
  const [userMetaData, setUserMetaData] = useState<Specialist>();

  const getSpecialist = useCallback(async () => {
    try {
      const docRef = doc(db, 'users', specialistId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setUserMetaData(snapshot.data() as Specialist);
      }
    } catch {
      /* empty */
    }
  }, [specialistId]);

  useEffect(() => {
    getSpecialist();
  }, [getSpecialist]);

  console.log(userMetaData);

  return <div>Specialist</div>;
};
