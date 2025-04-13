import { ElementType, useEffect, useState } from 'react';
import { Calendar, CalendarProps, DateRange } from 'react-date-range';
import { TextFieldProps, Popper, Checkbox, ClickAwayListener } from '@/lib/material-ui';
import { CalendarIcon } from '@/lib/icons';
import { TIME_PICKER_END_DATE, TIME_PICKER_START_DATE } from '@/common/picker-options';
import DateTimeParser from '@/lib/date-time-parser';
import Button from '../button/button.component';
import SelectBase from '../select-base/select-base.component';
import { Oura1Input } from '../input';
import styles from './date-input.module.scss';

type TDateRange = { startDate: Date | undefined; endDate: Date | undefined };
type TDateType = Date | TDateRange;

type TDateInput = {
  RenderField?: ElementType;
  isTopMost?: boolean;
  closeOnClickAway?: boolean;
  className?: string;
  dateFormat?: string;
  range?: boolean;
  time?: boolean;
  date?: TDateType;
  inputProps?: TextFieldProps;
  clearable?: boolean;
  calendarProps?: Omit<CalendarProps, 'onChange' | 'months' | 'ranges' | 'date'>;
  handleDateChange: (date: TDateType) => void;
};

const RANGE_DEFAULT_DATE = { startDate: new Date(), endDate: new Date() };
const DEFAULT_DATE = new Date();

