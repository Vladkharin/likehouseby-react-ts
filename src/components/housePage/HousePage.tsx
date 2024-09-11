import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  typeItemHouse,
  typeAdditionalService,
  typeInputValue,
  typeListActiveAdditionalServices,
  typeAdditionalServices,
  typeActiveAdditionalService,
} from "../typesAndIntefaces.tsx";

import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";

import {
  choiceAdditionalServices,
  basicConfigurationOfTwoStoreyHouses,
  basicConfigurationOfCottage,
  basicConfigurationBathHouse,
  basicConfigurationArchitectCottageHouse,
  basicConfigurationCloverCottageHouse,
  itemsHouse,
  defineDomain,
} from "../../houses.ts";
import { typeInputsError } from "../typesAndIntefaces";

import { AdditionalServiceItems } from "./housePageComponents/AdditionalServiceItems.tsx";

const FORM_STATUS_MESSAGE = {
  loading: "Загрузка...",
  success: "Спасибо! Скоро мы с вами свяжемся",
  failure: "Что-то пошло не так...",
};

const maskGenerator = createDefaultMaskGenerator("+7 999 999 99 99");
export function HousePage() {
  const locationPage = useLocation();

  const [additionalService, setAdditionalService] = useState<typeAdditionalService>();
  const [house, setHouse] = useState<typeItemHouse>();
  const [coustHouse, setCoustHouse] = useState<string | undefined>(house?.coust);
  const [priceAdditionalServices, setPriceAdditionalServices] = useState<number>(0);
  const [listActiveAdditionalServices, setListActiveAdditionalServices] = useState<typeListActiveAdditionalServices>([]);
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const [stateModalImg, setStateModalImg] = useState<boolean>(false);
  const [stateModalForm, setStateModalForm] = useState<boolean>(false);
  const [fetchStatus, setFetchStatus] = useState<string>("");
  const [inputsError, setInputsError] = useState<typeInputsError>({
    inputName: "",
    inputPhone: "",
  });
  const [inputPhoneValue, setInputPhoneValue] = useState<string>("");

  const [imitationOfTimber, setImitationOfTimber] = useState<typeActiveAdditionalService>({
    name: "",
    code: "",
    count: 0,
    coust: 0,
  });

  const [wallsAndCeilings, setWallsAndCeilings] = useState<typeActiveAdditionalService>({
    name: "",
    code: "",
    count: 0,
    coust: 0,
  });

  const [inputValue, setInputValue] = useState<typeInputValue>({
    Колодец: 0,
    Скважина: 0,
  });
  const [stateInput, setStateInput] = useState<typeInputValue>({
    Колодец: 0,
    Скважина: 0,
  });

  const getHouse = () => {
    const pathName = locationPage.pathname.split("/")[2];
    const house = itemsHouse.filter((item) => item.link === pathName)[0];
    setHouse(house);

    return house;
  };
  const domain: string = defineDomain(location.hostname);
  const fetchUrl: string = domain == "org" ? "./../1c_site.json" : "./../1c_bel_site.json";

  const fetchAdditionalServices = async (fetchUrl: string) => {
    const house = getHouse();

    const response = await fetch(fetchUrl, { method: "GET" });
    const data: typeAdditionalServices = await response.json();

    data["Дома"].forEach((item: typeAdditionalService) => {
      if (item["ДомКод"] == house?.code) {
        setAdditionalService(item);
        const array: typeActiveAdditionalService[] = [];

        item["Разделы"].forEach((section) => {
          if (section["Код"] === "000000008") {
            let wellValue = 0;
            let sumpValue = 0;
            section["Подразделы"].forEach((subsection) => {
              if (subsection["Код"] === "000000126") {
                sumpValue = subsection.Стоимость;
              }

              if (subsection["Код"] === "000000127") {
                wellValue = subsection.Стоимость;
              }
            });

            setInputValue({
              Колодец: wellValue,
              Скважина: sumpValue,
            });
          }

          if (section["Код"] === "000000002") {
            section["Подразделы"].forEach((subsection) => {
              if (subsection["Код"] === "000000144") {
                array.push({
                  name: subsection.Подраздел,
                  code: subsection.Код,
                  count: 1,
                  coust: subsection.Стоимость,
                });

                setImitationOfTimber({
                  name: subsection.Подраздел,
                  code: subsection.Код,
                  count: 1,
                  coust: subsection.Стоимость,
                });
              }
            });
          }

          if (section["Код"] === "000000003") {
            section["Подразделы"].forEach((subsection) => {
              if (subsection["Код"] === "000000132") {
                array.push({
                  name: subsection.Подраздел,
                  code: subsection.Код,
                  count: 1,
                  coust: subsection.Стоимость,
                });

                setWallsAndCeilings({
                  name: subsection.Подраздел,
                  code: subsection.Код,
                  count: 1,
                  coust: subsection.Стоимость,
                });
              }
            });
          }

          if (section["Раздел"] === "Строительство дома в базовой комплектации") {
            setCoustHouse(section["Подразделы"][0].Стоимость.toString());
          }
        });

        if (house.coust) {
          setPriceAdditionalServices(array.reduce((acc, currnetValue) => acc + currnetValue.coust, 0));
        }

        setListActiveAdditionalServices([...array]);
      } else {
        setCoustHouse("Скоро будет доступна");
      }
    });
  };

  const scrollToTop = () => {
    const y = window.scrollY;
    window.scrollBy(0, -y);
  };

  useEffect(() => {
    fetchAdditionalServices(fetchUrl);

    scrollToTop();
  }, [fetchUrl]);

  useEffect(() => {
    document.title = house?.houseName as string;
    console.log(document.head);
  });

  function viewAddtionalServicesBlock() {
    return (
      <>
        <div className="stylePagesecondBlock__header">Дополнительные услуги</div>
        {additionalService && coustHouse ? (
          AdditionalServiceItems(
            additionalService,
            inputValue,
            stateInput,
            setStateInput,
            listActiveAdditionalServices,
            setListActiveAdditionalServices,
            choiceAdditionalServices,
            setPriceAdditionalServices,
            imitationOfTimber,
            wallsAndCeilings
          )
        ) : (
          <div>Загружается</div>
        )}
      </>
    );
  }

  console.log(coustHouse);

  return (
    <React.Fragment>
      <div className="stylePagefirstBlock bath">
        <div className="stylePagecontainer">
          <div className="stylePagefirstBlock__header">{house ? house["houseName"] : "Загружается!"}</div>
          <div className="stylePagefirstBlock__wrapper">
            <div className="stylePagefirstBlock__carousel">
              <img
                src={house?.imgs ? house.imgs[activeImgIndex] : ""}
                className="stylePagefirstBlock__carousel-item"
                data-modal="imgs"
                onClick={() => setStateModalImg(true)}
              />
              <button
                className="stylePagefirstBlock__carousel-right"
                onClick={() => (house ? mainSlider(activeImgIndex, setActiveImgIndex, house, "plus") : false)}
              >
                <img src="../icons/NextArrow.png" alt="next" />
              </button>
              <button
                className="stylePagefirstBlock__carousel-left"
                onClick={() => (house ? mainSlider(activeImgIndex, setActiveImgIndex, house, "minus") : false)}
              >
                <img src="../icons/PrevArrow.png" alt="prev" />
              </button>
              {house ? houseImgs(house, activeImgIndex, setStateModalImg, setActiveImgIndex) : <div>Загружается</div>}
            </div>
            {coustHouse && house ? houseInformation(house, coustHouse, priceAdditionalServices) : <div>Загружается</div>}
          </div>
        </div>
      </div>
      <div className="stylePagesecondBlock">
        <div className="stylePagecontainer">
          <div className="stylePagesecondBlock__header">Базовая комплектация проекта</div>
          {house ? basicConfiguration(house) : false}

          {house?.type != "bathhouse" ? viewAddtionalServicesBlock() : ""}
        </div>
      </div>
      {/* <button className="stylePageorder" onClick={() => setStateModalForm(true)}>
        Получить коммерческое предложение
      </button> */}
      <div className="stylePagecost">
        СТОИМОСТЬ:
        <span className="stylePagecost__span">
          {coustHouse == "Скоро будет доступна" ? "Скоро будет" : Number(coustHouse) + priceAdditionalServices + " руб."}
        </span>
      </div>
      <div id="id" className="stylePagenone">
        {house?.code}
      </div>
      {house && coustHouse
        ? modalForm(
            stateModalForm,
            setStateModalForm,
            listActiveAdditionalServices,
            coustHouse,
            priceAdditionalServices,
            setInputsError,
            inputsError,
            setFetchStatus,
            inputPhoneValue,
            setInputPhoneValue,
            fetchStatus
          )
        : false}
      {house ? modalImg(stateModalImg, house, setStateModalImg, activeImgIndex, setActiveImgIndex) : false}
    </React.Fragment>
  );
}

