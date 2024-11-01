import { typeItemHouse } from "../../../typesAndIntefaces";
import React from "react";
import styles from "./ModalWithSlider.module.css";

export function ModalWithSlider({
  stateModalImg,
  house,
  setStateModalImg,
  activeImgIndex,
  setActiveImgIndex,
}: {
  stateModalImg: boolean;
  house: typeItemHouse;
  setStateModalImg: React.Dispatch<React.SetStateAction<boolean>>;
  activeImgIndex: number;
  setActiveImgIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  let activeStyleWrapper = styles.invisible;

  if (stateModalImg) {
    activeStyleWrapper = "";
  }

  return (
    <div className={`${styles.modal} ${activeStyleWrapper}`}>
      <div className={styles.modal_wrapper}>
        <button className={styles.button_close} onClick={() => setStateModalImg(false)}>
          {" "}
        </button>
        {house.imgs
          ? house.imgs.map((img, index) => {
              index += 123234432;

              let activeClassSlide = styles.none;

              if (house.imgs && house.imgs[activeImgIndex] == img) {
                activeClassSlide = styles.block;
              }
              return (
                <img key={index} className={`${styles.img} ${styles.slider} ${styles.modal_big} ${activeClassSlide}`} src={img} alt="" />
              );
            })
          : false}
        <button
          className={styles.button_right}
          onClick={() => {
            const number = activeImgIndex + 1;
            if (house.imgs && number >= house.imgs.length) {
              setActiveImgIndex(0);
            } else {
              setActiveImgIndex(number);
            }
          }}
        >
          <img src="../icons/NextArrow.png" alt="next" />
        </button>
        <button
          className={styles.button_left}
          onClick={() => {
            const number = activeImgIndex - 1;
            if (house.imgs && number < 0) {
              setActiveImgIndex(house.imgs.length - 1);
            } else {
              setActiveImgIndex(number);
            }
          }}
        >
          <img src="../icons/PrevArrow.png" alt="prev" />
        </button>
      </div>
    </div>
  );
}
