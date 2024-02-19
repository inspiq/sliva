import styled from 'styled-components';

export const Error = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.input.error};
  font-weight: ${({ theme }) => theme.w400};
  width: 100%;
  text-align: start;
`;
