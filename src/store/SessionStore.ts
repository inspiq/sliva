import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import {
  autorun,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';

import { auth, db, Lock, type LockState } from 'src/shared';
import type { Client, Specialist } from 'src/types';

export type UserWithAdditionalInfo = User & { additionalInfo: UserType | null };
export type UserType = Client | Specialist;

export class SessionStore {
  private readonly _lock = new Lock();
  private _authUser: User | null = null;
  private _authUserDetails: UserType | null = null;

  constructor() {
    makeObservable<SessionStore, '_authUser' | '_authUserDetails'>(this, {
      _authUser: observable,
      _authUserDetails: observable,
    });
    autorun(() => this.initAuthStateListener());
    reaction(
      () => this._authUser?.uid,
      (userId) => this.subscribeToAuthUser(userId),
    );
  }

  private initAuthStateListener(): void {
    this._lock.start();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('userId', user.uid);
      } else {
        localStorage.removeItem('userId');
      }

      runInAction(() => (this._authUser = user));

      this._lock.end();
    });
  }

  private subscribeToAuthUser(userId?: string): void {
    if (!userId) return;

    const docRef = doc(db, 'users', userId);
    onSnapshot(docRef, (documentSnapshot) => {
      if (documentSnapshot.exists()) {
        const user = documentSnapshot.data() as UserType;

        runInAction(() => {
          this._authUserDetails = user;
        });
      }
    });
  }

  public get authUser(): UserWithAdditionalInfo | null {
    return this._authUser
      ? { ...this._authUser, additionalInfo: this._authUserDetails }
      : null;
  }

  public get lockState(): LockState {
    return this._lock.state;
  }
}
