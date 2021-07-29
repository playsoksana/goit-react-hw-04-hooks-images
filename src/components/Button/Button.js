import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ imageUpload, text }) => (
  <button onClick={imageUpload} className={styles.Button} type="button">
    {text}
  </button>
);

Button.propTypes = {
  imageUpload: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};
export default React.memo(Button);
