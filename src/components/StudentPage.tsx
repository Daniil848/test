import React, { useEffect } from 'react';
import {
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useParams } from 'react-router';
import {
  getSingleStudent,
  getStudentsGrades,
  getCourses,
  getVisiting,
} from '../app/mainSlice';

const StudentPage = () => {
  const state = useAppSelector((state) => state.slice);
  const dispatch = useAppDispatch();
  const { studentId } = useParams();

  useEffect(() => {
    const id = Number(studentId);
    dispatch(getCourses());
    dispatch(getVisiting());
    dispatch(getSingleStudent(id));
    dispatch(getStudentsGrades(id));
  }, []);

  console.log(state.visiting);

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

  if (!state.student) {
    return null;
  }

  return (
    <>
      <Typography>{state.student.name}</Typography>
      <TableContainer>
        <Table>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentPage;
