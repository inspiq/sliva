import { action, makeObservable, observable } from 'mobx';

export type LockState = { failed: boolean; progress: boolean; ended: boolean };

export const failedState = { failed: true, progress: false, ended: false };
export const progressState = { failed: false, progress: true, ended: false };
export const endedState = { failed: false, progress: false, ended: true };

export class Lock {
  private _state: LockState = endedState;

  constructor() {
    makeObservable<Lock, '_state'>(this, {
      _state: observable,
      start: action.bound,
      end: action.bound,
      fail: action.bound,
    });
  }

  public start = (): void => {
    this._state = progressState;
  };

  public end = (): void => {
    this._state = endedState;
  };

  public fail = (): void => {
    this._state = failedState;
  };

  public get state(): LockState {
    return this._state;
  }
}
