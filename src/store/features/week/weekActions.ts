import { createAsyncThunk } from '@reduxjs/toolkit';
import { SingleReservation } from './interfaces/SingleReservation';
import { askForMakingReservation, askForReservationCancellation, fetchWeek } from './weekAPI';

export const makeReservation = createAsyncThunk(
  'week/makeReservation',
  async (reservation: SingleReservation) => {
    await askForMakingReservation(reservation);
    return reservation;
  }
);

export const cancelReservation = createAsyncThunk(
  'week/cancelReservation',
  async (reservation: SingleReservation) => {
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
