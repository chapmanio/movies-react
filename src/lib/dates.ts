import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const formatShortMonthDate = (isoString?: string) => {
  if (!isoString) {
    return undefined;
  }

  return format(parseISO(isoString), 'do MMM yyyy');
};

export const formatShortDate = (isoString?: string) => {
  if (!isoString) {
    return undefined;
  }

  return format(parseISO(isoString), 'dd/MM/yyyy');
};

export const formatYear = (isoString?: string) => {
  if (!isoString) {
    return undefined;
  }

  return format(parseISO(isoString), 'yyyy');
};

export const formatRuntime = (runtime?: number) => {
  if (!runtime) {
    return undefined;
  }

  const hours = Math.round(runtime / 60);
  const minutes = runtime - hours * 60;

  const formattedHours = hours > 0 ? `${hours}h` : undefined;
  const formattedMinutes = minutes > 0 ? `${minutes}m` : undefined;

  return formattedHours && formattedMinutes
    ? `${formattedHours} ${formattedMinutes}`
    : formattedHours
    ? formattedHours
    : formattedMinutes;
};
