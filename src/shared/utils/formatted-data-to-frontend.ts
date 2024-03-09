import { Option } from 'src/shared';

export const formattedCategoriesFromBackendToSelectFormat = (
  categories: Option[],
  categoriesFromBackend?: string[],
) => {
  return categoriesFromBackend?.map((category) =>
    categories.find(({ value }) => category === value),
  );
};
