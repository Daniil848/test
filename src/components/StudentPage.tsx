import React, { useEffect } from 'react';
import { List, ListItem, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useParams } from 'react-router';
import { getSingleStudent, State } from '../app/mainSlice';

const StudentPage = () => {
  const state: State = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();
  const { studentId } = useParams();

  useEffect(() => {
    const id = Number(studentId);
    dispatch(getSingleStudent(id));
  }, [dispatch, studentId]);

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
    stack: {},
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
    rating: {
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
        {/* {state.student?.courses.map((course) => (
          <ListItem sx={styles.listItem} key={course.courseId}>
            <Typography sx={styles.courseTitle}>{course.courseId}</Typography>
            <Stack direction="row" spacing={2}>
              {course.rating.map((rate, index) => (
                <Typography key={index} sx={styles.rating}>
                  {rate}
                </Typography>
              ))}
              {course.visiting.map((visit, index) => (
                <Typography key={index}>{visit}</Typography>
              ))}
            </Stack>
          </ListItem>
        ))} */}
      </List>
    </>
  );
};

export default StudentPage;
