import { imgs } from "../data";
import styles from "./ModalSlider.module.css";
import React from "react";
type typeModal = "hidden" | "visible";

export function ModalSlider(
  stateModal: boolean,
  setStateModal: React.Dispatch<React.SetStateAction<boolean>>,
  activeSlide: number,
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>
) {
  let activeClass = styles.none;
  let activeStyle: typeModal = "hidden";
  if (stateModal) {
    activeClass = "";
    activeStyle = "visible";
  }

  if (activeSlide > imgs.length - 1) {
    activeSlide = 0;
  } else if (activeSlide < 0) {
    activeSlide = imgs.length - 1;
  }
  return (
    <div className={styles.slider + " " + activeClass} style={{ visibility: activeStyle }}>
      <div className={styles.field}>
        {imgs.map((img, index) => {
          let activeClassImg = "none";
          if (index == activeSlide) {
            activeClassImg = "";
          }
          return <img key={index + 120011} className={styles.img + " " + activeClassImg} src={img} alt="fifthBlockFirstimg" />;
        })}
      </div>
      <button className={styles.button_next} onClick={() => setActiveSlide(activeSlide + 1)}>
        <img src="./icons/NextArrow.png" alt="" />
      </button>
      <button className={styles.button_prev} onClick={() => setActiveSlide(activeSlide - 1)}>
        <img src="./icons/PrevArrow.png" alt="" />
      </button>
      <button
        className={styles.button_close}
        onClick={() => {
          setStateModal(false);
        }}
      >
        {" "}
      </button>
    </div>
  );
}
