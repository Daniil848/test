import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getCharactersFirstPage,
  getCharactersPaginate,
  setPrevPage,
  setNextPage,
} from '../../app/rickAndMortySlice';

export const usePagination = () => {
  const state = useAppSelector((state) => state.rickAndMorty);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.countPage === 1) {
      dispatch(getCharactersFirstPage());
    }
  }, []);

  const handlePrev = () => {
    dispatch(setPrevPage());
    if (state.info.prev) {
      dispatch(getCharactersPaginate(state.info.prev));
    } else return;
  };

  const handleNext = () => {
    dispatch(setNextPage());
    if (state.info.next) {
      dispatch(getCharactersPaginate(state.info.next));
    } else return;
  };

  return {
    state,
    handlePrev,
    handleNext,
  };
};
