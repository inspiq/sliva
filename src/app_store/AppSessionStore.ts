import { useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { makeObservable, observable, runInAction } from 'mobx';

import { auth, db, type LocalVm, Lock, type LockState } from 'src/shared';
import type { UserType } from 'src/types';

export class AppSessionStore implements LocalVm {
  private readonly _lock = new Lock();
  private _authUser: User | null = null;
  private _authUserDetails: UserType | null = null;

  constructor() {
    makeObservable<AppSessionStore, '_authUser' | '_authUserDetails'>(this, {
      _authUser: observable,
      _authUserDetails: observable,
    });
  }

  public get authUser() {
    return this._authUser
      ? { ...this._authUser, additionalInfo: this._authUserDetails }
      : null;
  }

  public get lockState(): LockState {
    return this._lock.state;
  }

  onRender() {
    useEffect(() => {
      this._lock.start();

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          localStorage.setItem('userId', user?.uid);
        } else {
          localStorage.removeItem('userId');
        }
        runInAction(() => (this._authUser = user));
        this._lock.end();
      });

      return () => unsubscribe();
    }, []);

    useEffect(() => {
      const userId = this._authUser?.uid;
      if (!userId) return;

      const docRef = doc(db, 'users', userId);
      const unsubscribe = onSnapshot(docRef, (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          const user = documentSnapshot.data() as UserType;
          runInAction(() => (this._authUserDetails = user));
        }
      });

      return () => unsubscribe();
    }, [this._authUser?.uid]);
  }
}
