import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CharacterCard.module.scss';

const CharactercCard = (props: { id: number; name: string; image: string }) => {
  return (
    <>
      <div className={styles.card}>
        <img
          src={props.image}
          alt="charater-image"
          className={styles.cardImage}
        />
        <p className={styles.cardName}>{props.name}</p>
      </div>
    </>
  );
};

export default CharactercCard;
