import React from 'react';
import { Stack, TextField, Button, MenuItem } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect } from 'react';
import { getCouses } from '../app/mainSlice';

const MainPage = () => {
  const state = useAppSelector((state) => state.students);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCouses());
  }, []);

  console.log(state.courses);

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

  if (!state.courses) return null;
  return (
    <>
      <Stack sx={styles.form} spacing={2}>
        <TextField select label="Ф.И.О.">
          <MenuItem></MenuItem>
        </TextField>
        <TextField select label="Предмет" defaultValue={''}>
          {state.courses.map((course) => (
            <MenuItem key={course.id} value={course.name}>
              {course.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Оценка"></TextField>
        <TextField select label="Посещение">
          <MenuItem></MenuItem>
        </TextField>
        <Button variant="contained" size="large">
          OK
        </Button>
      </Stack>
    </>
  );
};

export default MainPage;
