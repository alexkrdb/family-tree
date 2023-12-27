import React, { useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import "./gallery.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { createPortal } from "react-dom";

const Gallery = ({ images }) => {
  images = images.filter((image) => image !== "")
  const [lightboxImage, setLightboxImage] = useState(null);
  const currentIndex = images.indexOf(lightboxImage);
  const openLightbox = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const goToPrev = (event) => {
    event.stopPropagation();
    if (currentIndex > 0) {
      setLightboxImage(images[currentIndex - 1]);
    }
  };

  const goToNext = (event) => {
    event.stopPropagation();
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
              // alt={`${index}`}
              onClick={() => openLightbox(image)}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {lightboxImage && createPortal(
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container">
            <div className="arrow-icon" onClick={(e) => goToPrev(e)}>
              {currentIndex > 0 && <ArrowBackIosIcon sx={{ color: "white" }} />}
            </div>
            <img
              className="lightbox-image"
              src={lightboxImage}
              alt="Lightbox"
            />
            <div className="arrow-icon" onClick={(e) => goToNext(e)}>
              {currentIndex < images.length-1 && <ArrowForwardIosIcon sx={{ color: "white" }} />}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Gallery;
