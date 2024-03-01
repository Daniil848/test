import React from 'react';
import styles from './CharacterCard.module.scss';

const CharactercCard = (props: {
  id: number;
  image: string;
  name: string;
  status: string;
  location: string;
}) => {
  return (
    <>
      <div className={styles.card}>
        <img
          src={props.image}
          alt="charater-image"
          className={styles.cardImage}
        />
        <div className={styles.cardInfo}>
          <p>Name: {props.name}</p>
          <p>Status - {props.status}</p>
          <p>Location - {props.location}</p>
        </div>
      </div>
    </>
  );
};

export default CharactercCard;
