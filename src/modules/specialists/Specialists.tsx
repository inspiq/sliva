import type { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';

import { useAuthContext } from 'src/context';
import { Header } from 'src/modules';
import { SpecialistsPanel } from 'src/modules/specialists/specialists_panel/SpecialistsPanel';
import { BlockOverlay, Container, Footer, Wrapper } from 'src/shared';

export const SpecialistsElement = (): ReactElement => {
  const t = useTranslations();
  const { authUser, isLoading } = useAuthContext();

  return (
    <>
      <Header />
      <Wrapper $position="flex-start">
        <Container>
          <SpecialistsPanel />
        </Container>
        {!authUser && !isLoading && (
          <BlockOverlay title={t('block.titles.auth_to_access')} />
        )}
      </Wrapper>
      <Footer />
    </>
  );
};

export const Specialists = observer(SpecialistsElement);
