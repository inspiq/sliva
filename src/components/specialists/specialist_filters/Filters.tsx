import { ReactElement, useState } from 'react';
import { Accordion } from '@szhsin/react-accordion';
import styled from 'styled-components';

import { Filter } from 'src/components/specialists/specialist_filters/Filter';

const MainLayout = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledAccordionItem = styled(Filter)`
  border-bottom: 1px solid ${({ theme }) => theme.border};

  .szh-accordion__item {
    &-btn {
      cursor: pointer;
      display: flex;
      align-items: center;
      width: 100%;
      padding: 12px 10px;
      font-size: 15px;
      font-weight: ${({ theme }) => theme.w500};
      color: ${({ theme }) => theme.text};
      background-color: transparent;
      border: none;

      &:hover {
        background-color: ${({ theme }) => theme.light};
      }
    }

    &-content {
      transition: height 0.25s cubic-bezier(0, 0, 0, 1);
    }

    &-panel {
      padding: 12px 10px;
    }
  }

  .chevron-down {
    margin-left: auto;
    transition: transform 0.3s cubic-bezier(0, 0, 0, 1);
    transform: rotate(90deg);
  }

  &.szh-accordion__item--expanded {
    .szh-accordion__item-btn {
      background-color: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.white};
    }
    .chevron-down {
      transform: rotate(270deg);
    }
  }
`;

const FiltersElement = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFilters, setSelectedFilters] = useState<
    { header: string; subcategories: string[] }[]
  >([]);

  console.log(selectedFilters);

  const FILTERS = [
    {
      category: 'Все специалисты',
      subcategories: [],
    },
    {
      category: 'Ремонт и строительство',
      subcategories: ['Разнорабочий'],
    },
    {
      category: 'Репетиторство',
      subcategories: ['a'],
    },
    {
      category: 'Авто',
      subcategories: ['v'],
    },
    {
      category: 'Кухня',
      subcategories: ['s'],
    },
    {
      category: 'Транспортные услуги',
      subcategories: ['gf'],
    },
    {
      category: 'Фитнес и спорт',
      subcategories: ['Hee'],
    },
    {
      category: 'Услуги для животных',
      subcategories: ['gg'],
    },
    {
      category: 'Домработники',
      subcategories: ['Hern'],
    },
    {
      category: 'Фриланс',
      subcategories: ['Handyman'],
    },
  ];

  return (
    <MainLayout>
      <Accordion allowMultiple>
        {FILTERS.map(({ category, subcategories }) => (
          <StyledAccordionItem
            header={category}
            subcategories={subcategories}
            setSelectedFilters={setSelectedFilters}
            key={category}
          />
        ))}
      </Accordion>
    </MainLayout>
  );
};

export const Filters = FiltersElement;
