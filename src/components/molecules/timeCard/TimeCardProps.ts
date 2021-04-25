import { Reservation } from '../../../store/features/week/weekState';

export interface TimeCardProps {
  timeRange: [number, number];
  reservations: Reservation[];
}
