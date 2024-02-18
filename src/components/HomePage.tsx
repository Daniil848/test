import React from 'react';
import { Stack, TextField, Button, MenuItem, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';
import {
  getCourses,
  getStudents,
  estimateStudent,
  EstimateStudent,
  StudentRating,
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

  const ratingDB: StudentRating = {
    id: '',
    studentId: studentID,
    courseId: courseID,
    grades: rating,
  };

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getStudents());
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
  };

  if (!state.courses || !state.students) return null;
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
        ></TextField>
        <Grid container spacing={1}>
          {Array.from({ length: quantityInputs }).map((_, index) => (
            <Grid item xs={4} key={index}>
              <TextField
                label="Оценка"
                defaultValue={''}
                value={rating[index]}
                onChange={(e) =>
                  handleRatingChange(index, Number(e.target.value))
                }
              ></TextField>
            </Grid>
          ))}
        </Grid>
        {/* <TextField select label="Посещение">
          {visit.map((visit, index) => (
            <MenuItem key={index} value={visit.label}>
              {visit.label}
            </MenuItem>
          ))}
        </TextField> */}
        <Button
          variant="contained"
          size="large"
          onClick={() => dispatch(estimateStudent(ratingDB))}
        >
          OK
        </Button>
      </Stack>
    </>
  );
};

export default HomePage;
