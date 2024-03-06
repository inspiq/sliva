import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';

import { useAuthContext } from 'src/context';
import { Header } from 'src/modules';
import { SpecialistsPanel } from 'src/modules/specialists/specialists_panel/SpecialistsPanel';
import { BlockOverlay, Container, Footer, Wrapper } from 'src/shared';

export const SpecialistsElement = (): ReactElement => {
  const t = useTranslations();
  const { currentAuthUser } = useAuthContext();

  return (
    <>
      <Header />
      <Wrapper $position="flex-start">
        <Container>
          <SpecialistsPanel />
        </Container>
        {!currentAuthUser && <BlockOverlay title={t('block_overlay.title')} />}
      </Wrapper>
      <Footer />
    </>
  );
};

export const Specialists = SpecialistsElement;
