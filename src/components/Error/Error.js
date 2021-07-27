import React from 'react';
import styles from './Error.module.css';
import cat from '../../images/icons/kote-kote.jpg';

const Error = () => (
  <img className={styles.Image} src={cat} alt="not available" />
);

export default Error;