const DateInput: React.FC<TDateInput> = (props: TDateInput) => {
  const {
    isTopMost,
    date,
    range,
    time,
    closeOnClickAway,
    RenderField,
    inputProps,
    dateFormat,
    calendarProps,
    className,
    clearable,
    handleDateChange,
  } = props;
  const [selectedDate, setSelectedDate] = useState<TDateType>(date ?? (range ? RANGE_DEFAULT_DATE : DEFAULT_DATE));
  const [startTime, setStartTime] = useState<string>(
    DateTimeParser((date as any)?.startDate || date || new Date()).format('HH:mm'),
  );
  const [endTime, setEndTime] = useState<string>(
    DateTimeParser((date as any)?.endDate || date || new Date()).format('HH:mm'),
  );
  const [immediateStart, setImmediateStart] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const isRangeInstance = range && date && 'startDate' in date && 'endDate' in date;

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const onCancelClick = () => {
    setAnchorEl(null);
  };

  const onClearClick = () => {
    setAnchorEl(null);
    handleDateChange({ startDate: undefined, endDate: undefined });
    setSelectedDate({
      startDate: undefined,
      endDate: undefined,
    });
  };

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  const onSetClick = () => {
    onCancelClick();
    if (time) {
      const [startHour, startMinute] = (startTime ?? '0:0').split(':');
      const startDateTime = DateTimeParser((selectedDate as any)?.startDate ?? selectedDate)
        .set('hours', Number(startHour))
        .set('minutes', Number(startMinute))
        .toDate();
      if (isRangeInstance) {
        const [endHour, endMinute] = (endTime ?? '0:0').split(':');
        const endDateTime = DateTimeParser((selectedDate as any).endDate)
          .set('hours', Number(endHour))
          .set('minutes', Number(endMinute))
          .toDate();
        handleDateChange({ startDate: startDateTime, endDate: endDateTime });
        return;
      }
      handleDateChange(startDateTime);
      return;
    }
    handleDateChange(selectedDate);
  };

  const dateFieldRenderValue = () => {
    if (isRangeInstance) {
      return date?.startDate === undefined
        ? 'All Date'
        : `${DateTimeParser(date?.startDate).format(dateFormat)} - ${DateTimeParser(date?.endDate).format(dateFormat)}`;
    } else {
      return DateTimeParser(date as Date).format(dateFormat);
    }
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (closeOnClickAway) {
          onCancelClick();
        }
      }}
    >
      <div className={`${styles.container} ${className}`}>
        {RenderField ? (
          <RenderField onClick={handleClick} />
        ) : (
          <Oura1Input
            {...inputProps}
            value={dateFieldRenderValue()}
            onChange={handleClick}
            onBlur={onCancelClick}
            error={false}
            helperText=""
            inputRef={null}
            placeholder="Select Date"
            disabled={false}
            data-cy={isRangeInstance ? 'range-picker' : 'date-picker'}
          />
        )}
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          modifiers={[
            {
              name: 'preventOverflow',
              enabled: true,
              options: {
                altAxis: true,
                altBoundary: true,
                tether: true,
                rootBoundary: 'document',
                padding: 4,
              },
            },
          ]}
          sx={{ ...(isTopMost && { zIndex: 1500 }) }}
        >
          <div className={styles.date_picker_container}>
            {isRangeInstance ? (
              <DateRange
                {...calendarProps}
                months={2}
                direction="horizontal"
                showMonthAndYearPickers={false}
                className={`${styles.calendar} ${calendarProps?.className ?? ''}`}
                ranges={[{ ...selectedDate, key: 'selection' }]}
                onChange={({ selection }) => {
                  const { startDate, endDate } = selection;
                  setSelectedDate({ startDate: startDate as Date, endDate: endDate as Date });
                }}
                data-testid="calendar-select"
              />
            ) : (
              <Calendar
                {...calendarProps}
                showMonthAndYearPickers={true}
                direction="horizontal"
                className={`${styles.calendar} ${calendarProps?.className ?? ''}`}
                date={selectedDate as Date}
                onChange={newDate => setSelectedDate(newDate)}
              />
            )}
            {time && (
              <div className={styles.time_input_container}>
                <div className={styles.time_input}>
                  <div className={styles.label_wrapper}>
                    <p className={styles.label}>{isRangeInstance ? 'Starting Time' : 'Time'}</p>
                    <Button
                      variant="text"
                      title="Immediately"
                      className={styles.checkbox}
                      onClick={() => {
                        if (!immediateStart) {
                          const minDate = calendarProps?.minDate ?? new Date();
                          setSelectedDate((prev: any) =>
                            prev.startDate
                              ? {
                                  ...prev,
                                  startDate: minDate,
                                }
                              : minDate,
                          );
                        }
                        setImmediateStart(prevVal => !prevVal);
                      }}
                      IconComponent={() => <Checkbox checked={immediateStart} />}
                    />
                  </div>
                  <SelectBase
                    options={TIME_PICKER_START_DATE}
                    value={startTime ?? DateTimeParser((date as any)?.startDate || date || new Date()).format('HH:mm')}
                    disabled={immediateStart}
                    onChange={({ target }) => setStartTime(target.value as any)}
                  />
                </div>
                {isRangeInstance && (
                  <div className={styles.time_input}>
                    <div className={styles.label_wrapper}>
                      <p className={styles.label}>Ending Time</p>
                    </div>
                    <SelectBase
                      options={[...TIME_PICKER_END_DATE, { label: '23: 59', value: '23:59' }]}
                      value={endTime ?? DateTimeParser((date as any)?.endDate || date || new Date()).format('HH:mm')}
                      onChange={({ target }) => setEndTime(target.value as any)}
                    />
                  </div>
                )}
              </div>
            )}
            <div className={styles.footer}>
              {clearable ? (
                <Button title="Clear" variant="secondary" onClick={onClearClick} />
              ) : (
                <Button title="Cancel" variant="secondary" onClick={onCancelClick} />
              )}
              <Button title="Set" variant="primary" onClick={onSetClick} data-testid="continue-action" />
            </div>
          </div>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

DateInput.defaultProps = {
  className: '',
  dateFormat: 'MMM DD, YYYY',
  range: false,
  time: false,
  date: undefined,
  isTopMost: false,
  RenderField: undefined,
  clearable: false,
  inputProps: {
    placeholder: 'Select Date',
    disabled: false,
    InputProps: {
      endAdornment: <CalendarIcon />,
    },
  },
  calendarProps: {},
  closeOnClickAway: false,
};

export default DateInput;
