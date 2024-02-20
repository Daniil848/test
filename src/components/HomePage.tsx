import React from 'react';
import { Stack, TextField, Button, MenuItem, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';
import {
  getCourses,
  getStudents,
  getVisiting,
  estimateStudent,
  getStudentsGrades,
  setNameError,
  clearNameError,
  setCourseError,
  clearCourseError,
  setVisitError,
  clearVisitError,
} from '../app/mainSlice';
import { EstimateStudent } from '../app/types';

const HomePage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();

  const [studentID, setStudentID] = useState<number>(0);
  const [courseID, setCourseID] = useState<number>(0);
  const [quantityInputs, setQuantityInputs] = useState<number>(0);
  const [grades, setGrades] = useState<number[]>([]);
  const [visit, setVisit] = useState<number[]>([]);

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getStudents());
    dispatch(getVisiting());
    dispatch(getStudentsGrades(null));
  }, [dispatch, grades, visit]);

  const handleRatingChange = (index: number, value: number) => {
    setGrades((prevGrades) => {
      const newGrades = [...prevGrades];
      newGrades[index] = value;
      return newGrades;
    });
  };

  const handleVisitingChange = (index: number, value: number) => {
    setVisit((prevVisit) => {
      const newVisit = [...prevVisit];
      newVisit[index] = value;
      return newVisit;
    });
  };

  const handleEstimate = (gradesDB: EstimateStudent) => {
    studentID === 0 ? dispatch(setNameError()) : dispatch(clearNameError());
    courseID === 0 ? dispatch(setCourseError()) : dispatch(clearCourseError());
    visit.length != quantityInputs
      ? dispatch(setVisitError())
      : dispatch(clearVisitError());

    if (
      !state.studentErrorInput &&
      !state.courseErrorInput &&
      !state.visitErrorInput
    ) {
      dispatch(
        estimateStudent({
          gradesDB: gradesDB,
          studentsGrades: state.studentsGrades,
        }),
      );
      setQuantityInputs(0);
      setGrades([]);
      setVisit([]);
    }
  };

  const averageGrade =
    grades.reduce((acc, number) => acc + number, 0) / grades.length;

  const gradesDB: EstimateStudent = {
    studentId: studentID,
    courseId: courseID,
    visiting: visit,
    grades: grades,
    averageGrade: averageGrade,
  };

  const styles = {
    form: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      flexGrow: 1,
      width: '450px',
      margin: 'auto',
    },
    textField: {
      textAlign: 'start',
    },
    grades: {
      display: 'flex',
      gap: 2,
    },
    gradesGrade: {
      flexBasis: '35%',
    },
    gradesVisit: {
      flexBasis: '65%',
      textAlign: 'start',
    },
  };

  if (
    !state.courses ||
    !state.students ||
    !state.visiting ||
    !state.studentsGrades
  )
    return null;
  return (
    <>
      <Stack sx={styles.form} spacing={2}>
        <TextField
          select
          label="Ф.И.О."
          defaultValue={''}
          sx={styles.textField}
          error={state.studentErrorInput === true}
          onChange={(e) => setStudentID(Number(e.target.value))}
        >
          {state.students.map((student) => (
            <MenuItem key={student.id} value={student.id}>
              {student.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Предмет"
          defaultValue={''}
          sx={styles.textField}
          error={state.courseErrorInput === true}
          onChange={(e) => setCourseID(Number(e.target.value))}
        >
          {state.courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Количество оценок"
          type="number"
          defaultValue={0}
          value={quantityInputs}
          onChange={(e) => setQuantityInputs(Number(e.target.value))}
          inputProps={{ min: 0, max: 5 }}
        ></TextField>
        {Array.from({ length: quantityInputs }).map((_, index) => (
          <Box key={index} sx={styles.grades}>
            <TextField
              label="Оценка"
              type="number"
              defaultValue={0}
              value={grades[index]}
              onChange={(e) =>
                handleRatingChange(index, Number(e.target.value))
              }
              inputProps={{ min: 2, max: 5 }}
              sx={styles.gradesGrade}
            ></TextField>
            <TextField
              select
              label="Посещение"
              sx={styles.gradesVisit}
              error={state.visitErrorInput === true}
              onChange={(e) =>
                handleVisitingChange(index, Number(e.target.value))
              }
            >
              {state.visiting
                ? state.visiting.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.value}
                    </MenuItem>
                  ))
                : null}
            </TextField>
          </Box>
        ))}
        <Button
          variant="contained"
          size="large"
          onClick={() => handleEstimate(gradesDB)}
        >
          OK
        </Button>
      </Stack>
    </>
  );
};

export default HomePage;
