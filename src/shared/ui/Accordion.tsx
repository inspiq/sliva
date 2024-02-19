import React, {
  FormEvent,
  FormHTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from 'react';
import styled, { css, useTheme } from 'styled-components';

import { ArrowIcon, useToggle } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentLayout = styled.div`
  padding: 10px 10px;
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
      background-color: ${theme.secondary};
      color: ${({ theme }) => theme.white};
    `}

  &:hover {
    background-color: ${({ theme, visible }) =>
      visible ? theme.secondary : theme.light};
  }

  & > .arrow {
    transition: transform 0.3s cubic-bezier(0, 0, 0, 1);
    transform: ${({ visible }) =>
      visible ? 'rotate(270deg)' : 'rotate(90deg)'};
  }
`;

const Title = styled.div`
  font-size: 15px;
`;

interface Props extends FormHTMLAttributes<HTMLInputElement> {
  isDisabled?: boolean;
}

export const UiAccordionElement = (
  props: PropsWithChildren<Props>,
): ReactElement => {
  const { children, title, onChange, isDisabled, ...rest } = props;

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
        <Title>{title}</Title>
        {!isDisabled && (
          <ArrowIcon
            width={12}
            height={12}
            color={visible ? white : secondary}
            className={'arrow'}
          />
        )}
      </Header>
      {visible && !isDisabled && <ContentLayout>{children}</ContentLayout>}
    </MainLayout>
  );
};

export const UiAccordion = UiAccordionElement;
