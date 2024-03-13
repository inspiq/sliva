import { ReactElement } from 'react';

import { SubcategoryCard } from 'src/modules/specialists/filters_panel/subcategories_panel/SubcategoryCard';
import { type Option } from 'src/shared';

interface Props {
  subcategories?: Option[];
  onChange: (subcategory: Option, isChecked: boolean) => void;
}

const SubcategoriesPanelElement = (props: Props): ReactElement => {
  const { subcategories, onChange } = props;

  return (
    <>
      {subcategories?.map((subcategory) => (
        <SubcategoryCard
          key={subcategory.value}
          onChange={onChange}
          subcategory={subcategory}
        />
      ))}
    </>
  );
};

export const SubcategoriesPanel = SubcategoriesPanelElement;
