import React, { useState, useEffect, useRef } from "react";
import "./ImageSlider.css";
import image1 from "../../../assets/images/changing_icon_1.svg";
import image2 from "../../../assets/images/changing_icon_2.svg";
import image3 from "../../../assets/images/changing_icon_3.svg";
import image4 from "../../../assets/images/changing_icon_4.svg";
import image5 from "../../../assets/images/changing_icon_5.svg";
import image6 from "../../../assets/images/changing_icon_6.svg";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  scanPageColorAtom,
  ProductTypeColorAtom,
  ProductTypeinKorean,
} from "../../../recoil/atom";
import { scanPageProductTypeAtom } from "../../../recoil/atom";

const ImageSlider = ({ onClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const setResultColor = useSetRecoilState(scanPageColorAtom);
  const colorList = useRecoilValue(ProductTypeColorAtom);
  const productTypeKoreanList = useRecoilValue(ProductTypeinKorean);
  const [productType, setProductType] = useRecoilState(scanPageProductTypeAtom);
  const images = [image2, image1, image3, image4, image5, image6];
  const productNameList = [
    "DRINK",
    "SNACK",
    "RETORTFOOD",
    "FRUIT",
    "VEGETABLE",
    "FISH",
  ];

  useEffect(() => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const imageWidth = sliderRef.current.children[0].offsetWidth;
      const newTranslateX =
        sliderWidth / 2 - imageWidth / 2 - currentIndex * imageWidth;
      sliderRef.current.style.transform = `translateX(${newTranslateX}px)`;
    }
  }, [currentIndex]);

  const handleImageClick = (index) => {
    setCurrentIndex(index % images.length);

    // Correct way to access the color based on the image clicked
    const productName = productNameList[index];
    const colorObj = colorList.find((item) => item[productName]);
    const color = colorObj ? colorObj[productName] : "#FFFFFF"; // Default color if not found

    const productTypeObj = productTypeKoreanList.find(
      (item) => item[productName]
    );
    const productType = productTypeObj ? productTypeObj[productName] : "음료";
    setProductType(productType);
    console.log(productType);
    console.log(color);
    setResultColor(color);
  };

  return (
    <div className="slider-container" onClick={onClick}>
      <div className="slider" ref={sliderRef}>
        {images.map((image, index) => {
          const virtualIndex = index % images.length;
          const isCurrent = virtualIndex === currentIndex;
          return (
            <img
              key={index}
              src={image}
              alt={`slide-${virtualIndex}`}
              onClick={() => handleImageClick(virtualIndex)}
              className={`slider-image ${isCurrent ? "current" : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
