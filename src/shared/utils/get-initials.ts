export const getInitials = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  if (!firstName || !lastName) return '';

  return `${firstName} ${lastName?.split('').shift()}.`;
};
