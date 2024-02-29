import React from 'react';
import { useAppSelector } from '../../app/hooks';
import CharacterCard from '../../components/rickAndMorty/CharacterCard';
import styles from './CharactersPage.module.scss';
import Pagination from '../../UI/Pagination';

const CharactersPage = () => {
  const state = useAppSelector((state) => state.rickAndMorty);

  console.log(state.characters);

  return (
    <>
      <div className={styles.container}>
        {state.characters?.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            image={character.image}
            name={character.name}
          />
        ))}
      </div>
      <Pagination />
    </>
  );
};

export default CharactersPage;
