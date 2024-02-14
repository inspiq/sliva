import { PuffLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';

const MainLayout = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${({ theme }) => theme.white};
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  size: number;
}

export const Loader = (props: Props) => {
  const { size } = props;
  const { loader } = useTheme();

  return (
    <MainLayout>
      <PuffLoader color={loader.primary} size={size} />
    </MainLayout>
  );
};
