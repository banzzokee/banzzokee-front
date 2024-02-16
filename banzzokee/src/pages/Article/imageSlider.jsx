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
      {currentImageIndex > 0 && (
        <button className={styles.sliderButton} onClick={goToPreviousImage}>
          &lt;
        </button>
      )}
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
      {currentImageIndex < images.length - 1 && (
        <button className={styles.sliderButton} onClick={goToNextImage}>
          &gt;
        </button>
      )}
    </div>
  );
}

export default ImageSlider;
