import React from 'react';
import { TimeCard } from '../../atoms/timeCard/TimeCard';
import { DayProps } from './DayProps';
import { TimeNumberConverter } from '../../../converters/TimeNumberConverter';

export function Day({ day, timeRange, timeStep }: DayProps) {
  const [start, end] = timeRange;
  const timeConverter = new TimeNumberConverter(':');
  const timeRanges: Array<[number, number]> = [];
  for (let i = start; i < end; i += timeStep) {
    timeRanges.push([i, i + timeStep]);
  }

  const getReservationsFromRange = ([rangeStart, rangeEnd]: [number, number]) =>
    day.reservations.filter(({ startUTC, endUTC }) => {
      const reservationStart = timeConverter.toNumberFromTime(startUTC);
      const reservationEnd = timeConverter.toNumberFromTime(endUTC);
      return reservationStart <= rangeEnd && reservationEnd > rangeStart;
    });

  const createUniqueTimeCardKey = ([rangeStart, rangeEnd]: [number, number]): string =>
    `${rangeStart}-${rangeEnd}`;

  return (
    <div>
      <h2>{day.dateUTC}</h2>
      {timeRanges.map((range) => (
        <TimeCard
          key={createUniqueTimeCardKey(range)}
          timeRange={range}
          reservations={getReservationsFromRange(range)}
        />
      ))}
    </div>
  );
}
