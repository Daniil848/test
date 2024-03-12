import { useEffect } from 'react';
import { useAppSelector } from '../../../app/hooks';

export const useCharactersPage = () => {
  const state = useAppSelector((state) => state.rickAndMorty);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [state.countPage]);

  return {
    state,
  };
};
