import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDownOnClick);
  }
  componentWillMount() {
    window.removeEventListener('keydown', this.handleKeyDownOnClick);
  }

  handleBackdropOnClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.closeModal();
    }
    return;
  };

  handleKeyDownOnClick = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
    return;
  };

  render() {
    const { children} = this.props;
    const {handleBackdropOnClick} = this;
    return (
      <div onClick={handleBackdropOnClick} className={styles.Overlay}>
        <div className={styles.Modal}>{children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default Modal;
