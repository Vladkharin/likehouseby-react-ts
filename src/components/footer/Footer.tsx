import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.img} />
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.item_header}>АДРЕС</div>
              {footerAddress()}
            </div>
            <div className={styles.item}>
              <div className={styles.item_header}>КОНТАКТЫ</div>
              {footerContacts()}
            </div>
            <div className={styles.social_item}>
              <div className={styles.item_header}>СОЦ.СЕТИ</div>
              {footerSocial()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  function footerAddress() {
    return (
      <div className={styles.item_title}>
        Офис: г. Мозырь <br />
        ул. Якуба Коласа, д. 1, каб. 201 <br />
        <a target="_blank" className={styles.item_link_with_line} href="https://yandex.ru/maps/-/CDWtBGMS">
          Показать на карте
        </a>{" "}
      </div>
    );
  }

  function footerContacts() {
    return (
      <div className={styles.item_title}>
        <a className={styles.item_link} href="mailto:info@likehouse.org">
          INFO@LIKEHOUSE.ORG
        </a>{" "}
        <br />
        <a className={styles.item_link} href="tel:+375333623505">
          +375 33 362-35-05
        </a>{" "}
      </div>
    );
  }

  function footerSocial() {
    return (
      <div className={styles.socials}>
        <a href="https://www.instagram.com/likehouse.by">
          <img src="../icons/instaIcon.svg" alt="" className={styles.social} />
        </a>
        <a href="https://teleg.run/Like_House_org">
          <img src="../icons/TelegramIcon.svg" alt="" className={styles.social} />
        </a>
        <a href="https://wa.clck.bar/375333623505">
          <img src="../icons/WhatsappIcon.svg" alt="" className={styles.social} />
        </a>
        <a href="https://www.youtube.com/@likehouse_org">
          <img src="../icons/YouTubeIcon.svg" alt="" className={styles.social} />
        </a>
      </div>
    );
  }
}
