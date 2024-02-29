import React from 'react';
import { usePagination } from './logic/usePagination';
import styles from './Pagination.module.scss';

const Pagination = () => {
  const { state, handlePrev, handleNext } = usePagination();

  return (
    <>
      <div className={styles.wrapper}>
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
          <li className={styles.paginationItem} onClick={() => handleNext()}>
            Next
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
