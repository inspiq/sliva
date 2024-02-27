export const generateRandomColor = (): string => {
  const symbol = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += symbol[Math.floor(Math.random() * 16)];
  }

  return color;
};
