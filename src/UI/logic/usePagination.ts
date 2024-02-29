import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getCharactersFirstPage,
  getCharactersPaginate,
} from '../../app/rickAndMortySlice';

export const usePagination = () => {
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

  return {
    state,
    handlePrev,
    handleNext,
  };
};
