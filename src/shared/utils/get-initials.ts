export const getInitials = ({
  name,
  lastName,
}: {
  name: string;
  lastName: string;
}) => {
  return `${name} ${lastName?.split('').shift()}.`;
};
