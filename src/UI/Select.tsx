import React from 'react';
import styles from './Select.module.scss';

const Select = (props: any) => {
  return (
    <>
      <div className={styles.container}>
        <label className={styles.label}>{props.label}</label>
        <select
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          className={styles.select}
        >
          {props.optionValues.map((el: any) => (
            <option key={el.id}>{el.value || el.name}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
