import moment from 'moment';

/**
 * Formats a timestamp (string or number) to a readable date string
 * @param timestamp - Unix timestamp in milliseconds (string or number)
 * @param format - Output format (default: 'DD/MM/YYYY')
 * @returns Formatted date string
 */
export const formatDate = (timestamp: string | number | undefined | null, format: string = 'DD/MM/YYYY'): string => {
  if (!timestamp) return '';
  // Convert timestamp to number if it's a string
  const timestampNum = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
  return moment(timestampNum).format(format);
};
