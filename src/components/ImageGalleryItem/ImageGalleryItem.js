import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';
import defaultImg from '../../images/icons/kote-kote.jpg';

const ImageGalleryItem = ({ prevUrl, tags, largeImageURL }) => (
  <li className={styles.ImageGalleryItem}>
    <img
      alt={tags}
      data={largeImageURL}
      className={styles.Image}
      src={prevUrl}
    ></img>
  </li>
);

ImageGalleryItem.propTypes = {
  itemCollection: PropTypes.array,
};

ImageGalleryItem.defaultProps = {
  prevUrl: defaultImg,
};

export default ImageGalleryItem;
