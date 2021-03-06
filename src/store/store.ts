import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { weekReducer } from './features/week/weekSlice';

export const store = configureStore({
  reducer: {
    week: weekReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
