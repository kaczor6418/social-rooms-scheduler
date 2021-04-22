import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cancelReservation, initializeWeekReservations, makeReservation } from './weekActions';
import { OperationState, Reservation, WeekDay, weekInitialState } from './weekState';
import { UTILS } from '../../../common/UTILS';
import { ARRAY_UTILS } from '../../../common/ARRAY_UTILS';

const findDayReservation = (
  days: WeekDay[],
  singleReservation: Reservation
): [WeekDay, Reservation | undefined] => {
  const dayReservation: [WeekDay, Reservation | undefined] = [days[0], undefined];
  for (const day of days) {
    if (singleReservation.startUTC.startsWith(day.dateUTC)) {
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
    }
  }
  return dayReservation;
};

const handleReservationAddition = (days: WeekDay[], singleReservation: Reservation) => {
  const [day, reservation] = findDayReservation(days, singleReservation);
  if (UTILS.isNullOrUndefined(reservation)) {
    day.reservations = [singleReservation];
  } else {
    reservation.people.push(singleReservation.people[0]);
  }
};

const handleReservationCancellation = (days: WeekDay[], singleReservation: Reservation) => {
  const [day, reservation] = findDayReservation(days, singleReservation);
  if (UTILS.isDefined(reservation)) {
    const indexOfReservationToDelete = day.reservations.indexOf(reservation);
    ARRAY_UTILS.removeElement(day.reservations, indexOfReservationToDelete);
  }
};

const weekSlice = createSlice({
  name: 'counter',
  initialState: weekInitialState,
  reducers: {
    addReservation: (state, { payload }: PayloadAction<Reservation>) => {
      handleReservationAddition(state.days, payload);
    },
    removeReservation: (state, { payload }: PayloadAction<Reservation>) => {
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
