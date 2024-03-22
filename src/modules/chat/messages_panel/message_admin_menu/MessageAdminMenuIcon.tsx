import styled from 'styled-components';

import { AdminMenuIcon } from 'src/shared/icons/AdminMenuIcon';

const MainLayout = styled.div`
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MessageAdminMenuIconElement = () => {
  return (
    <MainLayout>
      <AdminMenuIcon width="18" height="18" />
    </MainLayout>
  );
};

export const MessageAdminMenuIcon = MessageAdminMenuIconElement;
