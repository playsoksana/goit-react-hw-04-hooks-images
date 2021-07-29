import React from 'react';
import PropTypes from 'prop-types';
import styles from './ButtonIcon.module.css';

const ButtonIcon = ({ children }) => (
  <button className={styles.SearchButton} type="submit" aria-label="search">
    {children}
  </button>
);

ButtonIcon.propTypes = {
  children: PropTypes.node.isRequired,
};
export default React.memo(ButtonIcon) ;
