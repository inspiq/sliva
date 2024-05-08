import type { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';

import { Header } from 'src/modules';
import { SpecialistsPanel } from 'src/modules/specialists/specialists_panel/SpecialistsPanel';
import { BlockOverlay, Container, Footer, Wrapper } from 'src/shared';
import { sessionStore } from 'src/store';

export const SpecialistsElement = (): ReactElement => {
  const t = useTranslations();

  return (
    <>
      <Header />
      <Wrapper $position="flex-start">
        <Container>
          <SpecialistsPanel />
        </Container>
        {!sessionStore.authUser && !sessionStore.lockState.progress && (
          <BlockOverlay title={t('block.titles.auth_to_access')} />
        )}
      </Wrapper>
      <Footer />
    </>
  );
};

export const Specialists = observer(SpecialistsElement);
