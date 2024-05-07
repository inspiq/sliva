export const getUserInitials = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  if (!firstName || !lastName) return '';

  return `${firstName} ${lastName?.split('').shift()}.`;
};
