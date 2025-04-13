import { Maybe } from 'types';
import DateTimeParser, { DateTimeType } from '@/lib/date-time-parser';
import { DATE_FORMAT } from '@/common/constants';

type THourRangeOptions = {
  selectedDate: DateTimeType;
  minDate?: DateTimeType;
  maxDate?: DateTimeType;
};

type THoursValidConfig = {
  minDateTime: DateTimeType;
  maxDateTime: DateTimeType;
  selectedDate: DateTimeType;
  timezone: string;
  isPastDisabled?: boolean;
  isFutureDisabled?: boolean;
};

type THoursActive = {
  selectedDate: DateTimeType;
  time: string;
  timezone: string;
};

const isHoursValid = (time: string, config: THoursValidConfig): boolean => {
  const { isPastDisabled, isFutureDisabled, selectedDate, minDateTime, maxDateTime } = config;
  if (isPastDisabled || isFutureDisabled) {
    const [hour, minute] = time.split(':');
    const currentSelectedObj = DateTimeParser.tz(selectedDate, config.timezone)
      .set('hour', Number(hour))
      .set('minutes', Number(minute));
    if (isPastDisabled) {
      const minDateObj = DateTimeParser.tz(minDateTime, config.timezone);
      if (minDateObj.isAfter(currentSelectedObj)) {
        return false;
      }
      return true;
    }
    if (isFutureDisabled) {
      const maxDateObj = DateTimeParser.tz(maxDateTime, config.timezone);
      if (maxDateObj.isBefore(currentSelectedObj)) {
        return false;
      }
      return true;
    }
  }
  return true;
};

const isHourActive = (config: THoursActive) => {
  const { time, timezone } = config;
  const selectedDate = DateTimeParser.tz(config.selectedDate, timezone);
  const optionTimeObj = DateTimeParser.tz(time, 'hh:mm', timezone);

  return selectedDate.hours() === optionTimeObj.hours() && selectedDate.minutes() === optionTimeObj.minutes();
};

const getHoursRange = (options: THourRangeOptions) => {
  const { selectedDate, minDate, maxDate } = options;
  if (minDate) {
    if (selectedDate.isSame(minDate, 'date')) {
      if (selectedDate.isBefore(minDate)) {
        return minDate.set('minute', 0);
      }
    }
  }
  if (maxDate) {
    if (selectedDate.isSame(maxDate, 'date')) {
      if (selectedDate.isAfter(maxDate)) {
        return maxDate.set('minute', 0);
      }
    }
  }
  if (selectedDate.hours() === 23 && selectedDate.minutes() === 59) {
    return selectedDate.clone();
  }
};
const getEndTime = (endDate?: Maybe<string | DateTimeType>, timeZone?: string): any => {
  if (typeof endDate === 'string') {
    return endDate;
  }
  if (endDate && timeZone) {
    const utcTime = DateTimeParser.tz(endDate.clone(), timeZone);
    if (utcTime.hours() === 23 && utcTime.minutes() === 59) {
      return endDate.clone().endOf('minute').set('milliseconds', 0).format(`${DATE_FORMAT.DEFAULT}.SSS[Z]`);
    }
    return endDate.clone().subtract(1, 'second').set('milliseconds', 0).format(`${DATE_FORMAT.DEFAULT}.SSS[Z]`);
  }
};

const getStartTime = (date?: Maybe<string | DateTimeType>, timeZone?: string) => {
  if (typeof date === 'string') {
    return date;
  }
  if (date && timeZone) {
    return date.clone().startOf('minute').format(`${DATE_FORMAT.DEFAULT}.SSS[Z]`);
  }
};

const isEOD = (date?: Maybe<string> | Date | DateTimeType, timeZone?: string) => {
  if (date && timeZone) {
    const momentDate = DateTimeParser.tz(date, timeZone);
    return momentDate.isSame(momentDate.clone().endOf('day'));
  }
  return false;
};

export const DateUtils = {
  getHoursRange,
  isHoursValid,
  isHourActive,
  isEOD,
  getStartTime,
  getEndTime,
};
