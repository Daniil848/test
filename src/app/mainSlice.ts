import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Course {
  id: number;
  name: string;
}
export interface Student {
  id: number;
  name: string;
}
export interface Visiting {
  id: number;
  value: string;
}
export interface StudentRating {
  id: number;
  studentId: number;
  courseId: number;
  visiting: number[];
  grades: number[];
}
export interface EstimateStudent {
  studentId: number;
  courseId: number;
  visiting: number[];
  grades: number[];
}
export interface State {
  course: Course | null;
  courses: Course[] | null;
  student: Student | null;
  students: Student[] | null;
  visiting: Visiting[] | null;
  studentsRating: StudentRating[] | null;
  loading: boolean;
  error: boolean | null;
}

const initialState: State = {
  course: null,
  courses: [],
  student: null,
  students: [],
  visiting: [],
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
    const { data } = await axios.get('http://localhost:3001/courses');
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
    const { data } = await axios.get(`http://localhost:3001/courses/${id}`);
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
    const { data } = await axios.get('http://localhost:3001/students');
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
    const { data } = await axios.get(`http://localhost:3001/students/${id}`);

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getVisiting = createAsyncThunk<
  Visiting[],
  void,
  { rejectValue: string }
>('store/getVisiting', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('http://localhost:3001/visiting');
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getStudentsRating = createAsyncThunk<
  StudentRating[],
  void,
  { rejectValue: string }
>('store/getStudentsRating', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/studentsRating`);

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const estimateStudent = createAsyncThunk<
  StudentRating,
  { rating: EstimateStudent; studentsRating: StudentRating[] | null },
  { rejectValue: string }
>(
  'store/estimateStudent',
  async ({ rating, studentsRating }, { rejectWithValue }) => {
    try {
      const studentRating = studentsRating?.find(
        (el) =>
          el.studentId === rating.studentId && el.courseId === rating.courseId,
      );
      if (studentRating) {
        const newGrades = [...studentRating.grades, ...rating.grades];
        const newVisiting = [...studentRating.visiting, ...rating.visiting];
        const { data } = await axios.put(
          `http://localhost:3001/studentsRating/${studentRating.id}`,
          {
            id: studentRating.id,
            studentId: studentRating.studentId,
            courseId: studentRating.courseId,
            visiting: newVisiting,
            grades: newGrades,
          },
        );
        console.log(1);
        return data;
      } else {
        const { data } = await axios.post(
          `http://localhost:3001/studentsRating`,
          rating,
        );
        return data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue('Server Error!');
    }
  },
);

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
      })
      .addCase(getVisiting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVisiting.fulfilled, (state, action) => {
        state.loading = false;
        state.visiting = action.payload;
      })
      .addCase(getStudentsRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentsRating.fulfilled, (state, action) => {
        state.studentsRating = action.payload;
      })
      .addCase(estimateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(estimateStudent.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

// export const {} = mainSlice.actions;

export default mainSlice.reducer;
