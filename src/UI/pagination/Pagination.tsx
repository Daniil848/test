import React from 'react';
import { usePagination } from './usePagination';
import styles from './Pagination.module.scss';

const Pagination = () => {
  const { state, handlePrev, handleNext } = usePagination();

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.counter}>
          <span className={styles.counterNumber}>{state.countPage}</span>
          in
          <span className={styles.counterNumber}>{state.info.pages}</span>
        </p>
        <ul className={styles.pagination}>
          <li
            className={
              state.info.prev
                ? styles.paginationItem
                : styles.paginationItemDisabled
            }
            onClick={() => handlePrev()}
          >
            Prevous
          </li>
          <li
            className={
              state.info.next
                ? styles.paginationItem
                : styles.paginationItemDisabled
            }
            onClick={() => handleNext()}
          >
            Next
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
