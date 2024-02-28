import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import studentsSlise from './studentsSlice';
import rickAndMortySlice from './rickAndMortySlice';

export const store = configureStore({
  reducer: {
    students: studentsSlise,
    rickAndMorty: rickAndMortySlice,
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
