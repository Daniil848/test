import React from 'react';
import { Stack, TextField, Button, MenuItem, Grid, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';
import {
  getCourses,
  getStudents,
  estimateStudent,
  EstimateStudent,
  getStudentsRating,
} from '../app/mainSlice';

const HomePage = () => {
  const state = useAppSelector((state) => state.students);
  const dispatch = useAppDispatch();

  const [studentID, setStudentID] = useState<number>(0);
  const [courseID, setCourseID] = useState<number>(0);
  const [quantityInputs, setQuantityInputs] = useState<number>(0);
  const [rating, setRating] = useState<number[]>([]);

  const handleRatingChange = (index: number, value: number) => {
    const newRating = [...rating];
    newRating[index] = value;
    setRating(newRating);
  };

  const ratingDB: EstimateStudent = {
    studentId: studentID,
    courseId: courseID,
    grades: rating,
  };

  const visit = ['Отсутствовал', 'Отсутствовал (Без причины)'];

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getStudents());
    dispatch(getStudentsRating());
  }, [dispatch]);

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

  if (!state.courses || !state.students || !state.studentsRating) return null;
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
              defaultValue={''}
              value={rating[index]}
              onChange={(e) =>
                handleRatingChange(index, Number(e.target.value))
              }
              inputProps={{ min: 2, max: 5 }}
              sx={styles.gradesGrade}
            ></TextField>
            <TextField select label="Посещение" sx={styles.gradesVisit}>
              {visit.map((visit, index) => (
                <MenuItem key={index} value={visit}>
                  {visit}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        ))}
        <Button
          variant="contained"
          size="large"
          onClick={() =>
            dispatch(
              estimateStudent({
                rating: ratingDB,
                studentsRating: state.studentsRating,
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
