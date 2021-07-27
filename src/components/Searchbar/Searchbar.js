import React, { PureComponent } from 'react';
import ButtonIcon from '../ButtonIcon';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { ReactComponent as SearchButton } from '../../images/icons/search.svg';
const shortid = require('shortid');

class Searchbar extends PureComponent {
  state = {
    searchSubject: '',
  };

  onChangeInput = ({ target: { value } }) => {
    this.setState({
      searchSubject: value,
    });
  };

  submitEventFromForm = event => {
    this.props.onSubmit(event);
    this.reset();
  };

  reset = () => {
    this.setState({
      searchSubject: '',
    });
  };

  render() {
    const { onChangeInput } = this;
    const { searchSubject } = this.state;
    const idForm = shortid.generate();
    return (
      <header>
        <form onSubmit={this.submitEventFromForm} className={styles.SearchForm}>
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
