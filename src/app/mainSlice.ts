import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface Course {
  id: number;
  name: string;
}
export interface Student {
  id: number;
  name: string;
}
export interface StudentRating {
  id: string;
  studentId: number;
  courseId: number;
  grades: number[];
}
export interface EstimateStudent {
  studentId: number;
  courseId: number;
  grades: number[];
}
export interface State {
  course: Course | null;
  courses: Course[] | null;
  student: Student | null;
  students: Student[] | null;
  studentsRating: StudentRating[] | null;
  loading: boolean;
  error: boolean | null;
}

const initialState: State = {
  course: null,
  courses: [],
  student: null,
  students: [],
  studentsRating: [],
  loading: false,
  error: false,
};

export const getCourses = createAsyncThunk<
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

export const getSingleCourse = createAsyncThunk<
  Course,
  number,
  { rejectValue: string }
>('store/getSingleCourse', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3001/courses/${id}`, {
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

export const getSingleStudent = createAsyncThunk<
  Student,
  number,
  { rejectValue: string }
>('store/getSingleStudent', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3001/students/${id}`, {
      method: 'GET',
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const estimateStudent = createAsyncThunk<
  StudentRating,
  EstimateStudent,
  { rejectValue: string }
>('store/getSingleStudent', async (rating, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3001/studentsRating`, {
      method: 'post',
      body: JSON.stringify(rating),
    });

    return response.json();
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
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(getSingleCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleCourse.fulfilled, (state, action) => {
        state.course = action.payload;
      })
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(getSingleStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleStudent.fulfilled, (state, action) => {
        state.student = action.payload;
      });
  },
});

// export const {} = mainSlice.actions;

export default mainSlice.reducer;
