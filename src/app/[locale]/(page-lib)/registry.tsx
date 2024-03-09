import { PropsWithChildren, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useServerInsertedHTML } from 'next/navigation';
import {
  ServerStyleSheet,
  StyleSheetManager,
  useTheme,
} from 'styled-components';

const StyledComponentsRegistry = (props: PropsWithChildren) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  const { light_grey, light } = useTheme();

  const { children } = props;

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();

    return styles;
  });

  if (typeof window !== 'undefined') return children;

  return (
    <SkeletonTheme baseColor={light_grey} highlightColor={light} duration={1}>
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        {children}
      </StyleSheetManager>
    </SkeletonTheme>
  );
};

export default StyledComponentsRegistry;
