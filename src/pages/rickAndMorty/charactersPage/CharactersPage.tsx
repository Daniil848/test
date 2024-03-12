import React from 'react';
import { useCharactersPage } from './useCharactersPage';
import Filters from '../../../modules/filters/Filters';
import CharacterCard from '../../../components/rickAndMorty/CharacterCard';
import Pagination from '../../../UI/pagination/Pagination';
import styles from './CharactersPage.module.scss';

const CharactersPage = () => {
  const { state } = useCharactersPage();

  return (
    <>
      <div className={styles.wrapper}>
        <Filters />
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
