import { Fragment, useState } from 'react';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import styled from 'styled-components';

import { ArrowIcon } from 'src/shared';

const MainLayout = styled.div`
  max-width: 400px;
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
`;

const Subcategory = styled.div`
  display: flex;
`;

const ItemWithChevron = (props: {
  header: string;
  subcategories?: string[];
}) => {
  const { header, subcategories, ...rest } = props;

  return (
    <AccordionItem
      {...rest}
      header={
        <>
          {header}
          <ArrowIcon className="chevron-down" width={12} />
        </>
      }
    >
      {subcategories?.map((subcategory) => (
        <Subcategory key={subcategory}>
          <input type="checkbox" id={subcategory} />
          <label htmlFor={subcategory}>{subcategory}</label>
        </Subcategory>
      ))}
    </AccordionItem>
  );
};

const StyledAccordionItem = styled(ItemWithChevron)`
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

export const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const onChangeFilter = (filter: string) => {
    setSelectedFilters((prev) => {
      const findIndex = prev.findIndex((item) => item === filter);
      const updatedSelectedFilters = [...prev];

      if (findIndex != -1) {
        updatedSelectedFilters.splice(findIndex, 1);

        return updatedSelectedFilters;
      }

      return [...prev, filter];
    });
  };

  const FILTERS = [
    {
      category: 'Все специалисты',
    },
    {
      category: 'Ремонт и строительство',
      subcategories: ['Handyman'],
    },
    {
      category: 'Репетиторство',
      subcategories: ['Handyman'],
    },
    {
      category: 'Авто',
      subcategories: ['Handyman'],
    },
    {
      category: 'Кухня',
      subcategories: ['Handyman'],
    },
    {
      category: 'Транспортные услуги',
      subcategories: ['Handyman'],
    },
    {
      category: 'Фитнес и спорт',
      subcategories: ['Handyman'],
    },
    {
      category: 'Услуги для животных',
      subcategories: ['Handyman'],
    },
    {
      category: 'Домработники',
      subcategories: ['Handyman'],
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
            key={category}
          />
        ))}
      </Accordion>
    </MainLayout>
  );
};
