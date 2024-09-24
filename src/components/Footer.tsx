export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__img" />
          <div className="footer__items">
            <div className="footer__item">
              <div className="footer__item-header">АДРЕС</div>
              {footerAddressBy()}
            </div>
            <div className="footer__item">
              <div className="footer__item-header">КОНТАКТЫ</div>
              {footerContactsBy()}
            </div>
            <div className="footer__socialItem">
              <div className="footer__item-header">СОЦ.СЕТИ</div>
              {footerSocialBy()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  function footerAddressBy() {
    return (
      <div id="contacts" className="footer__item-title">
        Офис: г. Мозырь <br />
        ул. Якуба Коласа, д. 1, каб. 201 <br />
        <a className="footer__item-linkWithdecoration" href="https://yandex.ru/maps/-/CDWtBGMS">
          Показать на карте
        </a>{" "}
        <br /> <br />
      </div>
    );
  }

  function footerContactsBy() {
    return (
      <div className="footer__item-title">
        <a className="footer__item-linkWithOutdecoration" href="mailto:info@likehouse.org">
          INFO@LIKEHOUSE.ORG
        </a>{" "}
        <br />
        <a className="footer__item-linkWithOutdecoration" href="tel:+375333623505">
          +375 33 362-35-05
        </a>{" "}
        <br />
      </div>
    );
  }

  function footerSocialBy() {
    return (
      <div className="footer__socials">
        <a href="https://www.instagram.com/likehouse.by">
          <img src="./icons/instaIcon.svg" alt="" className="footer__social" />
        </a>
        <a href="https://teleg.run/Like_House_org">
          <img src="./icons/TelegramIcon.svg" alt="" className="footer__social" />
        </a>
        <a href="https://wa.clck.bar/375333623505">
          <img src="./icons/WhatsappIcon.svg" alt="" className="footer__social" />
        </a>
        <a href="https://www.youtube.com/@likehouse_org">
          <img src="../icons/YouTubeIcon.svg" alt="" className="footer__social" />
        </a>
      </div>
    );
  }
}
