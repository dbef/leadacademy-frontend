import { Language } from 'src/contexts/language-context';
import { Dates } from 'src/types/dates';

const options: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  hour: 'numeric',
  minute: 'numeric',
  year: 'numeric',
  hour12: false,
};

export const renderDate = (dateObj: Date, language: Language): string => {
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return '';
  }

  const formattedDateTime = dateObj.toLocaleDateString('en-US', options);

  const dateParts = formattedDateTime.split(', ');
  const [monthDay, year] = dateParts;

  if (!monthDay || !year) return formattedDateTime;

  const [month, day] = monthDay.split(' ');

  const formattedDate = `${day} ${
    language === Language.KA ? Dates[month?.toLocaleLowerCase() as keyof typeof Dates] : month
  }`;

  return formattedDate;
};
