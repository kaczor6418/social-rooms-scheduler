export interface Person {
  firstName: string;
  lastName: string;
  roomNumber: number;
}

export interface Reservation {
  startUTC: string;
  endUTC: string;
  people: Person[];
}

export interface WeekDay {
  dateUTC: string;
  reservations: Reservation[];
}

export enum OperationState {
  LOADING = 'LOADING',
  FAILED = 'FAILED',
  IDLE = 'IDLE'
}

export interface WeekState {
  currentOperationState: OperationState;
  days: WeekDay[];
}

export const weekInitialState: WeekState = {
  currentOperationState: OperationState.IDLE,
  days: []
};
