import React, { useState } from 'react';
import styles from './imageSlider.module.css';
function ImageSlider({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? prevIndex : prevIndex + 1));
  };
  if (!images || images.length === 0) {
    return <div>No images to display</div>;
  }
  return (
    <div className={styles.imageContainer}>
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
      <div className={styles.buttons}>
        {currentImageIndex > 0 && (
          <>
            <div className={styles.buttonAreaL} onClick={goToPreviousImage}>
              <div className={styles.buttonL}>&lt;</div>
            </div>
          </>
        )}
        {currentImageIndex < images.length - 1 && (
          <>
            <div className={styles.buttonAreaR} onClick={goToNextImage}>
              <div className={styles.buttonR}>&gt;</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageSlider;
