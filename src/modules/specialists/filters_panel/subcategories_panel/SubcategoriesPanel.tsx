import type { ReactElement } from 'react';

import { SubcategoryCard } from 'src/modules/specialists/filters_panel/subcategories_panel/SubcategoryCard';
import type { ValueLabelPair } from 'src/types';

interface Props {
  subcategories?: ValueLabelPair[];
  onChange: ({
    subcategory,
    isChecked,
  }: {
    subcategory: ValueLabelPair;
    isChecked: boolean;
  }) => void;
}

const SubcategoriesPanelElement = (props: Props): ReactElement => {
  const { subcategories, onChange } = props;

  return (
    <>
      {subcategories?.map((subcategory) => (
        <SubcategoryCard
          key={subcategory.value}
          subcategory={subcategory}
          onChange={onChange}
        />
      ))}
    </>
  );
};

export const SubcategoriesPanel = SubcategoriesPanelElement;
