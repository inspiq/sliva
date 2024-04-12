import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

import { auth, db } from 'src/shared';
import type { UserType, UserWithAdditionalInfo } from 'src/types';

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
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentAuthUser) return;

    const docRef = doc(db, 'users', currentAuthUser?.uid);
    const unsubscribe = onSnapshot(docRef, (documentSnapshot) => {
      if (documentSnapshot.exists()) {
        const user = documentSnapshot.data() as UserType;
        setUser(user);
      }
    });

    return () => unsubscribe();
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
      ? { ...currentAuthUser, additionalInfo: user }
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
