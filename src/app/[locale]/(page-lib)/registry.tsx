import { PropsWithChildren, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useServerInsertedHTML } from 'next/navigation';
import {
  ServerStyleSheet,
  StyleSheetManager,
  useTheme,
} from 'styled-components';

import { SKELETON_DURATION } from 'src/shared';

const StyledComponentsRegistry = (props: PropsWithChildren) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  const { skeleton } = useTheme();

  const { children } = props;

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();

    return styles;
  });

  if (typeof window !== 'undefined') return children;

  return (
    <SkeletonTheme
      baseColor={skeleton.base}
      highlightColor={skeleton.highlight}
      duration={SKELETON_DURATION}
    >
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        {children}
      </StyleSheetManager>
    </SkeletonTheme>
  );
};

export default StyledComponentsRegistry;
