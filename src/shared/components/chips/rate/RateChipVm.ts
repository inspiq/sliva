import type { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import { action, makeObservable, observable } from 'mobx';

import type { LocalVm } from 'src/shared';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  selectedRating: number;
  setSelectedRating?: Dispatch<SetStateAction<number>>;
}

export class RateChipVm implements LocalVm {
  private _hoveredStar = 0;
  private _isDisabled;
  private setSelectedRating?: Dispatch<SetStateAction<number>>;

  constructor(props: Omit<Props, 'selectedRating'>) {
    makeObservable<RateChipVm, '_hoveredStar'>(this, {
      _hoveredStar: observable,
      onChangeHoveredStar: action.bound,
      onChangeSelectedRating: action.bound,
    });
    this._isDisabled = props.disabled ?? false;
    this.setSelectedRating = props.setSelectedRating;
  }

  public onChangeHoveredStar(value: number): void {
    if (this._isDisabled) return;

    this._hoveredStar = value;
  }

  public onChangeSelectedRating(value: number): void {
    if (this._isDisabled) return;

    this.setSelectedRating?.(value);
  }

  public get hoveredStar(): number {
    return this._hoveredStar;
  }

  onRender(): void {}
}
