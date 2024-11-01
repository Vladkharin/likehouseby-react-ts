import styles from "./AdditionalServices.module.css";

export function AdditionalServices() {
  return (
    <div id="dop" className={styles.additionalServices}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.header_mob}>Доп. услуги</div>
          <div className={styles.header_desc}>Дополнительные услуги</div>
          <div className={styles.items}>
            <div className={styles.item}>
              <img className={styles.img_mob} src="./icons/sixthBlockFirstIcons.svg" alt="icon" />
              <img className={styles.img_desc} src="./icons/sixthBlockFirstIconsWhite.svg" alt="icon" />
              <div className={styles.item_text}>ЭЛЕКТРИФИКАЦИЯ</div>
            </div>
            <div className={styles.item}>
              <img className={styles.img_mob} src="./icons/sixthBlockSecondIcons.svg" alt="icon" />
              <img className={styles.img_desc} src="./icons/sixthBlockSecondIconsWhite.svg" alt="icon" />
              <div className={styles.item_text}>ВОДОСНАБЖЕНИЕ</div>
            </div>
            <div className={styles.item}>
              <img className={styles.img_mob} src="./icons/sixthBlockThirdIcons.svg" alt="icon" />
              <img className={styles.img_desc} src="./icons/sixthBlockThirdIconsWhite.svg" alt="icon" />
              <div className={styles.item_text}>КАНАЛИЗАЦИЯ</div>
            </div>
            <div className={styles.item}>
              <img className={styles.img_mob} src="./icons/sixthBlockFourthIcons.svg" alt="icon" />
              <img className={styles.img_desc} src="./icons/sixthBlockFourthIconsWhite.svg" alt="icon" />
              <div className={styles.item_text}>ОТОПЛЕНИЕ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
