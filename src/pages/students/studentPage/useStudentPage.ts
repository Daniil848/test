import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useParams } from 'react-router';
import {
  getSingleStudent,
  getStudentsGrades,
  getCourses,
  getVisiting,
} from '../../../app/studentsSlice';

export const useStudentPage = () => {
  const state = useAppSelector((state) => state.students);
  const dispatch = useAppDispatch();
  const { studentId } = useParams();

  useEffect(() => {
    const id = Number(studentId);
    dispatch(getSingleStudent(id));
    dispatch(getStudentsGrades(id));
    dispatch(getCourses());
    dispatch(getVisiting());
  }, [studentId]);

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

  return {
    state,
    countVisits,
    styles,
  };
};
