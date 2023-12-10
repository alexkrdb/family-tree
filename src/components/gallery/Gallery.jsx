import React, { useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import "./gallery.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Gallery = ({ images }) => {
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const goToPrev = (event) => {
    event.stopPropagation();
    const currentIndex = images.indexOf(lightboxImage);
    if (currentIndex > 0) {
      setLightboxImage(images[currentIndex - 1]);
    }
  };

  const goToNext = (event) => {
    event.stopPropagation();
    const currentIndex = images.indexOf(lightboxImage);
    if (currentIndex < images.length - 1) {
      setLightboxImage(images[currentIndex + 1]);
    }
  };

  return (
    <div className="gallery">
      <ImageList className="image-list" cols={2}>
        {images.map((image, index) => (
          <ImageListItem key={index} cols={1}>
            <img
              className="image-card"
              src={image}
              alt={`${index}`}
              onClick={() => openLightbox(image)}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container">
            <div className="arrow-icon" onClick={(e) => goToPrev(e)}>
              <ArrowBackIosIcon sx={{ color: "white" }} />
            </div>
            <img
              className="lightbox-image"
              src={lightboxImage}
              alt="Lightbox"
            />
            <div className="arrow-icon" onClick={(e) => goToNext(e)}>
              <ArrowForwardIosIcon sx={{ color: "white" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
