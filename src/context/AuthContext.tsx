import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

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
    if (!currentAuthUser) return;

    const docRef = doc(db, 'users', currentAuthUser?.uid);
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data() as UserType;
        setAdditionalUserInfo(userData);
      }
    });

    return () => {
      unsubscribe();
    };
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
