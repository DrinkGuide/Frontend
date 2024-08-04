import React, { useState, useEffect, useRef } from 'react';
import './ImageSlider.css';
import image1 from '/Users/parkjinhong/Documents/GitHub/Frontend/src/assets/images/changing_icon_1.svg';
import image2 from '/Users/parkjinhong/Documents/GitHub/Frontend/src/assets/images/changing_icon_2.svg';
import image3 from '/Users/parkjinhong/Documents/GitHub/Frontend/src/assets/images/changing_icon_3.svg';
import image4 from '/Users/parkjinhong/Documents/GitHub/Frontend/src/assets/images/changing_icon_4.svg';
import image5 from '/Users/parkjinhong/Documents/GitHub/Frontend/src/assets/images/changing_icon_5.svg';
import image6 from '/Users/parkjinhong/Documents/GitHub/Frontend/src/assets/images/changing_icon_6.svg';

const images = [image1, image2, image3, image4, image5, image6];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const imageWidth = sliderRef.current.children[0].offsetWidth;
      const newTranslateX = (sliderWidth / 2) - (imageWidth / 2) - (currentIndex * imageWidth);
      sliderRef.current.style.transform = `translateX(${newTranslateX}px)`;
    }
  }, [currentIndex]);

  const handleImageClick = (index) => {
    setCurrentIndex(index % images.length);
  };

  return (
    <div className="slider-container">
      <div className="slider" ref={sliderRef}>
        {[...images, ...images, ...images].map((image, index) => {
          const virtualIndex = index % images.length;
          const isCurrent = virtualIndex === currentIndex;
          return (
            <img
              key={index}
              src={image}
              alt={`slide-${virtualIndex}`}
              onClick={() => handleImageClick(virtualIndex)}
              className={`slider-image ${isCurrent ? 'current' : ''}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
