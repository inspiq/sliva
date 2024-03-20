import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { ArrowIcon, devices } from 'src/shared';

const StyledArrowIcon = styled(ArrowIcon)`
  transform: rotate(90deg);
  transition: transform 0.3s cubic-bezier(0, 0, 0, 1);
`;

const MenuItemLayout = styled.div`
  transition: background-color 0.3s;
  padding: 0 20px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.light_grey};
  }

  &:focus {
    border-width: 0 !important;
    border: none;
  }

  @media ${devices.mobileL} {
    padding: 0;
    height: auto;
    justify-content: flex-end;

    &:hover {
      background-color: transparent;
    }
  }

  &:hover > ${StyledArrowIcon} {
    transform: rotate(270deg);
  }
`;

const Text = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  display: flex;
  white-space: nowrap;
  color: ${({ theme }) => theme.text};
`;

const AccountManagementElement = (): ReactElement => {
  const t = useTranslations('Header');

  return (
    <MenuItemLayout>
      <Text>{t('buttons.account_management')}</Text>
      <StyledArrowIcon width="10" height="10" />
    </MenuItemLayout>
  );
};

export const AccountManagement = AccountManagementElement;
