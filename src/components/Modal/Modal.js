import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ children, closeModal }) => {
  const handleKeyDown = useCallback(
    ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const closeBackdropOnClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      closeModal();
    }
  };

  return (
    <div onClick={closeBackdropOnClick} className={styles.Overlay}>
      <div className={styles.Modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default Modal;
