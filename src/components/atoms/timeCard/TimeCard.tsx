import React from 'react';
import { isEmpty } from '../../../common/ARRAY_UTILS';
import { TimeCardProps } from './TimeCardProps';

export function TimeCard({ reservations, timeRange }: TimeCardProps) {
  const hasReservations = () => isEmpty(reservations);
  const uniqueKey = (start: string, end: string) => `${start};${end}`;
  return (
    <div>
      --------------------------TIME CARD START: {timeRange[0]}
      {hasReservations() &&
        reservations.map(({ people, endUTC, startUTC }) => (
          <div key={uniqueKey(startUTC, endUTC)}>
            <p>Start: {startUTC}</p>
            <p>End: {endUTC}</p>
            <p>People: {JSON.stringify(people)}</p>
          </div>
        ))}
      --------------------------TIME CARD END: {timeRange[1]}
    </div>
  );
}
