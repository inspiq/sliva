import { useEffect } from 'react';
import {
  collection,
  getDocs,
  limit,
  query,
  QueryFieldFilterConstraint,
  where,
} from 'firebase/firestore';
import { action, makeObservable, observable, runInAction } from 'mobx';

import type { SpecialistFilter } from 'src/modules/specialists/specialists_panel/SpecialistsPanel';
import { db, type LocalVm, Lock, type LockState } from 'src/shared';
import type { Specialist, ValueLabelPair } from 'src/types';

const SPECIALISTS_PAGINATION_STEP = 20;

export class SpecialistsPanelVm implements LocalVm {
  private readonly _lock = new Lock();
  private _specialists: Specialist[] = [];
  private _specialistsCount = SPECIALISTS_PAGINATION_STEP;
  private _selectedFilters: SpecialistFilter[] = [];
  private _showMoreSpecialists = false;

  constructor() {
    makeObservable<SpecialistsPanelVm, '_specialists' | '_specialistsCount'>(
      this,
      {
        _specialists: observable,
        _specialistsCount: observable,
        onShowMoreSpecialists: action.bound,
        onChangeCategoriesFilter: action.bound,
        onChangeSubcategoriesFilter: action.bound,
      },
    );
  }

  public async loadSpecialists(): Promise<void> {
    this._lock.start();

    try {
      const q = query(
        collection(db, 'users'),
        where('type', '==', 'specialist'),
        ...this.getFilters(),
        limit(this._specialistsCount),
      );

      const querySnapshot = await getDocs(q);
      const specialistsFromFirebase = querySnapshot.docs.map(
        (element) => element.data() as Specialist,
      );

      runInAction(() => {
        this._specialists = specialistsFromFirebase;
        this._showMoreSpecialists =
          specialistsFromFirebase.length === this._specialistsCount;
      });

      this._lock.end();
    } catch (e) {
      this._lock.fail();
    }
  }

  public onShowMoreSpecialists(): void {
    this._specialistsCount =
      this._specialistsCount + SPECIALISTS_PAGINATION_STEP;
    this.loadSpecialists();
  }

  public onChangeCategoriesFilter = (
    isOpen: boolean,
    category: ValueLabelPair,
  ): void => {
    if (!isOpen) {
      this._selectedFilters = this._selectedFilters.filter(
        ({ category: categoryItem }) => categoryItem.value !== category.value,
      );
    }

    if (isOpen) {
      this._selectedFilters = [{ category, subcategories: [] }];
    }

    this.loadSpecialists();
  };

  public onChangeSubcategoriesFilter = ({
    category,
    subcategory,
    isChecked,
  }: {
    category: ValueLabelPair;
    subcategory: ValueLabelPair;
    isChecked: boolean;
  }): void => {
    const findCategoryIdx = this._selectedFilters.findIndex(
      ({ category: categoryItem }) => categoryItem.value === category.value,
    );

    if (findCategoryIdx !== -1 && isChecked) {
      this._selectedFilters[findCategoryIdx].subcategories = [
        ...this._selectedFilters[findCategoryIdx].subcategories,
        subcategory,
      ];
    }

    if (findCategoryIdx !== -1 && !isChecked) {
      this._selectedFilters[findCategoryIdx].subcategories = [
        ...this._selectedFilters[findCategoryIdx].subcategories.filter(
          ({ value }) => value !== subcategory.value,
        ),
      ];
    }

    this.loadSpecialists();
  };

  public get specialists(): Specialist[] {
    return this._specialists;
  }

  public get lockState(): LockState {
    return this._lock.state;
  }

  public get showMoreSpecialists(): boolean {
    return this._showMoreSpecialists;
  }

  private getFilters(): QueryFieldFilterConstraint[] {
    return this._selectedFilters.map(({ category, subcategories }) => {
      if (subcategories.length) {
        return where(
          'subcategories',
          'array-contains-any',
          subcategories.map(({ value }) => value),
        );
      }

      return where('categories', 'array-contains', category.value);
    });
  }

  onRender(): void {
    useEffect(() => {
      this.loadSpecialists();
    }, []);
  }
}
