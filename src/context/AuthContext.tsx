import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db, UserType, UserWithAdditionalInfo } from 'src/shared';

interface Values {
  currentAuthUser: UserWithAdditionalInfo | null;
}

const initialValues: Values = {
  currentAuthUser: null,
};

export const AuthContext = createContext(initialValues);

export const AuthContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [currentAuthUser, setCurrentAuthUser] = useState<User | null>(null);
  const [additionalUserInfo, setAdditionalUserInfo] = useState<UserType | null>(
    null,
  );

  useEffect(() => {
    const getAdditionalUserInfo = async () => {
      if (!currentAuthUser) return;

      try {
        const docRef = doc(db, 'users', currentAuthUser?.uid);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const userData = snapshot.data() as UserType;
          setAdditionalUserInfo(userData);
        }
      } catch (e) {
        /* обработка ошибок */
      }
    };

    getAdditionalUserInfo();
  }, [currentAuthUser]);

  useEffect(() => onAuthStateChanged(auth, setCurrentAuthUser), []);

  const contextValues = {
    currentAuthUser: currentAuthUser
      ? { ...currentAuthUser, additionalInfo: additionalUserInfo }
      : null,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
