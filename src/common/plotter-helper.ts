import { Moment } from 'moment';
import DateTimeParser, { DateTimeType } from '@/lib/date-time-parser';
import { DATE_FORMAT } from './constants';

type TDataArr = {
  key: string;
  value: any[];
};

export const ChartDataPlotter = (
  slot: { startDate: Date; endDate: Date },
  res?: TDataArr[],
  getParsedDate: any = () => {},
) => {
  let startDate = DateTimeParser(slot.startDate);
  const endDate = DateTimeParser(slot.endDate);
  const finalResult: any = [];
  if (!res) {
    return finalResult;
  }

  const helperNew = (date: Moment) => {
    const allObj = res.reduce((acc, item) => {
      return {
        ...acc,
        [item.key]:
          item.value?.find(
            val =>
              DateTimeParser(val?.timestamp).format(DATE_FORMAT.YYYY_MM_DD) === date.format(DATE_FORMAT.YYYY_MM_DD),
          )?.value || null,
      };
    }, {});
    return {
      ...allObj,
      timestamp: getParsedDate(date, DATE_FORMAT.DEFAULT),
    };
  };
  while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
    const currentVal = helperNew(startDate);
    finalResult.push(currentVal);
    startDate = startDate.add(1, 'day');
  }

  return finalResult;
};

export const LineChartDataPlotter = (
  slot: { startDate: DateTimeType | string; endDate: DateTimeType | string },
  res?: any[],
  getParsedDate: any = () => {},
) => {
  const finalResult: any[] = [];
  const resMap: Map<string, any> = new Map();

  if (res) {
    res.forEach(entry => {
      resMap.set(entry.key, entry.value);
    });
  }

  const current = resMap.get('cv');
  const prev = resMap.get('pv');
  const mergedData = prev ? [...prev] : [];
  if (current) {
    mergedData.push(...current);
  }

  const startDate = typeof slot.startDate === 'string' ? DateTimeParser(slot.startDate) : slot.startDate.clone();
  const endDate = typeof slot.endDate === 'string' ? DateTimeParser(slot.endDate) : slot.endDate.clone();
  const dayDiff = endDate.diff(startDate, 'days');
  const prevDate = startDate.clone().subtract(dayDiff + 1, 'days');

  while (startDate.isSameOrBefore(endDate)) {
    const currentDate = startDate.format(DATE_FORMAT.YYYYMMDD);
    const previousDate = prevDate.format(DATE_FORMAT.YYYYMMDD);
    const someObj = {
      cv: null,
      timestamp: getParsedDate(startDate, DATE_FORMAT.DD_MMM_YYYY),
      pv: null,
    };

    mergedData.forEach(entry => {
      if (entry.timestamp === currentDate) {
        someObj.cv = entry.value;
      } else if (entry.timestamp === previousDate) {
        someObj.pv = entry.value;
      }
    });
    finalResult.push(someObj);
    startDate.add(1, 'day');
    prevDate.add(1, 'day');
  }

  return finalResult;
};
