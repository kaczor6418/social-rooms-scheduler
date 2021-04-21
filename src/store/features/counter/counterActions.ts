import { AppThunk } from '../../store';
import { selectCount } from './counterSelectors';
import { incrementByAmount } from './counterSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

export const incrementIfOdd = (amount: number): AppThunk => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount: number) => {
  const response = await fetchCount(amount);
  return response.data;
});
