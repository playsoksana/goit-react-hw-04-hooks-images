import { useState } from 'react';
import ButtonIcon from '../ButtonIcon';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { ReactComponent as SearchButton } from '../../images/icons/search.svg';
const shortid = require('shortid');

function Searchbar({ onSubmit }) {
  const [searchSubject, setSearchSubject] = useState('');
  const idForm = shortid.generate();

  const onChangeInput = ({ target: { value } }) => {
    setSearchSubject(value);
  };

  const submitEventFromForm = event => {
    onSubmit(event);
    setSearchSubject('');
  };

  return (
    <header>
      <form onSubmit={submitEventFromForm} className={styles.SearchForm}>
        <label htmlFor={idForm} className={styles.Label}></label>
        <input
          onChange={onChangeInput}
          id={idForm}
          type="text"
          className={styles.Input}
          value={searchSubject}
          name="search"
          placeholder="Enter a search word"
        />
        <ButtonIcon>
          <SearchButton />
        </ButtonIcon>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
