import React from 'react';
import { TimeCard } from '../../atoms/timeCard/TimeCard';
import { DayProps } from './DayProps';

export function Day({ day, timeRange, timeStep }: DayProps) {
  const [start, end] = timeRange;
  console.log(start, end, timeStep);
  return (
    <div>
      Day
      <h1>{day.dateUTC}</h1>
      <TimeCard reservations={day.reservations} />
    </div>
  );
}
