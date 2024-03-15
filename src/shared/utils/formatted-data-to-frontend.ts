import { Option } from 'src/shared';

export const formattedCategoriesFromBackendToSelectFormat = (
  categories: Option[],
  categoriesFromBackend?: string[],
) => {
  if (!categoriesFromBackend?.length) return null;

  return categoriesFromBackend?.map((category) =>
    categories.find(({ value }) => category === value),
  );
};
