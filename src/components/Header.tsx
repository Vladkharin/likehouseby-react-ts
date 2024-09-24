import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

type typeHeaderProps = {
  scroll: number;
  mainPage: string;
  setBodyStyle: React.Dispatch<React.SetStateAction<string>>;
};

export function Header({ scroll, mainPage, setBodyStyle }: typeHeaderProps) {
  const [menuTel, setMenuTel] = useState<boolean>(false);

  if (useLocation().pathname == mainPage) {
    return (
      <nav className={`nav${scroll > 93 ? " changeBgNav" : ""}`}>
        <div className="container">
          <div className="nav__wrapper">
            <div className="nav__menu">
              <img
                className="menu__Open"
                src="./icons/MenuIcon.svg"
                alt="MenuIcon"
                onClick={() => {
                  setMenuTel(true);
                  setBodyStyle("hidden");
                }}
              />
              <div className="nav__links">
                <a href="#about" className="menu__link">
                  О нас
                </a>
                <a href="#catalog" className="menu__link l481">
                  Каталог
                </a>
                <a href="#tech" className="menu__link">
                  Технология
                </a>
                <a href="#dop" className="menu__link">
                  Доп. услуги
                </a>
                <a href="#feedback" className="menu__link">
                  Отзывы
                </a>
                <a href="#contacts" className="menu__link">
                  Контакты
                </a>
              </div>
            </div>
            {menuIconsBy()}
            {menuTelephoneBy()}
          </div>
        </div>
        {menu(menuTel, setMenuTel, setBodyStyle)}
      </nav>
    );
  } else {
    return (
      <nav className="stylePagenav">
        <div className="stylePagecontainer">
          <div className="stylePagenav__wrapper">
            <div className="stylePagenav__menu">
              <Link to={"/"} className="stylePagemenu__linkMainPage">
                На главную
              </Link>
            </div>
            {menuGreyIconsBy()}
            {menuTelephoneBy()}
          </div>
        </div>
      </nav>
    );
  }
}

function menu(
  menuTel: boolean,
  setMenuTel: React.Dispatch<React.SetStateAction<boolean>>,
  setBodyStyle: React.Dispatch<React.SetStateAction<string>>
) {
  let overlayClass = "overlay";
  let menuClass = "menu";
  if (menuTel) {
    overlayClass = "overlay block";
    menuClass = "menu visible";
  }

  return (
    <>
      <div className={overlayClass} onClick={() => setMenuTel(false)}></div>
      <div className={menuClass}>
        <div className="menu__links">
          <a
            href="#about"
            className="menu__link"
            onClick={() => {
              setMenuTel(false);
              setBodyStyle("");
            }}
          >
            О нас
          </a>
          <a
            href="#catalog"
            className="menu__link"
            onClick={() => {
              setMenuTel(false);
              setBodyStyle("");
            }}
          >
            Каталог
          </a>
          <a
            href="#tech"
            className="menu__link"
            onClick={() => {
              setMenuTel(false);
              setBodyStyle("");
            }}
          >
            Технология
          </a>
          <a
            href="#dop"
            className="menu__link"
            onClick={() => {
              setMenuTel(false);
              setBodyStyle("");
            }}
          >
            Доп. услуги
          </a>
          <a
            href="#feedback"
            className="menu__link"
            onClick={() => {
              setMenuTel(false);
              setBodyStyle("");
            }}
          >
            Отзывы
          </a>
          <a
            href="#contacts"
            className="menu__link"
            onClick={() => {
              setMenuTel(false);
              setBodyStyle("");
            }}
          >
            Контакты
          </a>
        </div>
        <button
          className="menu__Close"
          onClick={() => {
            setMenuTel(false);
            setBodyStyle("");
          }}
        >
          {" "}
        </button>
      </div>
    </>
  );
}

function menuIconsBy() {
  return (
    <div className="nav__icons">
      <a href="https://www.instagram.com/likehouse.by" className="nav__icon">
        <img src="../icons/instaIcon.svg" alt="" />
      </a>
      <a href="https://teleg.run/Like_House_org" className="nav__icon">
        <img src="./icons/TelegramIcon.svg" alt="" />
      </a>
      <a href="https://wa.clck.bar/375333623505" className="nav__icon">
        <img src="./icons/WhatsappIcon.svg" alt="" />
      </a>
      <a href="https://www.youtube.com/@likehouse_org" className="nav__icon">
        <img src="./icons/YouTubeIcon.svg" alt="" />
      </a>
      <a href="mailto:info@likehouse.org" className="nav__icon">
        <img src="./icons/EmailIcon.svg" alt="" />
      </a>
    </div>
  );
}

function menuGreyIconsBy() {
  return (
    <div className="stylePagenav__icons">
      <a href="https://www.instagram.com/likehouse.by" className="stylePagenav__icon">
        <img src="../icons/instaGreyIcon.svg" alt="" />
      </a>
      <a href="https://teleg.run/Like_House_org" className="stylePagenav__icon">
        <img src="../icons/TelegramGreyIcon.svg" alt="" />
      </a>
      <a href="https://wa.clck.bar/375333623505" className="stylePagenav__icon">
        <img src="../icons/WhatsappGreyIcon.svg" alt="" />
      </a>
      <a href="https://www.youtube.com/@likehouse_org" className="stylePagenav__icon">
        <img src="../icons/YouTubeGreyIcon.svg" alt="" />
      </a>
      <a href="mailto:info@likehouse.org" className="stylePagenav__icon">
        <img src="../icons/EmailGreyIcon.svg" alt="" />
      </a>
    </div>
  );
}

function menuTelephoneBy() {
  return (
    <div className="nav__item-title">
      <a className="nav__item-linkWithOutdecoration" href="tel:+375333623505">
        +375 33 362-35-05
      </a>
      <br />
    </div>
  );
}
