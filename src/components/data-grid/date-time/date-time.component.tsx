import { Moment } from 'moment';
import { Typography, TypographyVariant } from '@/lib/dsl/dsl';
import { DATE_FORMAT } from '@/common/constants';
import useAccount from '@/contexts/account/account-data.hook';
import DateTimeParser from '@/lib/date-time-parser';
import { isLastSecond, roundToUnit } from '@/common/helpers';
import { DateUtils } from '@/components/date-picker/helper/date-utils';
import styles from './date-time.module.scss';

type TDateTime = {
  date?: Date | string;
  hideTime?: boolean;
  dateFormat?: string;
  timeFormat?: string;
  dateStyle?: {
    color?: string;
    variant?: TypographyVariant;
    fontWeight?: any;
  };
  roundOff?: boolean;
};

const DateTime: React.FC<TDateTime> = (props: TDateTime) => {
  const {
    date,
    dateStyle = {},
    hideTime = false,
    dateFormat = DATE_FORMAT.MMM_DD_YYYY,
    timeFormat = 'HH:mm',
    roundOff = false,
  } = props;
  const { timeZone } = useAccount();
  const shouldRoundOff =
    roundOff && isLastSecond(DateTimeParser.tz(date, timeZone)) && !DateUtils.isEOD(date, timeZone);
  const finalDate = shouldRoundOff
    ? roundToUnit(date as unknown as string | Moment, timeZone, dateFormat, 'hour')
    : DateTimeParser.tz(date, timeZone).format(dateFormat);

  const finalTime = shouldRoundOff
    ? roundToUnit(date as unknown as string | Moment, timeZone, timeFormat, 'hour')
    : DateTimeParser.tz(date, timeZone).format(timeFormat);
  if (!date) {
    return <Typography>-</Typography>;
  }
  return (
    <div className={styles.container}>
      <Typography {...dateStyle}>{finalDate}</Typography>
      {!hideTime && <Typography variant="caption-regular">{finalTime}</Typography>}
    </div>
  );
};

export default DateTime;
