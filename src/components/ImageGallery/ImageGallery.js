import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ collectionImages, openModal }) => (
  <ul onClick={openModal} className={styles.ImageGallery}>
    {collectionImages.map((itemCollection, index) => (
      <ImageGalleryItem
        largeImageURL={itemCollection.largeImageURL}
        tags={itemCollection.tags}
        key={index}
        prevUrl={itemCollection.previewURL}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  collectionImages: PropTypes.array.isRequired,
};

export default ImageGallery;
