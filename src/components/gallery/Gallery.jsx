import React, { useState } from 'react';
import "./gallery.scss"


const Gallery = () => {
  const images = [];

  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div>
      <div className="gallery">
        {images.map((image, index) => (
          <img
            key={index}
            className="image-card"
            src={image}
            alt={`Image ${index}`}
            onClick={() => openLightbox(image)}
          />
        ))}
      </div>

      {lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container">
            <img className="lightbox-image" src={lightboxImage} alt="Lightbox" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
