import React, { useEffect } from 'react';
import { List, ListItem, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useParams } from 'react-router';
import { getSingleStudent } from '../app/mainSlice';

const StudentPage = () => {
  const state = useAppSelector((state) => state.students);
  const dispatch = useAppDispatch();
  const { studentId } = useParams();

  useEffect(() => {
    const id = Number(studentId);
    dispatch(getSingleStudent(id));
  }, [dispatch, studentId]);

  console.log(state.student);

  const styles = {
    studentName: {
      fontSize: '36px',
      color: 'primary',
    },
    list: {},
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    courses: {
      fontSize: '24px',
      borderBottom: 2,
      borderColor: 'primary',
      width: 'fit-content',
      margin: 'auto',
    },
    courseTitle: {
      fontSize: '20px',
    },
    grade: {
      fontSize: '20px',
      borderBottom: 1,
      borderColor: 'primary',
    },
  };

  if (!state.student) return null;
  return (
    <>
      <Typography sx={styles.studentName}>{state.student.name}</Typography>
      <List sx={styles.list}>
        <Typography sx={styles.courses}>Предметы</Typography>
        <ListItem sx={styles.listItem}>
          <Typography sx={styles.courseTitle}>Математика</Typography>
          <Stack direction="row" spacing={2}>
            <Typography sx={styles.grade}>5</Typography>
          </Stack>
        </ListItem>
      </List>
    </>
  );
};

export default StudentPage;
