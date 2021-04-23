import React from 'react';
import { TimeCardProps } from './TimeCardProps';

export function TimeCard({ reservations }: TimeCardProps) {
  return (
    <div>
      <h2>Start: {reservations[0].startUTC}</h2>
      <h2>End: {reservations[0].endUTC}</h2>
    </div>
  );
}
