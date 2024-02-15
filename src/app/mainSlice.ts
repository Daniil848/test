import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface Course {
  id: number;
  name: string;
}
export interface Student {
  id: number;
  name: string;
  courses: [courseId: number, rating: number[], visiting: boolean[]];
}
export interface State {
  courses: Course[] | null;
  students: Student[] | null;
  loading: boolean;
  error: boolean | null;
}

const initialState: State = {
  courses: [],
  students: [],
  loading: false,
  error: false,
};

export const getCouses = createAsyncThunk<
  Course[],
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

export const getStudents = createAsyncThunk<
  Student[],
  void,
  { rejectValue: string }
>('store/getStudents', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3001/students', {
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
      })
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      });
  },
});

// export const {} = mainSlice.actions;

export default mainSlice.reducer;
