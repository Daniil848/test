import React, { useEffect } from 'react';
import {
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableHead,
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

  console.log(state.courses);

  const countVisits = (arr: number[], targetNumber: number) => {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === targetNumber) {
        count++;
      }
    }

    return count;
  };

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
          <TableHead>
            <TableRow>
              <TableCell>Курс</TableCell>
              <TableCell>Оценки</TableCell>
              <TableCell>Был(а) на знанятиях</TableCell>
              <TableCell>Пропустил(а)</TableCell>
              <TableCell>Пропустила(а) без причины</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.studentsGrades.map((studentGrades) => (
              <TableRow key={studentGrades.id}>
                <TableCell>
                  {state.courses
                    .filter((el) => el.id == studentGrades.courseId)
                    .map((e) => e.name)}
                </TableCell>
                <TableCell>{studentGrades.grades}</TableCell>
                <TableCell>
                  {countVisits(studentGrades.visiting, 1)} раз
                </TableCell>
                <TableCell>
                  {countVisits(studentGrades.visiting, 2)} раз
                </TableCell>
                <TableCell>
                  {countVisits(studentGrades.visiting, 3)} раз
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentPage;
