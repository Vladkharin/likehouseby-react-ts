import React, { useRef } from "react";
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

import { ModalWithSlider } from "./housePageComponents/modalWithSlider/ModalWithSlider.tsx";
import styles from "./HousePage.module.css";

import {
  choiceAdditionalServices,
  basicConfigurationOfTwoStoreyHouses,
  basicConfigurationOfCottage,
  basicConfigurationBathHouse,
  basicConfigurationArchitectCottageHouse,
  basicConfigurationCloverCottageHouse,
  itemsHouse,
} from "../../houses.ts";

import { AdditionalServiceItems } from "./housePageComponents/additionalServiceItems/AdditionalServiceItems.tsx";
import { VideoComponent } from "./housePageComponents/VideoComponent/VideoComponent.tsx";

export function HousePage() {
  const locationPage = useLocation();

  const [additionalService, setAdditionalService] = useState<typeAdditionalService>();
  const [house, setHouse] = useState<typeItemHouse | undefined>();
  const [coustHouse, setCoustHouse] = useState<string | undefined>(house?.coust);
  const [priceAdditionalServices, setPriceAdditionalServices] = useState<number>(0);
  const [listActiveAdditionalServices, setListActiveAdditionalServices] = useState<typeListActiveAdditionalServices>([]);
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const [stateModalImg, setStateModalImg] = useState<boolean>(false);

  const [positionY, setPositionY] = useState<number>(0);

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

  const myRef = useRef<HTMLElement>(null);
  const [heightFromTopVideosBlock, setHeightFromTopVideosBlock] = useState<number>(0);

  const getHouse = () => {
    const pathName = locationPage.pathname.split("/")[2];
    const house = itemsHouse.filter((item) => item.link === pathName)[0];
    setCoustHouse(house.coust);
    setHouse(house);

    return house;
  };
  const fetchUrl: string = "./../1c_bel_site.json";

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
  }, []);

  useEffect(() => {
    document.title = house?.houseName as string;

    if (myRef.current) {
      setHeightFromTopVideosBlock(myRef.current.getBoundingClientRect().y);
    }

    setPositionY(window.scrollY + heightFromTopVideosBlock - 101);
  });

  function viewAddtionalServicesBlock() {
    if (!additionalService && coustHouse) {
      return;
    }
    return (
      <>
        <div className={styles.header}>Дополнительные услуги</div>
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
          <div>Пока не добавили</div>
        )}
      </>
    );
  }

  return (
    <React.Fragment>
      <div className={styles.information}>
        <div className="container">
          <div className={styles.information_header}>{house ? house["houseName"] : "Загружается!"}</div>
          <div className={styles.information_wrapper}>
            <div className={styles.information_carousel}>
              <img
                src={house?.imgs ? house.imgs[activeImgIndex] : ""}
                className={styles.information_carousel_item}
                data-modal="imgs"
                onClick={() => setStateModalImg(true)}
              />
              <button
                className={styles.information_carousel_right}
                onClick={() => (house ? mainSlider(activeImgIndex, setActiveImgIndex, house, "plus") : false)}
              >
                <img src="../icons/NextArrow.png" alt="next" />
              </button>
              <button
                className={styles.information_carousel_left}
                onClick={() => (house ? mainSlider(activeImgIndex, setActiveImgIndex, house, "minus") : false)}
              >
                <img src="../icons/PrevArrow.png" alt="prev" />
              </button>
              {house ? houseImgs(house, activeImgIndex, setStateModalImg, setActiveImgIndex) : <div>Загружается</div>}
            </div>
            {coustHouse && house ? (
              houseInformation(house, coustHouse, priceAdditionalServices, heightFromTopVideosBlock, positionY)
            ) : (
              <div>Загружается</div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.basicConf}>
        <div className="container">
          <div className={styles.header}>Базовая комплектация проекта</div>
          {house ? basicConfiguration(house) : false}

          {viewAddtionalServicesBlock()}
        </div>
      </div>
      {house?.videos?.length != 0 ? <VideoComponent myRef={myRef} house={house} /> : ""}

      <div className={styles.coust}>
        Стоимость
        <span>
          {coustHouse == "Скоро будет доступна" ? ": Скоро будет" : `: ${stringConversion(coustHouse, priceAdditionalServices)} BYN.`}
        </span>
      </div>
      <div id="id" className={styles.none}>
        {house?.code}
      </div>
      {house ? (
        <ModalWithSlider
          stateModalImg={stateModalImg}
          house={house}
          setStateModalImg={setStateModalImg}
          activeImgIndex={activeImgIndex}
          setActiveImgIndex={setActiveImgIndex}
        />
      ) : (
        false
      )}
    </React.Fragment>
  );
}

function stringConversion(task: string | undefined, priceAdditionalServices: number) {
  const array: string[] = [];

  const coust = (Number(task) + priceAdditionalServices).toString();

  coust.split("").forEach((item, index) => {
    if (coust.length - index == 7) {
      item = item + " ";
    } else if (coust.length - index == 4) {
      item = item + " ";
    }
    array.push(item);
  });

  return array.join("");
}

function houseInformation(
  house: typeItemHouse,
  coustHouse: string,
  priceAdditionalServices: number,
  heightFromTopVideosBlock: number,
  positionY: number
) {
  return (
    <div className={styles.information_texts}>
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
              <div key={index} className={styles.information_text}>
                {item}
              </div>
            );
          })
        : false}
      <div className={styles.buttons_wrapper}>
        <div className={styles.button}>
          Стоимость
          <span>
            {coustHouse == "Скоро будет доступна" ? ": Скоро будет" : `: ${stringConversion(coustHouse, priceAdditionalServices)} BYN.`}
          </span>
        </div>
        <div
          className={`${styles.button} ${styles.blue}`}
          style={{ display: house.videos?.length != 0 ? "" : "none" }}
          onClick={() => {
            heightFromTopVideosBlock ? window.scroll(0, positionY) : false;
          }}
        >
          Посмотреть видео
        </div>
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

  if (window.innerWidth < 960) {
    translate = translate / 2;
  }

  return (
    <div className={styles.information_carousel_wrapper_field}>
      <div className={styles.information_carousel_field} style={{ transform: `translateX(${translate}px)` }}>
        {house.imgs
          ? house.imgs.map((item, index) => {
              let activeClass = "";
              if (index == activeImgIndex) {
                activeClass = styles.active;
              }

              index = 10201 + index;
              return (
                <img
                  key={index}
                  className={`${styles.information_carousel_field_img}  ${activeClass}`}
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
    <div className={styles.basicConf_items}>
      {arrayConf.map((item, index) => {
        index = 200212 + index;
        const itemArray = item.split(" ? ");
        return (
          <React.Fragment key={index}>
            <div className={styles.line}></div>
            <div className={styles.basicConf_item}>
              <div className={styles.basicConf_item_name}>{itemArray[0]}</div>
              <div className={styles.basicConf_item_key}>{itemArray[1]}</div>
            </div>
          </React.Fragment>
        );
      })}
      <div className={styles.line}></div>
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
