import React from 'react';
import Rate from 'rc-rate';
import styled from 'styled-components';

const StyledRate = styled(Rate) <{ customSize: string }>`
  // Добавляем customSize к пропсам StyledRate
  &.rc-rate {
    font-size: ${({ customSize }) => customSize}px;
  }
`;

interface Props {
    size: string;
}

export const StartRate = (props: Props) => {
    const { size } = props;

    return (
        <>
            <StyledRate customSize={size} />
        </>
    );
};
