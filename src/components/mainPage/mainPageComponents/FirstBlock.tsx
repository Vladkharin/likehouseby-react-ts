import React, { useState } from "react";
import { arrayNameAndNumber, arrayPositionBG, defineDomain } from "../../../houses";
import { typeInputsError } from "../../typesAndIntefaces";
import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";

const maskGenerator = createDefaultMaskGenerator("(999) 999-99-99");

const FORM_STATUS_MESSAGE = {
  loading: "Загрузка...",
  success: "Спасибо! Скоро мы с вами свяжемся",
  failure: "Что-то пошло не так...",
};

type typeTelInputInfo = {
  backgroundPosition: string;
  codeCountry: string;
};

type Props = {
  setBodyStyle: React.Dispatch<React.SetStateAction<string>>;
};

export function FirstBlock({ setBodyStyle }: Props) {
  const [stateModal, setStateModal] = useState<boolean>(false);
  const [stateContextMenu, setStateContextMenu] = useState<boolean>(false);
  const [inputPhoneValue, setInputPhoneValue] = useState<string>("");
  const [fetchStatus, setFetchStatus] = useState<string>("");
  const [inputsError, setInputsError] = useState<typeInputsError>({
    inputName: "",
    inputPhone: "",
  });
  const [telInputInfo, setTelInputInfo] = useState({
    backgroundPosition: "-285px -281px",
    codeCountry: "+7",
  });

  const domain: string = defineDomain(location.hostname);

  if (stateModal) {
    setBodyStyle("hidden");
  } else {
    setBodyStyle("");
  }

  return (
    <div className={domain == "org" ? "firstBlock" : "firstByBlock"}>
      <div className="container">{domain == "org" ? firstBlockRu(setStateModal) : firstBlockBy(setStateModal)}</div>
      <div className={domain == "org" ? "animation" : "none"}>
        <img src="./icons/partner.svg?ver=1" alt="partner" className="animation__spin" />
      </div>

      {modal(
        stateModal,
        setStateModal,
        stateContextMenu,
        setStateContextMenu,
        inputsError,
        setInputsError,
        inputPhoneValue,
        setInputPhoneValue,
        fetchStatus,
        setFetchStatus,
        telInputInfo,
        setTelInputInfo
      )}
    </div>
  );
}

