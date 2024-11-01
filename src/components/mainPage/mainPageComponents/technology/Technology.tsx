import React, { useState } from "react";
import { ModalSlider } from "./modalSlider/ModalSlider";
import { imgs, items, typeItem } from "./data";
import styles from "./Technology.module.css";

export function Technology() {
  const [stateModal, setStateModal] = useState<boolean>(false);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  return (
    <div id="tech" className={styles.technology}>
      <div className="container">
        <div className={styles.header}>Технология</div>
        <div className={styles.imgs}>
          {imgs.map((img, index) => {
            const key = index + 11111111;
            return (
              <img
                key={key}
                src={img}
                alt="img"
                className={styles.img}
                onClick={() => {
                  setStateModal(true);
                  setActiveSlide(index);
                }}
              />
            );
          })}
        </div>
        {Items()}
      </div>
      {ModalSlider(stateModal, setStateModal, activeSlide, setActiveSlide)}
    </div>
  );
}

function Items() {
  return (
    <React.Fragment>
      <div className={styles.items}>{items.map((item: typeItem, index: number) => createItem(item, index))}</div>
    </React.Fragment>
  );
}

function createItem(item: typeItem, index: number) {
  index = 1000222 + index;
  return (
    <React.Fragment key={index.toString()}>
      <div className={styles.item}>
        <div className={styles.item_number}>{item.value}</div>
        <div className={styles.item_text}>{item.title}</div>
        <img
          src="./icons/plus.svg"
          alt=""
          className={styles.item_plus}
          onClick={(event) => {
            const imgEl = event.nativeEvent.target as HTMLImageElement;
            if (imgEl.nextElementSibling as HTMLDivElement) {
              if (imgEl.nextElementSibling?.classList.length == 1) {
                imgEl.classList.add(styles.rotate);
                imgEl.nextElementSibling?.classList.add(styles.show_menu);
              } else {
                imgEl.classList.remove(styles.rotate);
                imgEl.nextElementSibling?.classList.remove(styles.show_menu);
              }
            }
          }}
        />
        <div className={styles.item_subtitle}>{item.subtitle}</div>
      </div>
      <div className={styles.line}></div>
    </React.Fragment>
  );
}
