import { Person } from '../weekState';

export interface SingleReservation {
  dateUTC: string;
  startUTC: string;
  endUTC: string;
  booking: Person;
}
