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

  const handleRatingChange = (index: number, value: number) => {
    const newRating = [...grades];
    newRating[index] = value;
    setGrades(newRating);
  };

  const handleVisitingChange = (index: number, value: number) => {
    const newVisiting = [...visit];
    newVisiting[index] = value;
    setVisit(newVisiting);
  };

  const gradesDB: EstimateStudent = {
    studentId: studentID,
    courseId: courseID,
    visiting: visit,
    grades: grades,
  };

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getStudents());
    dispatch(getVisiting());
    dispatch(getStudentsGrades());
  }, []);

  const styles = {
    form: {
      position: 'absolute',
      top: '30%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      flexGrow: 1,
      width: '450px',
      margin: 'auto',
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
              inputProps={{ min: 0, max: 5 }}
              sx={styles.gradesGrade}
            ></TextField>
            <TextField
              select
              label="Посещение"
              sx={styles.gradesVisit}
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
          onClick={() =>
            dispatch(
              estimateStudent({
                gradesDB: gradesDB,
                studentsGrades: state.studentsGrades,
              }),
            )
          }
        >
          OK
        </Button>
      </Stack>
    </>
  );
};

export default HomePage;
