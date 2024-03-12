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
  isLoading: boolean;
}

const initialValues: Values = {
  currentAuthUser: null,
  isLoading: true,
};

export const AuthContext = createContext(initialValues);

export const AuthContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [currentAuthUser, setCurrentAuthUser] = useState<User | null>(null);
  const [additionalUserInfo, setAdditionalUserInfo] = useState<UserType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentAuthUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValues = {
    currentAuthUser: currentAuthUser
      ? { ...currentAuthUser, additionalInfo: additionalUserInfo }
      : null,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
