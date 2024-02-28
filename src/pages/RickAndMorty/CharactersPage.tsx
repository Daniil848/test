import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllCharacters } from '../../app/rickAndMortySlice';
import CharacterCard from '../../components/RickAndMorty/CharacterCard';
import styles from './CharactersPage.module.scss';

const CharactersPage = () => {
  const state = useAppSelector((state) => state.rickAndMorty);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCharacters());
  }, [dispatch, state.characters]);

  console.log(state.characters);

  return (
    <>
      <div className={styles.container}>
        {state.characters.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            image={character.image}
            name={character.name}
          />
        ))}
      </div>
    </>
  );
};

export default CharactersPage;
