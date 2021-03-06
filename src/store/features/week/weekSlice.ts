import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isDefined, isNullOrUndefined } from '../../../common/UTILS';
import { cancelReservation, initializeWeekReservations, makeReservation } from './weekActions';
import { OperationState, Reservation, WeekDay, weekInitialState } from './weekState';
import { removeArrayElement } from '../../../common/ARRAY_UTILS';
import { SingleReservation } from './interfaces/SingleReservation';

const findDayReservation = (
  days: WeekDay[],
  singleReservation: SingleReservation
): [WeekDay | null, Reservation | null] => {
  const dayReservation: [WeekDay | null, Reservation | null] = [null, null];
  for (const day of days) {
    if (singleReservation.dateUTC === day.dateUTC) {
      dayReservation[0] = day;
      for (const reservation of day.reservations) {
        if (
          reservation.startUTC === singleReservation.startUTC &&
          reservation.endUTC === singleReservation.endUTC
        ) {
          dayReservation[1] = reservation;
          break;
        }
      }
      break;
    }
  }
  return dayReservation;
};

const handleReservationAddition = (days: WeekDay[], singleReservation: SingleReservation) => {
  const [day, reservation] = findDayReservation(days, singleReservation);
  if (isNullOrUndefined(day)) {
    throw new Error(`Day: ${singleReservation.dateUTC} doesn't exists in current week`);
  }
  if (isNullOrUndefined(reservation)) {
    day.reservations.push({ ...singleReservation, people: [singleReservation.booking] });
  } else {
    reservation.people.push(singleReservation.booking);
  }
};

const handleReservationCancellation = (days: WeekDay[], singleReservation: SingleReservation) => {
  const [day, reservation] = findDayReservation(days, singleReservation);
  if (isNullOrUndefined(day)) {
    throw new Error(`Day: ${singleReservation.dateUTC} doesn't exists in current week`);
  }
  if (isDefined(reservation)) {
    const indexOfReservationToDelete = day.reservations.indexOf(reservation);
    removeArrayElement(day.reservations, indexOfReservationToDelete);
  }
};

const weekSlice = createSlice({
  name: 'counter',
  initialState: weekInitialState,
  reducers: {
    addReservation: (state, { payload }: PayloadAction<SingleReservation>) => {
      handleReservationAddition(state.days, payload);
    },
    removeReservation: (state, { payload }: PayloadAction<SingleReservation>) => {
      handleReservationCancellation(state.days, payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeReservation.pending, (state) => {
        state.currentOperationState = OperationState.LOADING;
      })
      .addCase(makeReservation.rejected, (state) => {
        state.currentOperationState = OperationState.FAILED;
      })
      .addCase(makeReservation.fulfilled, (state, { payload }) => {
        state.currentOperationState = OperationState.IDLE;
        handleReservationAddition(state.days, payload);
      })
      .addCase(cancelReservation.pending, (state) => {
        state.currentOperationState = OperationState.LOADING;
      })
      .addCase(cancelReservation.rejected, (state) => {
        state.currentOperationState = OperationState.FAILED;
      })
      .addCase(cancelReservation.fulfilled, (state, { payload }) => {
        state.currentOperationState = OperationState.IDLE;
        handleReservationCancellation(state.days, payload);
      })
      .addCase(initializeWeekReservations.pending, (state) => {
        state.currentOperationState = OperationState.LOADING;
      })
      .addCase(initializeWeekReservations.rejected, (state) => {
        state.currentOperationState = OperationState.FAILED;
      })
      .addCase(initializeWeekReservations.fulfilled, (state, { payload }) => {
        state.currentOperationState = OperationState.IDLE;
        state.days = payload;
      });
  }
});

export const weekReducer = weekSlice.reducer;
