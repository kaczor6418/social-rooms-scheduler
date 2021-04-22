import { createAsyncThunk } from '@reduxjs/toolkit';
import { askForMakingReservation, askForReservationCancellation, fetchWeek } from './weekAPI';
import { Reservation } from './weekState';

export const makeReservation = createAsyncThunk(
  'week/makeReservation',
  async (reservation: Reservation) => {
    await askForMakingReservation(reservation);
    return reservation;
  }
);

export const cancelReservation = createAsyncThunk(
  'week/cancelReservation',
  async (reservation: Reservation) => {
    await askForReservationCancellation(reservation);
    return reservation;
  }
);

export const initializeWeekReservations = createAsyncThunk(
  'week/initializeWeekReservations',
  async () => {
    return fetchWeek();
  }
);
