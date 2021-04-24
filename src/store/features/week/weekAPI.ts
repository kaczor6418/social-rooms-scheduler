import { WeekDay } from './weekState';
import { SCHEDULE_URL } from '../../../common/CONSTANTS';
import { SingleReservation } from './interfaces/SingleReservation';

export async function fetchWeek(): Promise<WeekDay[]> {
  return fetch(SCHEDULE_URL).then((res) => res.json()) as Promise<WeekDay[]>;
}

export async function askForMakingReservation(
  reservation: SingleReservation
): Promise<SingleReservation> {
  return new Promise((resolve) => setTimeout(() => resolve(reservation), 500));
}

export async function askForReservationCancellation(
  reservation: SingleReservation
): Promise<SingleReservation> {
  return new Promise((resolve) => setTimeout(() => resolve(reservation), 500));
}
