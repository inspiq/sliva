import {
  FormEvent,
  FormHTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from 'react';
import styled, { css, useTheme } from 'styled-components';

import { ArrowIcon } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentLayout = styled.div<{ isOpen: boolean }>`
  padding: 10px 7px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Header = styled.label<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  ${({ theme, isOpen }) =>
    isOpen &&
    css`
      background-color: ${theme.primary};
      color: ${theme.white};
    `}
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme, isOpen }) =>
      isOpen ? theme.primary : theme.light_grey};
  }

  & > .arrow {
    transition: transform 0.3s cubic-bezier(0, 0, 0, 1);
    transform: ${({ isOpen }) => (isOpen ? 'rotate(270deg)' : 'rotate(90deg)')};
  }
`;

const Title = styled.div<{ isOpen: boolean }>`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.secondary};

  ${({ isOpen, theme }) =>
    isOpen &&
    css`
      color: ${theme.white};
    `}
`;

interface Props extends FormHTMLAttributes<HTMLInputElement> {
  onToggle: () => void;
  isOpen: boolean;
}

export const AccordionElement = (
  props: PropsWithChildren<Props>,
): ReactElement => {
  const { children, title, onChange, onToggle, isOpen, ...rest } = props;

  const { secondary, white } = useTheme();

  const onChangeAccordionOpen = (e: FormEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <MainLayout>
      <input
        type="checkbox"
        checked={isOpen}
        onChange={onChangeAccordionOpen}
        hidden
        {...rest}
      />
      <Header htmlFor={rest.id} isOpen={isOpen} onClick={onToggle}>
        <Title isOpen={isOpen}>{title}</Title>
        <ArrowIcon
          width={12}
          height={12}
          color={isOpen ? white : secondary}
          className="arrow"
        />
      </Header>
      {isOpen && <ContentLayout isOpen={isOpen}>{children}</ContentLayout>}
    </MainLayout>
  );
};

export const Accordion = AccordionElement;
