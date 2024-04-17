import { action, makeObservable, observable } from 'mobx';
import { useTranslations } from 'next-intl';

import { getSpecialistFilters, type LocalVm } from 'src/shared';
import type { ValueLabelPair } from 'src/types';

interface Filters {
  category: ValueLabelPair;
  subcategories: ValueLabelPair[];
}

export class FiltersPanelVm implements LocalVm {
  private _currentOpenAccordionId: string | null = null;

  constructor() {
    makeObservable<FiltersPanelVm, '_currentOpenAccordionId'>(this, {
      _currentOpenAccordionId: observable,
      onCurrentOpenAccordionIdToggle: action.bound,
    });
  }

  public onCurrentOpenAccordionIdToggle(accordionId: string): void {
    this._currentOpenAccordionId =
      this._currentOpenAccordionId === accordionId ? null : accordionId;
  }

  public get currentOpenAccordionId(): string | null {
    return this._currentOpenAccordionId;
  }

  public static get getFilters(): Filters[] {
    const t = useTranslations();

    return getSpecialistFilters(t);
  }

  onRender(): void {}
}
