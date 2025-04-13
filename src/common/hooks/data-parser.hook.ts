import { Maybe } from 'types';
import useAccount from '@/contexts/account/account-data.hook';
import DateTimeParser, { DateTimeType } from '@/lib/date-time-parser';
import logger from '../logger';
import { DATE_FORMAT } from '../constants';
import { isLastSecond, roundToUnit } from '../helpers';

export const useDateParser = () => {
  const { timeZone } = useAccount();

  const getParsedDate = (
    date: Maybe<string> | DateTimeType,
    format: string = DATE_FORMAT.MMM_DD_YYYY,
    timezone: string = timeZone,
    roundOff: boolean = false,
  ): string => {
    try {
      if (!date) {
        return '';
      }

      // First validate if the date is parseable
      const momentDate = DateTimeParser.tz(date, timezone);
      if (!momentDate.isValid()) {
        logger.error('Invalid date provided:', date);
        return '';
      }

      if (isLastSecond(date) && roundOff) {
        // For last second case, first ensure the date is valid before rounding
        try {
          return roundToUnit(date, timezone, format, 'hour');
        } catch (roundingError) {
          logger.error('Error rounding date:', roundingError);
          return DateTimeParser.tz(date, timezone).format(format);
        }
      }

      return DateTimeParser.tz(date, timezone).format(format);
    } catch (err) {
      logger.error('Error parsing date:', err);
      return '';
    }
  };

  return { getParsedDate };
};

export default useDateParser;
