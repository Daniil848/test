import React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import styles from './Pagination.module.scss';
import {
  getCharactersFirstPage,
  getCharactersPaginate,
} from '../app/rickAndMortySlice';

const Pagination = () => {
  const state = useAppSelector((state) => state.rickAndMorty);
  const dispatch = useAppDispatch();

  const [countPage, setCountPage] = useState<number>(1);

  useEffect(() => {
    if (countPage === 1) {
      dispatch(getCharactersFirstPage());
    }
  }, []);

  const handlePrev = () => {
    setCountPage(countPage + 1);
    if (state.info.prev) {
      dispatch(getCharactersPaginate(state.info.prev));
    } else return;
  };

  const handleNext = () => {
    setCountPage(countPage - 1);
    if (state.info.next) {
      dispatch(getCharactersPaginate(state.info.next));
    } else return;
  };

  return (
    <>
      <div className={styles.wrapper}>
        <ul className={styles.pagination}>
          <li className={styles.paginationItem} onClick={() => handlePrev()}>
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
