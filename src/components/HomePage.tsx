import React from 'react';
import { Stack, TextField, Button, MenuItem, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';
import {
  getCourses,
  getStudents,
  getVisiting,
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
  const [visit, setVisit] = useState<number[]>([]);

  const handleRatingChange = (index: number, value: number) => {
    const newRating = [...rating];
    newRating[index] = value;
    setRating(newRating);
  };

  const handleVisitingChange = (index: number, value: number) => {
    const newVisiting = [...visit];
    newVisiting[index] = value;
    setVisit(newVisiting);
  };

  const ratingDB: EstimateStudent = {
    studentId: studentID,
    courseId: courseID,
    visiting: visit,
    grades: rating,
  };

  console.log('1', ratingDB);

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getStudents());
    dispatch(getVisiting());
    dispatch(getStudentsRating());
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
    !state.studentsRating
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
              value={rating[index]}
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
