import { getMonthName } from 'src/shared';

export const getDayAndYear = (t: (key: string) => string, dateInput?: Date) => {
  if (!dateInput) return '';

  const convertedToDate = new Date(dateInput);
  const date = convertedToDate.getDate();
  const month = convertedToDate.getMonth();
  const year = convertedToDate.getFullYear();
  const monthName = getMonthName(t, month);

  return `${date} ${monthName} ${year}`;
};

export const add24HoursToDate = (date?: Date) => {
  if (!date) return '';

  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 24);

  return newDate;
};
