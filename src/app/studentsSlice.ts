import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Course,
  Student,
  Visiting,
  StudentGrades,
  EstimateStudent,
  StudentsState,
} from './types';
import axios from 'axios';
import toast from 'react-hot-toast';
import { percentVisiting } from '../helpers/percentVisiting';

const initialState: StudentsState = {
  course: null,
  courses: [],
  student: null,
  students: [],
  visiting: [],
  studentsGrades: [],
  loading: false,
  error: false,
  studentErrorInput: false,
  courseErrorInput: false,
  quantityGradesErrorInput: false,
  visitErrorInput: false,
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

export const getStudentsGrades = createAsyncThunk<
  StudentGrades[],
  number | null,
  { rejectValue: string }
>(
  'store/getStudentsGrades',
  async (studentId: number | null, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/studentsRating`);

      const filteredData = data.filter(
        (grades: { studentId: number }) => grades.studentId === studentId,
      );
      if (studentId === null) {
        return data;
      } else {
        filteredData;
      }
      return filteredData;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Server Error!');
    }
  },
);

export const estimateStudent = createAsyncThunk<
  StudentGrades[],
  { gradesDB: EstimateStudent; studentsGrades: StudentGrades[] | null },
  { rejectValue: string }
>(
  'store/estimateStudent',
  async ({ gradesDB, studentsGrades }, { rejectWithValue }) => {
    try {
      const studentGrades = studentsGrades?.find(
        (el) =>
          el.studentId === gradesDB.studentId &&
          el.courseId === gradesDB.courseId,
      );
      if (studentGrades) {
        const newGrades = [...studentGrades.grades, ...gradesDB.grades];

        const newVisiting = [...studentGrades.visiting, ...gradesDB.visiting];

        const newAverageGrade =
          newGrades.reduce((acc, number) => acc + number, 0) / newGrades.length;

        const newAttestation = percentVisiting(newVisiting, 1, newAverageGrade);

        const { data } = await axios.put(
          `http://localhost:3001/studentsRating/${studentGrades.id}`,
          {
            id: studentGrades.id,
            studentId: studentGrades.studentId,
            courseId: studentGrades.courseId,
            grades: newGrades,
            visiting: newVisiting,
            averageGrade: newAverageGrade,
            attestation: newAttestation,
          },
        );

        toast.success('Данные добавлены');
        return data;
      } else {
        const { data } = await axios.post(
          `http://localhost:3001/studentsRating`,
          gradesDB,
        );
        toast.success('Данные добавлены');
        return data;
      }
    } catch (error) {
      toast.error('Ошибка на сервере');
      return rejectWithValue('Server Error!');
    }
  },
);

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setNameError(state) {
      state.studentErrorInput = true;
    },
    clearNameError(state) {
      state.studentErrorInput = false;
    },
    setCourseError(state) {
      state.courseErrorInput = true;
    },
    clearCourseError(state) {
      state.courseErrorInput = false;
    },
    setVisitError(state) {
      state.visitErrorInput = true;
    },
    clearVisitError(state) {
      state.visitErrorInput = false;
    },
    setQuantityError(state) {
      state.quantityGradesErrorInput = true;
    },
    clearQuantityError(state) {
      state.quantityGradesErrorInput = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(getSingleCourse.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSingleCourse.fulfilled, (state, action) => {
        state.course = action.payload;
      })
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(getSingleStudent.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSingleStudent.fulfilled, (state, action) => {
        state.student = action.payload;
      })
      .addCase(getVisiting.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getVisiting.fulfilled, (state, action) => {
        state.loading = false;
        state.visiting = action.payload;
      })
      .addCase(getStudentsGrades.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getStudentsGrades.fulfilled, (state, action) => {
        state.studentsGrades = action.payload;
      })
      .addCase(estimateStudent.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(estimateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsGrades = action.payload;
      });
  },
});

export const {
  setNameError,
  clearNameError,
  setCourseError,
  clearCourseError,
  setVisitError,
  clearVisitError,
  setQuantityError,
  clearQuantityError,
} = studentsSlice.actions;

export default studentsSlice.reducer;
