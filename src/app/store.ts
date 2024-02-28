import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import studentsSlise from './studentsSlice';

export const store = configureStore({
  reducer: {
    students: studentsSlise,
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
