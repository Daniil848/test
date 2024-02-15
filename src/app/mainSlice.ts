import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface State {
  courses: string[] | null;
  loading: boolean;
  error: boolean | null;
}

const initialState: State = {
  courses: [],
  loading: false,
  error: false,
};

export const getCouses = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>('store/getCourses', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3001/courses', {
      method: 'GET',
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const mainSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCouses.fulfilled, (state, action) => {
        state.courses = action.payload;
      });
  },
});

// export const {} = mainSlice.actions;

export default mainSlice.reducer;
