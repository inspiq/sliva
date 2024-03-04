import { ReactElement } from 'react';

import { Header } from 'src/modules';
import { SpecialistsPanel } from 'src/modules/specialists/specialists_panel/SpecialistsPanel';
import { Container, Footer, Wrapper } from 'src/shared';

export const SpecialistsElement = (): ReactElement => {
  return (
    <>
      <Header />
      <Wrapper position="flex-start">
        <Container>
          <SpecialistsPanel />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const Specialists = SpecialistsElement;
