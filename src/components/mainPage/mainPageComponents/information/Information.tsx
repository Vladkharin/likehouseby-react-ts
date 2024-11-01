import React, { useState } from "react";
import { FormModal } from "./formModal/FormModal";
import styles from "./Information.module.css";

type Props = {
  setBodyStyle: React.Dispatch<React.SetStateAction<string>>;
};

export function Information({ setBodyStyle }: Props) {
  const [stateModal, setStateModal] = useState<boolean>(false);

  return (
    <>
      <div className={styles.information}>
        <div className="container">{FirstBlock(setStateModal)}</div>
        <div className={styles.animation}>
          <img src="./icons/partner.svg?ver=1" alt="partner" className={styles.spin} />
        </div>
      </div>
      {FormModal(stateModal, setStateModal, setBodyStyle)}
    </>
  );
}
function FirstBlock(setStateModal: React.Dispatch<React.SetStateAction<boolean>>) {
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>
          <p style={{ margin: 0 }}>ЭКСЛЮЗИВНОЕ ПРЕДЛОЖЕНИЕ</p>
        </h1>
        <div className={styles.line}></div>
        <div className={styles.texts_right_side_desc}>
          <p className={styles.text_big}>ИПОТЕКА НА СТРОИТЕЛЬСТВО БЕЗ ПЕРВОНАЧАЛЬНОГО ВЗНОСА</p>
          <img src="./icons/эскроу-десктоп.svg" alt="" />
          <p className={styles.text_small}>Честно строим каркасные дома и бани для жизни круглый год по цене как на сайте</p>
        </div>
        <div className={styles.texts_right_side_mob}>
          <p className={styles.text_small}>Честно строим каркасные дома и бани для жизни круглый год по цене как на сайте</p>
          <p className={styles.text_big}>ИПОТЕКА НА СТРОИТЕЛЬСТВО БЕЗ ПЕРВОНАЧАЛЬНОГО ВЗНОСА</p>
          <p className={styles.text_small}>эксклюзивное предложение для наших клиентов</p>
          <img className={styles.img} src="./icons/эскроу-десктоп.svg" alt="" />
        </div>
        <img className={styles.logo} src="./icons/лого.svg" alt="logo" />
      </div>
      <div className={styles.buttons}>
        <div className={styles.button_mob}>
          <a href="tel:+74951277452">
            <button>Позвонить</button>
          </a>
        </div>

        <div className={styles.button_map}>
          <a href="#map">
            <button>Земельные участки</button>
          </a>
        </div>

        <div className={styles.button_desc}>
          <button onClick={() => setStateModal(true)}>Узнать условия</button>
        </div>
      </div>
    </>
  );
}
