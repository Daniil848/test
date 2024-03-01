import { useAppSelector } from '../../../app/hooks';

export const useCharactersPage = () => {
  const state = useAppSelector((state) => state.rickAndMorty);

  return {
    state,
  };
};
