import { PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';

export const TextTipLayout = styled.div`
  width: 100%;
  text-align: end;
`;

export const TextTip = styled.div`
  margin-top: 5px;
  color: ${({ theme }) => theme.grey};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.w400};
`;

const TipLayout = styled.div`
  width: 100%;
`;

const TipElement = (props: PropsWithChildren): ReactElement => {
  const { children } = props;

  return (
    <TipLayout>
      <TextTip>{children}</TextTip>
    </TipLayout>
  );
};

export const Tip = TipElement;
