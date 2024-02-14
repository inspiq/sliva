import styled from 'styled-components';

import { Link } from 'src/navigation';

export const StyledLink = styled(Link)`
  margin-top: 5px;
  font-size: 13px;
  color: ${({ theme }) => theme.primary};
  width: 100%;
  text-align: end;
`;
