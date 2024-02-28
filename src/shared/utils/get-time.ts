export const getTime = ({
  seconds,
  nanoseconds,
}: {
  seconds: number;
  nanoseconds: number;
}) => {
  if (!seconds || !nanoseconds) return '';
  const currentDate = new Date(seconds * 1000 + nanoseconds / 1000000);

  return `${currentDate.getHours()}:${currentDate.getMinutes()}`;
};
