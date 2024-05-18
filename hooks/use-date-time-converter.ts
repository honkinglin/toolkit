import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  formatISO,
  formatISO9075,
  formatRFC3339,
  formatRFC7231,
  fromUnixTime,
  getTime,
  getUnixTime,
  isDate,
  isValid,
  parseISO,
} from 'date-fns';
import type { DateFormat, ToDateMapper } from '@/app/[locale]/date-time-converter/date-time-converter.types';
import {
  dateToExcelFormat,
  excelFormatToDate,
  isExcelFormat,
  isISO8601DateTimeString,
  isISO9075DateString,
  isMongoObjectId,
  isRFC3339DateString,
  isRFC7231DateString,
  isTimestamp,
  isUTCDateString,
  isUnixTimestamp,
} from '@/app/[locale]/date-time-converter/date-time-converter.models';

export function useDateTimeConverter() {
  const [inputDate, setInputDate] = useState('');
  const [formatIndex, setFormatIndex] = useState(6);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time frequently for millisecond precision using requestAnimationFrame
  useEffect(() => {
    setCurrentTime(new Date());

    let animationId: number;

    const updateTime = () => {
      setCurrentTime(new Date());
      animationId = requestAnimationFrame(updateTime);
    };

    animationId = requestAnimationFrame(updateTime);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const toDate: ToDateMapper = (date: string) => new Date(date);

  const formats: DateFormat[] = useMemo(
    () => [
      {
        name: 'JS locale date string',
        fromDate: (date: Date) => date.toString(),
        toDate,
        formatMatcher: () => false,
      },
      {
        name: 'ISO 8601',
        fromDate: formatISO,
        toDate: parseISO,
        formatMatcher: (date: string) => isISO8601DateTimeString(date),
      },
      {
        name: 'ISO 9075',
        fromDate: formatISO9075,
        toDate: parseISO,
        formatMatcher: (date: string) => isISO9075DateString(date),
      },
      {
        name: 'RFC 3339',
        fromDate: formatRFC3339,
        toDate,
        formatMatcher: (date: string) => isRFC3339DateString(date),
      },
      {
        name: 'RFC 7231',
        fromDate: formatRFC7231,
        toDate,
        formatMatcher: (date: string) => isRFC7231DateString(date),
      },
      {
        name: 'Unix timestamp',
        fromDate: (date: Date) => String(getUnixTime(date)),
        toDate: (sec: string) => fromUnixTime(+sec),
        formatMatcher: (date: string) => isUnixTimestamp(date),
      },
      {
        name: 'Timestamp',
        fromDate: (date: Date) => String(getTime(date)),
        toDate: (ms: string) => new Date(+ms),
        formatMatcher: (date: string) => isTimestamp(date),
      },
      {
        name: 'UTC format',
        fromDate: (date: Date) => date.toUTCString(),
        toDate,
        formatMatcher: (date: string) => isUTCDateString(date),
      },
      {
        name: 'Mongo ObjectID',
        fromDate: (date: Date) =>
          `${Math.floor(date.getTime() / 1000).toString(16)}0000000000000000`,
        toDate: (objectId: string) =>
          new Date(Number.parseInt(objectId.substring(0, 8), 16) * 1000),
        formatMatcher: (date: string) => isMongoObjectId(date),
      },
      {
        name: 'Excel date/time',
        fromDate: (date: Date) => dateToExcelFormat(date),
        toDate: excelFormatToDate,
        formatMatcher: isExcelFormat,
      },
    ],
    []
  );

  const normalizedDate = useMemo(() => {
    if (!inputDate) {
      return currentTime;
    }

    const { toDate } = formats[formatIndex];

    try {
      return toDate(inputDate);
    } catch {
      return undefined;
    }
  }, [inputDate, formatIndex, currentTime, formats]);

  const onDateInputChanged = useCallback(
    (value: string) => {
      setInputDate(value);
      const matchingIndex = formats.findIndex(({ formatMatcher }) => formatMatcher(value));
      if (matchingIndex !== -1) {
        setFormatIndex(matchingIndex);
      }
    },
    [formats]
  );

  const isValidDate = useMemo(() => {
    if (inputDate === '') {
      return true;
    }

    try {
      const maybeDate = formats[formatIndex].toDate(inputDate);
      return isDate(maybeDate) && isValid(maybeDate);
    } catch {
      return false;
    }
  }, [inputDate, formatIndex, formats]);

  const formatDateUsingFormatter = useCallback(
    (formatter: (date: Date) => string, date?: Date) => {
      if (!date || !isValidDate) {
        return '';
      }

      try {
        return formatter(date);
      } catch {
        return '';
      }
    },
    [isValidDate]
  );

  return {
    inputDate,
    setInputDate: onDateInputChanged,
    formatIndex,
    setFormatIndex,
    formats,
    normalizedDate,
    isValidDate,
    formatDateUsingFormatter,
  };
}
