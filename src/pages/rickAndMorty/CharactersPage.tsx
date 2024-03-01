import React from 'react';
import { useAppSelector } from '../../app/hooks';
import CharacterCard from '../../components/rickAndMorty/CharacterCard';
import styles from './CharactersPage.module.scss';
import Pagination from '../../UI/Pagination';
import Input from '../../UI/Input';
import Select from '../../UI/Select';

const CharactersPage = () => {
  const state = useAppSelector((state) => state.rickAndMorty);

  console.log(state.characters);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.filters}>
          <div className={styles.filtersInput}>
            <Input type="text"></Input>
          </div>
          <div className={styles.filtersSelects}>
            <div className={styles.filtersSelectsItem}>
              <Select></Select>
            </div>
            <div className={styles.filtersSelectsItem}>
              <Select></Select>
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
