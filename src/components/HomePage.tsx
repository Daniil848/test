import React from 'react';
import { Stack, TextField, Button, MenuItem } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect } from 'react';
import { getCouses, getStudents } from '../app/mainSlice';

const HomePage = () => {
  const state = useAppSelector((state) => state.students);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCouses());
    dispatch(getStudents());
  }, []);

  const visit = [
    {
      label: 'Присутствовал',
      value: true,
    },
    {
      label: 'Отсутствовал',
      value: false,
    },
  ];

  const styles = {
    form: {
      position: 'absolute',
      top: '30%',
      display: 'flex',
      flexDirection: 'column',
      width: '450px',
      margin: 'auto',
      verticalAlign: 'middle',
    },
  };

  if (!state.courses || !state.students) return null;
  return (
    <>
      <Stack sx={styles.form} spacing={2}>
        <TextField select label="Ф.И.О." defaultValue={''}>
          {state.students.map((student) => (
            <MenuItem key={student.id} value={student.name}>
              {student.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField select label="Предмет" defaultValue={''}>
          {state.courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Оценка"></TextField>
        <TextField select label="Посещение">
          {visit.map((visit, index) => (
            <MenuItem key={index} value={visit.label}>
              {visit.label}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" size="large">
          OK
        </Button>
      </Stack>
    </>
  );
};

export default HomePage;
