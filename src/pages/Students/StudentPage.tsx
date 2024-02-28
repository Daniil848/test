import React from 'react';
import { useStudentPage } from './useStudentPage';
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

const StudentPage = () => {
  const { state, countVisits, styles } = useStudentPage();

  if (!state.student) return null;
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
