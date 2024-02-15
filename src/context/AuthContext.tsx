import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from 'src/firebase';

interface Values {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

const initialValues: Values = {
  currentUser: null,
  setCurrentUser: () => undefined,
};

export const AuthContext = createContext(initialValues);

export const AuthContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => onAuthStateChanged(auth, setCurrentUser), []);

  const contextValues = {
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
