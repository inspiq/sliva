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
  authUser: UserWithAdditionalInfo | null;
  isLoading: boolean;
}

const initialValues: Values = {
  authUser: null,
  isLoading: true,
};

export const AuthContext = createContext(initialValues);

export const AuthContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authUserDetails, setAuthUserDetails] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authUser) return;

    const docRef = doc(db, 'users', authUser?.uid);
    const unsubscribe = onSnapshot(docRef, (documentSnapshot) => {
      if (documentSnapshot.exists()) {
        const user = documentSnapshot.data() as UserType;
        setAuthUserDetails(user);
      }
    });

    return () => unsubscribe();
  }, [authUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('userId', user?.uid);
      } else {
        localStorage.removeItem('userId');
      }
      setAuthUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValues = {
    authUser: authUser
      ? { ...authUser, additionalInfo: authUserDetails }
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
