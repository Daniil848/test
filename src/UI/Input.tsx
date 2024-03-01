import React from 'react';
import styles from './Input.module.scss';

interface Props {
  label: string;
  type: string;
  placeholder: string | undefined;
  value: string | number;
  defaultValue: string | number;
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  error: boolean;
}

const Input = (props: Partial<Props>) => {
  return (
    <>
      <div className={styles.container}>
        <label className={props.error ? styles.labelError : styles.label}>
          {props.label}
        </label>
        <input
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          className={props.error ? styles.inputError : styles.input}
        ></input>
      </div>
    </>
  );
};

export default Input;
