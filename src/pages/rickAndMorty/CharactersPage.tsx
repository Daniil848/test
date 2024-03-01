import React from 'react';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { filterCharacters } from '../../app/rickAndMortySlice';
import { Filters } from '../../app/types';
import CharacterCard from '../../components/rickAndMorty/CharacterCard';
import Pagination from '../../UI/Pagination';
import Input from '../../UI/Input';
import Select from '../../UI/Select';
import styles from './CharactersPage.module.scss';

const CharactersPage = () => {
  const state = useAppSelector((state) => state.rickAndMorty);
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

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.filters}>
          <div className={styles.filtersInput}>
            <Input
              type="text"
              label="Search by name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.filtersSelects}>
            <div className={styles.filtersSelectsItem}>
              <Select
                label="Select gender"
                optionValues={genders}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className={styles.filtersSelectsItem}>
              <Select
                label="Selsect status"
                optionValues={statuses}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.cardsContainer}>
          {state.characters?.map((character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              image={character.image}
              name={character.name}
              status={character.status}
              location={character.location.name}
            />
          ))}
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default CharactersPage;
