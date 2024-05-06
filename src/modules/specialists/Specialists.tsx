import type { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';

import { sessionStore } from 'src/app_store';
import { Header } from 'src/modules';
import { SpecialistsPanel } from 'src/modules/specialists/specialists_panel/SpecialistsPanel';
import { BlockOverlay, Container, Footer, Wrapper } from 'src/shared';

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
