import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import studentsSlise from './mainSlice';

export const store = configureStore({
  reducer: {
    slice: studentsSlise,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
