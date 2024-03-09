import React, { ReactElement, useEffect, useRef } from 'react';

import { SkeletonMessageCard } from 'src/modules/chat/messages_panel/skeleton_panel/SkeletonMessageCard';

const SkeletonMessagesPanelElement = (): ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, []);

  return (
    <>
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <SkeletonMessageCard key={index} isMyMessage={false} ref={ref} />
        ))}
    </>
  );
};

export const SkeletonMessagesPanel = SkeletonMessagesPanelElement;
