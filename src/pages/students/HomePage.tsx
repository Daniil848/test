import React from 'react';
import { useHomePage } from './useHomePage';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Select from '../../UI/Select';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const {
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
  } = useHomePage();

  if (
    !state.courses ||
    !state.students ||
    !state.visiting ||
    !state.studentsGrades
  )
    return null;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Select
          label="Ф.И.О."
          onChange={(e) => setStudentID(Number(e.target.value))}
          optionValues={state.students}
          error={state.studentErrorInput}
        ></Select>
        <Select
          label="Предмет"
          onChange={(e) => setCourseID(Number(e.target.value))}
          optionValues={state.courses}
          error={state.courseErrorInput}
        ></Select>
        <Input
          type="number"
          label="Количество оценок"
          placeholder="Введите число"
          defaultValue={0}
          value={quantityInputs}
          onChange={(e) => setQuantityInputs(Number(e.target.value))}
          error={state.quantityGradesErrorInput}
        ></Input>
        {Array.from({ length: quantityInputs }).map((_, index) => (
          <div key={index} className={styles.grades}>
            <Input
              type="number"
              label="Оценка"
              placeholder={undefined}
              defaultValue={0}
              value={grades[index]}
              onChange={(e) =>
                handleRatingChange(index, Number(e.target.value))
              }
              error={false}
            ></Input>
            <Select
              label="Посещение"
              onChange={(e) =>
                handleVisitingChange(index, Number(e.target.value))
              }
              optionValues={state.visiting}
              error={state.visitErrorInput}
            ></Select>
          </div>
        ))}

        <Button onClick={() => handleEstimate(gradesDB)} text="OK" />
      </div>
    </div>
  );
};

export default HomePage;
