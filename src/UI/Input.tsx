import React from 'react';
import styles from './Input.module.scss';

const Input = (props: {
  label: string;
  type: string;
  placeholder: string | undefined;
  value: string | number;
  defaultValue: string | number;
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}) => {
  return (
    <>
      <div className={styles.container}>
        <label className={styles.label}>{props.label}</label>
        <input
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          className={styles.input}
        ></input>
      </div>
    </>
  );
};

export default Input;
