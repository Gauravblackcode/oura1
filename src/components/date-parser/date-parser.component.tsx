import { Maybe } from 'types';
import useAccount from '@/contexts/account/account-data.hook';
import DateTimeParser, { DateTimeType } from '@/lib/date-time-parser';
import { DATE_FORMAT } from '@/common/constants';
import logger from '@/common/logger';
import { isLastSecond, roundToUnit } from '@/common/helpers';
import { DateUtils } from '../date-picker/helper/date-utils';

interface IDateParser {
  date: Maybe<string> | DateTimeType;
  format?: string;
  timezone?: string;
  className?: string;
  fallback?: string;
}

export const DateParser = (props: IDateParser) => {
  const { timeZone } = useAccount();
  const { date, format = DATE_FORMAT.MMM_DD_YYYY, timezone = timeZone, className, fallback = '' } = props;
  if (!date) {
    return <span>{fallback}</span>;
  } else {
    let parsedDate = fallback;
    try {
      parsedDate =
        isLastSecond(date) && !DateUtils.isEOD(date, timeZone)
          ? roundToUnit(date, timezone, format, 'hour')
          : DateTimeParser.tz(date, timezone).format(format);
      return <span className={className}>{parsedDate}</span>;
    } catch (err) {
      logger.error(err);
    }
    return <span className={className}>{parsedDate}</span>;
  }
};

export default DateParser;
