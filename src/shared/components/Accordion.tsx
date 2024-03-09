import {
  FormEvent,
  FormHTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from 'react';
import styled, { css, keyframes, useTheme } from 'styled-components';

import { ArrowIcon, useToggle } from 'src/shared';

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 1000px;
  }
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentLayout = styled.div<{ visible: boolean }>`
  padding: 10px 7px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: fit-content;
  ${({ visible }) =>
    visible &&
    css`
      animation: ${expandAnimation} 0.3s ease;
    `}
`;

const Header = styled.label<{ visible: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  ${({ theme, visible }) =>
    visible &&
    css`
      background-color: ${theme.primary};
      color: ${theme.white};
    `}
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme, visible }) =>
      visible ? theme.primary : theme.light_grey};
  }

  & > .arrow {
    transition: transform 0.3s cubic-bezier(0, 0, 0, 1);
    transform: ${({ visible }) =>
      visible ? 'rotate(270deg)' : 'rotate(90deg)'};
  }
`;

const Title = styled.div<{ visible: boolean }>`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.secondary};

  ${({ visible, theme }) =>
    visible &&
    css`
      color: ${theme.white};
    `}
`;

interface Props extends FormHTMLAttributes<HTMLInputElement> {}

export const AccordionElement = (
  props: PropsWithChildren<Props>,
): ReactElement => {
  const { children, title, onChange, ...rest } = props;

  const { toggle, visible } = useToggle();
  const { secondary, white } = useTheme();

  const onChangeVisible = (e: FormEvent<HTMLInputElement>) => {
    onChange?.(e);
    toggle();
  };

  return (
    <MainLayout>
      <input
        type="checkbox"
        checked={visible}
        onChange={onChangeVisible}
        hidden
        {...rest}
      />
      <Header htmlFor={rest.id} visible={visible}>
        <Title visible={visible}>{title}</Title>
        <ArrowIcon
          width={12}
          height={12}
          color={visible ? white : secondary}
          className={'arrow'}
        />
      </Header>
      {visible && <ContentLayout visible={visible}>{children}</ContentLayout>}
    </MainLayout>
  );
};

export const Accordion = AccordionElement;