function modal(
  stateModal: boolean,
  setStateModal: React.Dispatch<React.SetStateAction<boolean>>,
  stateContextMenu: boolean,
  setStateContextMenu: React.Dispatch<React.SetStateAction<boolean>>,
  inputsError: typeInputsError,
  setInputsError: React.Dispatch<React.SetStateAction<typeInputsError>>,
  inputPhoneValue: string,
  setInputPhoneValue: React.Dispatch<React.SetStateAction<string>>,
  fetchStatus: string,
  setFetchStatus: React.Dispatch<React.SetStateAction<string>>,
  telInputInfo: typeTelInputInfo,
  setTelInputInfo: React.Dispatch<React.SetStateAction<typeTelInputInfo>>
) {
  let modalActiveStyle = "none";
  let contextMenuActiveStyle = "none";
  if (stateModal) {
    modalActiveStyle = "flex";
  }

  if (stateContextMenu) {
    contextMenuActiveStyle = "flex";
  }
  return (
    <div className="feedBack" style={{ display: modalActiveStyle }}>
      <div className="feedBack__wrapper">
        <img className="feedBack__mainImg" src="./img/Видовой_кадр_01_9.5x14.jpg?v=1" alt="feedback" />
        <form
          action="sendmail.php"
          className="feedBack__form"
          onSubmit={(event) => postData(event, setInputsError, inputsError, setFetchStatus)}
        >
          <div className="feedBack__form-header">Оставьте заявку</div>
          <input
            className={
              inputsError.inputName != "" ? "feedBack__from-inputText _req _error" : "feedBack__from-inputText _req"
            }
            name="user_name"
            type="text"
            placeholder="Ваше имя"
            onChange={() => {
              setInputsError({
                inputName: "",
                inputPhone: "",
              });
              setFetchStatus("");
            }}
          />
          <div
            className="feedBack__menu"
            onClick={() => {
              if (stateContextMenu) {
                setStateContextMenu(false);
              } else {
                setStateContextMenu(true);
              }
            }}
          >
            <div className="feedBack__menu-flag" style={{ backgroundPosition: telInputInfo.backgroundPosition }}></div>
            <div
              className="feedBack__menu-arrow"
              style={stateContextMenu ? { rotate: "180deg" } : { rotate: "360deg" }}
            ></div>
            <div className="feedBack__menu-number">{telInputInfo.codeCountry}</div>
          </div>
          <MaskedInput
            maskGenerator={maskGenerator}
            className={
              inputsError.inputPhone != "" ? "feedBack__from-inputPhone _req _error" : "feedBack__from-inputPhone _req"
            }
            style={{
              paddingLeft:
                telInputInfo.codeCountry.trim().length > 5
                  ? "110px"
                  : telInputInfo.codeCountry.trim().length * 10 + 50 + "px",
            }}
            name="user_phone"
            type="tel"
            placeholder="(999) 999-99-99"
            value={inputPhoneValue}
            onChange={() => {
              setInputPhoneValue;
              setInputsError({
                inputName: "",
                inputPhone: "",
              });
              setFetchStatus("");
            }}
            data-phonemask={telInputInfo.codeCountry.trim()}
          />
          <button type="submit" className="feedBack__form-submit">
            <div className={fetchStatus === "Загрузка..." ? "loader block" : "loader none"}></div>
            <div
              className={
                fetchStatus === "Загрузка..." ? "feedBack__form-submitText none" : "feedBack__form-submitText block"
              }
            >
              Отправить
            </div>
          </button>
          <div className="feedBack__form-text">Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности</div>
          <div className="feedBack__form-imgs">
            <a href="https://vk.com/like_house">
              <img src="./icons/Tilda_Icons_26snw_vk.svg" alt="" className="feedBack__form-img" />
            </a>
            <a href="https://wa.clck.bar/79251047452">
              <img src="./icons/Tilda_Icons_26snw_wh.svg" alt="" className="feedBack__form-img" />
            </a>
          </div>

          <img src="./icons/touch.svg" alt="" className="feedBack__form-touch" />
          <div className="feedBack__menu-buttons" style={{ display: contextMenuActiveStyle }}>
            {" "}
            {contextMenu(setTelInputInfo, setStateContextMenu)}
          </div>
          <div
            className={inputsError.inputName == "Обязательное поле" ? "error tl17585 show" : "error tl17585 notVisible"}
          >
            Обязательное поле
          </div>
          <div
            className={
              inputsError.inputName == "Слишком длинное значение"
                ? "errorBig tl17585 show"
                : "errorBig tl17585 notVisible"
            }
          >
            Слишком длинное значение
          </div>
          <div
            className={
              inputsError.inputPhone == "Обязательное поле" ? "error tl24085 show" : "error tl24085 notVisible"
            }
          >
            Обязательное поле
          </div>
          <div
            className={
              inputsError.inputPhone == "Слишком короткое значение"
                ? "errorTel tl24085 show"
                : "errorTel tl24085 notVisible"
            }
          >
            Слишком короткое значение
          </div>
          <div className="crestik" onClick={() => setStateModal(false)}>
            <img src="./icons/crestik.svg" alt="" />
          </div>
        </form>
        <div
          className={
            fetchStatus === "Спасибо! Скоро мы с вами свяжемся" || fetchStatus === "Что-то пошло не так..."
              ? "feedBackModal"
              : "feedBackModal none"
          }
        >
          <div className="feedBackModal__wrapper">
            <img src="./icons/crestikBlack.svg" alt="" className="crestikBlack" onClick={() => setFetchStatus("")} />
            <div
              className={
                fetchStatus === "Спасибо! Скоро мы с вами свяжемся"
                  ? "feedBackModal__complete"
                  : "feedBackModal__failure"
              }
            ></div>
            <div className="feedBackModal__text">{fetchStatus}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function postData(
  event: React.FormEvent<HTMLFormElement>,
  setInputsError: React.Dispatch<React.SetStateAction<typeInputsError>>,
  inputsError: typeInputsError,
  setFetchStatus: React.Dispatch<React.SetStateAction<string>>
) {
  event.preventDefault();

  const form = event.nativeEvent.target as HTMLFormElement;

  const error = formValidate(form, setInputsError, inputsError, setFetchStatus);

  const indexNumber = form.childNodes[2].childNodes[2].textContent;
  const inputTel = (form.childNodes[3] as HTMLInputElement).value;

  setFetchStatus(FORM_STATUS_MESSAGE.loading);

  if (error === 0) {
    setFetchStatus("");
    const formData = new FormData(form);

    const phone = indexNumber + inputTel;

    formData.set("user_phone", phone);

    const response = await fetch("sendmail.php", {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      setFetchStatus(FORM_STATUS_MESSAGE.success);
      form.reset();
    } else {
      setFetchStatus(FORM_STATUS_MESSAGE.failure);
    }
  } else {
    setFetchStatus("");
  }
}

function formValidate(
  form: HTMLFormElement,
  setInputsError: React.Dispatch<React.SetStateAction<typeInputsError>>,
  inputsError: typeInputsError,
  setFetchStatus: React.Dispatch<React.SetStateAction<string>>
) {
  let error = 0;

  const formReq = [form.childNodes[1], form.childNodes[3]];

  formRemoveError(form.childNodes[3] as HTMLInputElement, setInputsError, inputsError);
  formRemoveError(form.childNodes[1] as HTMLInputElement, setInputsError, inputsError);

  let obj: typeInputsError = {
    inputName: "",
    inputPhone: "",
  };

  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index] as HTMLInputElement;

    if (input.name === "user_name") {
      if (input.value.length > 25) {
        obj = { ...obj, inputName: "Слишком длинное значение" };
        error++;
      }

      if (input.value.trim() === "") {
        obj = { ...obj, inputName: "Обязательное поле" };
        error++;
      }
    }

    if (input.name === "user_phone") {
      if (input.value === "") {
        obj = { ...obj, inputPhone: "Обязательное поле" };
        error++;
      }

      if (input.value.length < 15 && input.value.length > 0) {
        obj = { ...obj, inputPhone: "Слишком короткое значение" };
        error++;
      }
    }
  }
  setFetchStatus("");
  setInputsError(obj);

  return error;
}

function formRemoveError(
  input: HTMLInputElement,
  setInputsError: React.Dispatch<React.SetStateAction<typeInputsError>>,
  inputsError: typeInputsError
) {
  if (input.name === "user_phone") {
    setInputsError({ ...inputsError, inputPhone: "" });
  } else if (input.name === "user_name") {
    setInputsError({ ...inputsError, inputName: "" });
  }
}

function contextMenu(
  setTelInputInfo: React.Dispatch<React.SetStateAction<typeTelInputInfo>>,
  setStateContextMenu: React.Dispatch<React.SetStateAction<boolean>>
) {
  return (
    <>
      {createArrCountryCatalog().map((item, index) => {
        return (
          <div
            key={index + 919923}
            className="feedBack__menu-button"
            onClick={() => {
              setTelInputInfo({
                backgroundPosition: item.position,
                codeCountry: item.number,
              });
              setStateContextMenu(false);
            }}
          >
            <div className="feedBack__menu-buttonLeft">{item.name}</div>
            <div className="feedBack__menu-buttonRight">
              <div className="feedBack__menu-buttonNumber" data-position={item.position}>
                {item.number}
              </div>
              <div className="img" style={{ backgroundPosition: item.position }}></div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function createArrCountryCatalog() {
  const countryCatalog = [];

  for (let i = 0; i < arrayNameAndNumber.length; i++) {
    const indexPosition = arrayPositionBG.indexOf(arrayNameAndNumber[i]);

    if (indexPosition != -1) {
      const task = {
        name: arrayNameAndNumber[i + 1],
        number: arrayNameAndNumber[i + 2],
        position: `${arrayPositionBG[indexPosition + 1]} ${arrayPositionBG[indexPosition + 2]}`,
      };

      countryCatalog.push(task);
    }
  }

  return countryCatalog;
}

function firstBlockRu(setStateModal: React.Dispatch<React.SetStateAction<boolean>>) {
  return (
    <>
      <div className="firstBlock__wrapper">
        <h1 className="firstBlock__header desc">
          <p style={{ margin: 0 }}>ЭКСЛЮЗИВНОЕ ПРЕДЛОЖЕНИЕ</p>
        </h1>
        <div className="line smallLine"></div>
        <div className="firstBlock__texts desc">
          <p className="firstBlock__text big">ИПОТЕКА НА СТРОИТЕЛЬСТВО БЕЗ ПЕРВОНАЧАЛЬНОГО ВЗНОСА</p>
          <img src="./assets/icons/эскроу-десктоп.svg" alt="" />
          <p className="firstBlock__text small">
            Честно строим каркасные дома и бани для жизни круглый год по цене как на сайте
          </p>
        </div>
        <div className="firstBlock__texts mob">
          <p className="firstBlock__text small">
            Честно строим каркасные дома и бани для жизни круглый год по цене как на сайте
          </p>
          <p className="firstBlock__text big">ИПОТЕКА НА СТРОИТЕЛЬСТВО БЕЗ ПЕРВОНАЧАЛЬНОГО ВЗНОСА</p>
          <p className="firstBlock__text small">эксклюзивное предложение для наших клиентов</p>
          <img src="./icons/эскроу-десктоп.svg" alt="" />
        </div>
        <img className="firstBlock__logo" src="./icons/лого.png" alt="logo" />
      </div>
      <div className="firstBlock__buttons">
        <div className="firstBlock__buttonMediaMax940px">
          <a href="tel:+74951277452">
            <button>Позвонить</button>
          </a>
        </div>

        <div className="firstBlock__buttonMap">
          <a href="#map">
            <button>Земельные участки</button>
          </a>
        </div>

        <div className="firstBlock__buttonMediaMin940px">
          <button onClick={() => setStateModal(true)}>Узнать условия</button>
        </div>
      </div>
    </>
  );
}

function firstBlockBy(setStateModal: React.Dispatch<React.SetStateAction<boolean>>) {
  return (
    <>
      <div className="firstBlockBy__wrapper">
        <div className="firstBlockBy__header">
          Лайк <span>Хаус</span>
        </div>
        <div className="lineBy smallLineBy"></div>
        <h1 className="firstBlockBy__title">
          Строим каркасные дома и бани с ориентированием на честное отношение к клиентам
        </h1>
      </div>
      <div className="firstBlockBy__buttons">
        <div className="firstBlockBy__buttonMediaMax940px">
          <a href="tel:+375333623505">
            <button>Позвонить</button>
          </a>
        </div>
        <div className="firstBlockBy__buttonMediaMin940px">
          <button onClick={() => setStateModal(true)}>Бесплатная консультация</button>
        </div>
      </div>
    </>
  );
}
