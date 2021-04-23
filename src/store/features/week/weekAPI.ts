import { Reservation, WeekDay } from './weekState';
import { SCHEDULE_URL } from '../../../common/CONSTANTS';

export async function fetchWeek(): Promise<WeekDay[]> {
  return fetch(SCHEDULE_URL).then((res) => res.json()) as Promise<WeekDay[]>;
}

export async function askForMakingReservation(reservation: Reservation): Promise<Reservation> {
  return new Promise((resolve) => setTimeout(() => resolve(reservation), 500));
}

export async function askForReservationCancellation(
  reservation: Reservation
): Promise<Reservation> {
  return new Promise((resolve) => setTimeout(() => resolve(reservation), 500));
}
