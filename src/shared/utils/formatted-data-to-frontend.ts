import type { ValueLabelPair } from 'src/types';

export const formattedCategoriesFromBackendToSelectFormat = (
  categories: ValueLabelPair[],
  categoriesFromBackend?: string[],
) => {
  if (!categoriesFromBackend?.length) return null;

  return categoriesFromBackend?.map((category) =>
    categories.find(({ value }) => category === value),
  );
};
