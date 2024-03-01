import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Filters } from '../../app/types';
import { filterCharacters } from '../../app/rickAndMortySlice';

export const useFilters = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const filters: Filters = {
    name: name,
    gender: gender,
    status: status,
  };

  useEffect(() => {
    dispatch(filterCharacters(filters));
  }, [name, gender, status]);

  const genders = ['male', 'female', 'genderless', 'unknown'];
  const statuses = ['dead', 'alive', 'unknown'];

  return {
    setName,
    setGender,
    setStatus,
    genders,
    statuses,
  };
};