async function checkingTheNumberForWhatsApp(inputTel: string) {
  const body = {
    phoneNumber: inputTel.slice(1).split(" ").join(""),
  };

  const url =
    import.meta.env.VITE_API_URL +
    "/waInstance" +
    import.meta.env.VITE_ID_INSTANCE +
    "/checkWhatsapp/" +
    import.meta.env.VITE_API_TOKEN_INSTANCE;

  const responseFetchPhone = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await responseFetchPhone.json();

  return data;
}

async function postData(
  event: React.FormEvent<HTMLFormElement>,
  setInputsError: React.Dispatch<React.SetStateAction<typeInputsError>>,
  inputsError: typeInputsError,
  setFetchStatus: React.Dispatch<React.SetStateAction<string>>,
  listActiveAdditionalServices: typeListActiveAdditionalServices
) {
  event.preventDefault();

  const form = event.nativeEvent.target as HTMLFormElement;

  const inputTel = (form.childNodes[2].childNodes[2] as HTMLInputElement).value;

  const error = await formValidate(form, setInputsError, inputsError, setFetchStatus, inputTel);

  setFetchStatus(FORM_STATUS_MESSAGE.loading);

  if (error === 0) {
    setFetchStatus("");
    const formData = new FormData(form);

    const phone = inputTel;

    formData.set("choice", JSON.stringify(listActiveAdditionalServices));

    formData.set("user_phone", phone);

    const response = await fetch("sendorder.php", {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      setFetchStatus(FORM_STATUS_MESSAGE.success);
      form.reset();
    } else {
      setFetchStatus(FORM_STATUS_MESSAGE.failure);
      form.reset();
    }
  } else {
    setFetchStatus("");
  }
}

async function formValidate(
  form: HTMLFormElement,
  setInputsError: React.Dispatch<React.SetStateAction<typeInputsError>>,
  inputsError: typeInputsError,
  setFetchStatus: React.Dispatch<React.SetStateAction<string>>,
  inputTel: string
) {
  let error = 0;

  const formReq = [form.childNodes[1].childNodes[2], form.childNodes[2].childNodes[2]];

  formRemoveError(form.childNodes[1].childNodes[2] as HTMLInputElement, setInputsError, inputsError);
  formRemoveError(form.childNodes[2].childNodes[2] as HTMLInputElement, setInputsError, inputsError);

  const errorChecking = await checkingTheNumberForWhatsApp(inputTel);

  if (!errorChecking.existsWhatsapp) {
    error++;
  }

  let obj: typeInputsError = {
    inputName: "",
    inputPhone: errorChecking.existsWhatsapp ? "" : "Такого номера в Whatsapp нету",
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

function modalForm(
  stateModalForm: boolean,
  setStateModalForm: React.Dispatch<React.SetStateAction<boolean>>,
  listActiveAdditionalServices: typeListActiveAdditionalServices,
  coustHouse: string,
  priceAdditionalServices: number,
  setInputsError: React.Dispatch<React.SetStateAction<typeInputsError>>,
  inputsError: typeInputsError,
  setFetchStatus: React.Dispatch<React.SetStateAction<string>>,
  inputPhoneValue: string,
  setInputPhoneValue: React.Dispatch<React.SetStateAction<string>>,
  fetchStatus: string
) {
  return (
    <div className={stateModalForm ? "stylePageorderModal stylePagevisible" : "stylePageorderModal notVisible"}>
      <div className="stylePageorderModal__wrapper">
        <form
          className="stylePageorderModal__form"
          action="sendorder.php"
          method="post"
          onSubmit={(event) => postData(event, setInputsError, inputsError, setFetchStatus, listActiveAdditionalServices)}
        >
          <label>
            <div>Получить предложение</div>
          </label>
          <label>
            <p>Введите имя</p> <input type="text" name="user_name" className="_req" />
          </label>
          <label>
            <p>Введите номер WhatsApp</p>{" "}
            <MaskedInput
              maskGenerator={maskGenerator}
              className="_req"
              style={{
                paddingLeft: "70px",
              }}
              name="user_phone"
              type="tel"
              placeholder="+7 999 999 99 99"
              value={inputPhoneValue}
              onChange={() => {
                setInputPhoneValue;
                setInputsError({
                  inputName: "",
                  inputPhone: "",
                });
                setFetchStatus("");
              }}
              data-phonemask={"+7"}
            />
          </label>

          <button type="submit">Потдвердить</button>
          <div
            className={
              inputsError.inputName == "Обязательное поле" || inputsError.inputName == "Слишком длинное значение"
                ? "errorBig tl17585 show"
                : "errorBig tl17585 notVisible"
            }
          >
            {inputsError.inputName}
          </div>
          <div
            className={
              inputsError.inputPhone == "Такого номера в Whatsapp нету" ||
              inputsError.inputPhone == "Слишком короткое значение" ||
              inputsError.inputPhone == "Обязательное поле"
                ? "errorBig tl24085 show"
                : "errorBig tl24085 notVisible"
            }
          >
            {inputsError.inputPhone}
          </div>
        </form>
        <div className="stylePageorders">
          <p>Вы выбрали:</p>
          <div className="stylePageorderWrapper">
            {listActiveAdditionalServices.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="stylePageorderItem">
                    {index + 1}. {item.name} - {item.count}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <p className="stylePagetotal">{"Итого: " + (Number(coustHouse) + priceAdditionalServices) + " руб."}</p>
        </div>
        <button className="stylePageorderModal__close" onClick={() => setStateModalForm(false)}>
          {" "}
        </button>
      </div>
      <div
        className={
          fetchStatus === "Спасибо! Скоро мы с вами свяжемся" || fetchStatus === "Что-то пошло не так..."
            ? "feedBackModal smallFeedBackModal"
            : "feedBackModal smallFeedBackModal none"
        }
      >
        <div className="feedBackModal__wrapper">
          <img src="../icons/crestikBlack.svg" alt="" className="crestikBlack" onClick={() => setFetchStatus("")} />
          <div className={fetchStatus === "Спасибо! Скоро мы с вами свяжемся" ? "feedBackModal__complete" : "feedBackModal__failure"}></div>
          <div className="feedBackModal__text">{fetchStatus}</div>
        </div>
      </div>
    </div>
  );
}

function houseInformation(house: typeItemHouse, coustHouse: string, priceAdditionalServices: number) {
  return (
    <div className="stylePagefirstBlock__information">
      {house.information
        ? house.information.map((item, index) => {
            index = 10140 + index;
            if (item.split(":")[0] === "Размер") {
              if (house.type != "bathhouse") {
                item = item.split(":")[0] + " дома: " + item.split(":")[1].split(" ")[1];
              } else {
                item = item.split(":")[0] + " бани: " + item.split(":")[1].split(" ")[1];
              }
            }

            if (item.split(":")[0] === "Площадь") {
              if (house.type != "bathhouse") {
                item = item.split(":")[0] + " дома: " + item.split(":")[1];
              } else {
                item = item.split(":")[0] + " бани: " + item.split(":")[1];
              }
            }

            return (
              <div key={index} className="stylePagefirstBlock__information-text">
                {item}
              </div>
            );
          })
        : false}
      <div className="stylePagefirstBlock__button">
        СТОИМОСТЬ:{" "}
        <span>{coustHouse == "Скоро будет доступна" ? "Скоро будет" : Number(coustHouse) + priceAdditionalServices + " руб."}</span>
      </div>
    </div>
  );
}

function houseImgs(
  house: typeItemHouse,
  activeImgIndex: number,
  setStateModalImg: React.Dispatch<React.SetStateAction<boolean>>,
  setActiveImgIndex: React.Dispatch<React.SetStateAction<number>>
) {
  let translate = 0;
  if (house.imgs && activeImgIndex > 1 && activeImgIndex < house.imgs.length - 1) {
    translate = -180 * (activeImgIndex - 1);
  } else if (house.imgs && activeImgIndex == house.imgs.length - 1) {
    translate = -180 * (activeImgIndex - 2);
  }
  return (
    <div className="stylePagefirstBlock__wrapper-field">
      <div className="stylePagefirstBlock__field" style={{ transform: `translateX(${translate}px)` }}>
        {house.imgs
          ? house.imgs.map((item, index) => {
              let activeClass = "";
              if (index == activeImgIndex) {
                activeClass = "stylePageactive";
              }

              index = 10201 + index;
              return (
                <img
                  key={index}
                  className={`stylePagefirstBlock__field-img ` + activeClass}
                  src={item}
                  alt=""
                  onClick={() => {
                    setActiveImgIndex(index - 10201);
                    setStateModalImg(true);
                  }}
                ></img>
              );
            })
          : false}
      </div>
    </div>
  );
}

function mainSlider(
  activeImgIndex: number,
  setActiveImgIndex: React.Dispatch<React.SetStateAction<number>>,
  house: typeItemHouse,
  action: string
) {
  let number = 0;
  if (action == "plus") {
    number = activeImgIndex + 1;
  } else {
    number = activeImgIndex - 1;
  }

  if (house.imgs && number >= house.imgs.length) {
    number = 0;
  } else if (house.imgs && number < 0) {
    number = house.imgs.length - 1;
  }
  setActiveImgIndex(number);
}

function basicConfiguration(house: typeItemHouse) {
  let arrayConf: string[] = [];
  switch (house.type) {
    case "two-storey house":
      if (house.typeHouse === "Клевер" || house.typeHouse === "Шварц" || house.typeHouse === "Эркерия" || house.typeHouse === "Классик") {
        arrayConf = basicConfigurationCloverCottageHouse;
      } else {
        arrayConf = basicConfigurationOfTwoStoreyHouses;
      }
      break;
    case "cottage":
      switch (house.typeHouse) {
        case "Архитект":
          arrayConf = basicConfigurationArchitectCottageHouse;
          break;
        default:
          arrayConf = basicConfigurationOfCottage;
          break;
      }
      break;
    case "bathhouse":
      arrayConf = basicConfigurationBathHouse;
      break;
  }

  return (
    <div className="stylePagesecondBlock__items">
      {arrayConf.map((item, index) => {
        index = 200212 + index;
        const itemArray = item.split(" ? ");
        return (
          <React.Fragment key={index}>
            <div className="stylePageline"></div>
            <div className="stylePagesecondBlock__item">
              <div className="stylePagesecondBlock__item-name">{itemArray[0]}</div>
              <div className="stylePagesecondBlock__item-key">{itemArray[1]}</div>
            </div>
          </React.Fragment>
        );
      })}
      <div className="stylePageline"></div>
    </div>
  );
}

function modalImg(
  stateModalImg: boolean,
  house: typeItemHouse,
  setStateModalImg: React.Dispatch<React.SetStateAction<boolean>>,
  activeImgIndex: number,
  setActiveImgIndex: React.Dispatch<React.SetStateAction<number>>
) {
  let activeStyleWrapper = "stylePagenotVisible";

  if (stateModalImg) {
    activeStyleWrapper = "";
  }

  return (
    <div className={"stylePagemodalMain stylePagebgwhite " + activeStyleWrapper}>
      <div className="stylePagemodalMain__wrapper">
        <button className="stylePagemodal__closeBlack" onClick={() => setStateModalImg(false)}>
          {" "}
        </button>
        {house.imgs
          ? house.imgs.map((img, index) => {
              index += 123234432;

              let activeClassSlide = "stylePagenone";

              if (house.imgs && house.imgs[activeImgIndex] == img) {
                activeClassSlide = "stylePageBlock";
              }
              return (
                <img
                  key={index}
                  className={"stylePagemodalMain__img stylePageslider stylePagemodalBig " + activeClassSlide}
                  src={img}
                  alt=""
                />
              );
            })
          : false}
        <button
          className="stylePagemodal__right"
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
          className="stylePagemodal__left"
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
