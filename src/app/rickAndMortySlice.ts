import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export interface rickAndMortyState {
  loading: boolean;
  error: boolean;
}

const initialState: rickAndMortyState = {
  loading: false,
  error: false,
};

export const rickAndMortySlice = createSlice({
  name: 'rickAndMorty',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default rickAndMortySlice.reducer;
