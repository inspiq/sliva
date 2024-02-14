import { useState } from 'react';

export const useToggle = (defaultValue = false) => {
  const [visible, setVisible] = useState(defaultValue);

  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  const toggle = () => {
    setVisible((prev) => !prev);
  };

  return {
    visible,
    open,
    close,
    toggle,
  };
};
