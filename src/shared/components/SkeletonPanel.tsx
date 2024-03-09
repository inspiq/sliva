import { Fragment, ReactElement } from 'react';

interface Props {
  count: number;
  SkeletonCard: ReactElement;
}

const SkeletonPanelElement = (props: Props): ReactElement => {
  const { count, SkeletonCard } = props;

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Fragment key={i}>{SkeletonCard}</Fragment>
      ))}
    </>
  );
};

export const SkeletonPanel = SkeletonPanelElement;
