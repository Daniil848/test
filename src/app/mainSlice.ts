import { createSlice } from '@reduxjs/toolkit';

export interface State {

}

const initialState: State = {

};

export const mainSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
  },
});

export const { } = mainSlice.actions;

export default mainSlice.reducer;
