import { useCallback, useState } from 'react';

export const useToggle = (defaultValue = false) => {
  const [visible, setVisible] = useState(defaultValue);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return {
    visible,
    open,
    close,
    toggle,
  };
};
