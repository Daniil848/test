import React, { useEffect } from 'react';
import {
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Box,
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
    dispatch(getSingleStudent(id));
    dispatch(getStudentsGrades(id));
    dispatch(getCourses());
    dispatch(getVisiting());
  }, []);

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
    box: {
      flex: 'none',
    },
    studentName: {
      fontSize: '36px',
      color: 'primary',
    },
    tableCell: {
      textAlign: 'center',
    },
  };
  if (!state.student) {
    return null;
  }

  return (
    <>
      <Box sx={styles.box}>
        <Typography sx={styles.studentName}>{state.student.name}</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Предмет</TableCell>
                <TableCell sx={styles.tableCell}>Оценки</TableCell>
                <TableCell sx={styles.tableCell}>Был(а) на знанятиях</TableCell>
                <TableCell sx={styles.tableCell}>Пропустил(а)</TableCell>
                <TableCell sx={styles.tableCell}>
                  Пропустил(а) без причины
                </TableCell>
                <TableCell sx={styles.tableCell}>Средний балл</TableCell>
                <TableCell sx={styles.tableCell}>Зачет</TableCell>
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
                  <TableCell sx={styles.tableCell}>
                    {studentGrades.grades.join(', ')}
                  </TableCell>
                  <TableCell sx={styles.tableCell}>
                    {countVisits(studentGrades.visiting, 1)} раз
                  </TableCell>
                  <TableCell sx={styles.tableCell}>
                    {countVisits(studentGrades.visiting, 2)} раз
                  </TableCell>
                  <TableCell sx={styles.tableCell}>
                    {countVisits(studentGrades.visiting, 3)} раз
                  </TableCell>
                  <TableCell sx={styles.tableCell}>
                    {studentGrades.averageGrade.toFixed(2)}
                  </TableCell>
                  <TableCell sx={styles.tableCell}>
                    {studentGrades.attestation ? 'Зачет' : 'Незачет'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default StudentPage;
