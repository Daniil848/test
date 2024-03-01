import React from 'react';
import styles from './Select.module.scss';
import { Course, Student, Visiting } from '../app/types';

interface Props {
  label: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  optionValues: Student[] | Course[] | Visiting[];
  error: boolean;
}

const Select = (props: Partial<Props>) => {
  return (
    <>
      <div className={styles.container}>
        <label className={props.error ? styles.labelError : styles.label}>
          {props.label}
        </label>
        <select
          defaultValue={0}
          onChange={props.onChange}
          className={props.error ? styles.selectError : styles.select}
        >
          <option></option>
          {props.optionValues?.map((el: any) => (
            <option key={el.id} value={el.id}>
              {el.value || el.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
