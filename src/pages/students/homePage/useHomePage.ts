import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect, useState } from 'react';
import {
  getCourses,
  getStudents,
  getVisiting,
  estimateStudent,
  getStudentsGrades,
  setNameError,
  clearNameError,
  setCourseError,
  clearCourseError,
  setVisitError,
  clearVisitError,
  setQuantityError,
  clearQuantityError,
} from '../../../app/studentsSlice';
import { EstimateStudent } from '../../../app/types';
import { percentVisiting } from '../../../helpers/percentVisiting';

export const useHomePage = () => {
  const state = useAppSelector((state) => state.students);
  const dispatch = useAppDispatch();

  const [studentID, setStudentID] = useState<number>(0);
  const [courseID, setCourseID] = useState<number>(0);
  const [quantityInputs, setQuantityInputs] = useState<number>(0);
  const [grades, setGrades] = useState<number[]>([]);
  const [visit, setVisit] = useState<number[]>([]);

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getStudents());
    dispatch(getVisiting());
    dispatch(getStudentsGrades(null));
  }, [dispatch, grades, visit]);

  const handleRatingChange = (index: number, value: number) => {
    setGrades((prevGrades) => {
      const newGrades = [...prevGrades];
      newGrades[index] = value;
      return newGrades;
    });
  };

  const handleVisitingChange = (index: number, value: number) => {
    setVisit((prevVisit) => {
      const newVisit = [...prevVisit];
      newVisit[index] = value;
      return newVisit;
    });
  };

  const filteredGrades = grades.filter((el) => el !== null && el > 1);

  const averageGrade =
    filteredGrades.reduce((acc, number) => acc + number, 0) /
    filteredGrades.length;

  const gradesDB: EstimateStudent = {
    studentId: studentID,
    courseId: courseID,
    visiting: visit,
    grades: filteredGrades,
    averageGrade: averageGrade,
    attestation: percentVisiting(visit, 1, averageGrade),
  };

  const handleEstimate = (gradesDB: EstimateStudent) => {
    studentID === 0 ? dispatch(setNameError()) : dispatch(clearNameError());
    courseID === 0 ? dispatch(setCourseError()) : dispatch(clearCourseError());

    quantityInputs === 0
      ? dispatch(setQuantityError())
      : dispatch(clearQuantityError());

    visit.length != quantityInputs && visit.length === 0
      ? dispatch(setVisitError())
      : dispatch(clearVisitError());

    if (
      !state.studentErrorInput &&
      !state.courseErrorInput &&
      !state.quantityGradesErrorInput &&
      !state.visitErrorInput &&
      studentID &&
      courseID &&
      visit &&
      grades
    ) {
      dispatch(
        estimateStudent({
          gradesDB: gradesDB,
          studentsGrades: state.studentsGrades,
        }),
      );
      setQuantityInputs(0);
      setGrades([]);
      setVisit([]);
    }
  };

  return {
    state,
    setStudentID,
    setCourseID,
    grades,
    quantityInputs,
    setQuantityInputs,
    handleRatingChange,
    handleVisitingChange,
    handleEstimate,
    gradesDB,
  };
};
