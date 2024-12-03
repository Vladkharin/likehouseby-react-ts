import { useEffect, useState } from "react";
import React from "react";
import { itemsHouse } from "../../../../houses";
import { typeItemHouse } from "../../../typesAndIntefaces";
import { Link } from "react-router-dom";

import styles from "./Catalog.module.css";

import { fetchAdditionalServices, getActiveTypeHouses, stringConversion } from "./functions";

export type typeAdditionalServices = {
  ДатаФормирования: string;
  Дома: [];
};

type serviceSections = {
  ДомНаименование: string;
  ДомКод: string;
  Разделы: {
    Раздел: string;
    Код: string;
    Подразделы: {
      Подраздел: string;
      Код: string;
      Стоимость: number;
    }[];
  }[];
};

export type typeChoiceTypeHouse = { type: "all" | "cottage" | "two-storey house" | "bathhouse" };

export function Catalog() {
  const [additionalServices, setAdditionalServices] = useState<typeAdditionalServices>();
  const [choiceTypeHouse, setChoiceTypeHouse] = useState<typeChoiceTypeHouse>({ type: "all" });

  useEffect(() => {
    fetchAdditionalServices(setAdditionalServices);
  }, []);

  if (additionalServices) {
    itemsHouse.forEach((item) => {
      let coust = 0;
      additionalServices["Дома"].forEach((service: serviceSections) => {
        if (service["ДомКод"] == item.code) {
          service["Разделы"].forEach((section) => {
            if (section["Раздел"] == "Отделка фасада") {
              coust = coust + section["Подразделы"][0]["Стоимость"];
            }
            if (section["Раздел"] == "Внутренняя отделка и комфорт") {
              coust = coust + section["Подразделы"][0]["Стоимость"];
            }
            if (section["Раздел"] == "Строительство дома в базовой комплектации") {
              coust = coust + section["Подразделы"][0]["Стоимость"];
            }
          });
        }
      });

      if (coust == 0) {
        item.coust = "Скоро будет доступна";
      } else {
        if (item.type != "bathhouse") {
          item.mortgage = (coust / 5).toString();
        }
        item.coust = coust.toString();
      }
    });
  }

  function ThirdBlockTiles() {
    return (
      <div className={styles.inner} key={1000001}>
        {getActiveTypeHouses(choiceTypeHouse).map((task) => ThirdBlockTile(task))}
      </div>
    );
  }

  return (
    <div id="catalog" className={styles.catalog}>
      <div className={`container ${window.innerWidth < 481 ? styles.container_enlargement : ""}`}>
        <div className={styles.wrapper}>
          <div className={styles.header}>Каталог</div>
          <div className={styles.menu_wrapper}>
            <button
              className={`${styles.text} ${choiceTypeHouse.type === "all" ? styles.change_bg : ""}`}
              data-modal="all"
              onClick={() => setChoiceTypeHouse({ type: "all" })}
            >
              Весь каталог
            </button>
            <button
              className={`${styles.text} ${choiceTypeHouse.type === "cottage" ? styles.change_bg : ""}`}
              data-modal="cottage"
              onClick={() => setChoiceTypeHouse({ type: "cottage" })}
            >
              1 этаж. дома
            </button>
            <button
              className={`${styles.text} ${choiceTypeHouse.type === "two-storey house" ? styles.change_bg : ""}`}
              data-modal="two-storey house"
              onClick={() => setChoiceTypeHouse({ type: "two-storey house" })}
            >
              2 этаж. дома
            </button>
            <button
              className={`${styles.text} ${choiceTypeHouse.type === "bathhouse" ? styles.change_bg : ""}`}
              data-modal="bathhouse"
              onClick={() => setChoiceTypeHouse({ type: "bathhouse" })}
            >
              Бани
            </button>
          </div>
          <ThirdBlockTiles />
        </div>
      </div>
    </div>
  );
}

function ThirdBlockTile(task: typeItemHouse) {
  switch (Object.keys(task).length) {
    case 12:
      return ModalHouse(task);
    case 11:
      return ModalBathHouse(task);
    case 2:
      return ModalTypeHousesOrBathHouses(task);
  }
}

function ModalHouse(task: typeItemHouse) {
  if (!task.coust || !task.mortgage) {
    return;
  }

  return (
    <React.Fragment key={task.code}>
      <Link to={`/houses/${task.link}`} state={{ task: task }} className={styles.tile}>
        <img className={styles.tile_img} src={task.img} alt={task.alt} />
        <div className={styles.tile_text}>{task.information ? task.information[0] : false}</div>
        <div className={styles.tile_text}>{task.information ? task.information[1] : false}</div>
        <div className={styles.tile_text} id={task.code}>
          Стоимость: {stringConversion(task.coust)} BYN
        </div>
        <div className={styles.tile_link}>
          <img src="./icons/textSvg.svg" alt="link" />
        </div>
      </Link>
    </React.Fragment>
  );
}

function ModalBathHouse(task: typeItemHouse) {
  if (!task.coust) {
    return;
  }

  return (
    <React.Fragment key={task.code}>
      <Link to={`/houses/${task.link}`} state={{ task: task }} className={styles.tile}>
        <img className={styles.tile_img} src={task.img} alt={task.alt} />
        <div className={styles.tile_text}>{task.information ? task.information[0] : false}</div>
        <div className={styles.tile_text}>{task.information ? task.information[1] : false}</div>
        <div className={styles.tile_text} id={task.code}>
          Стоимость: {task.coust === "Скоро будет доступна" ? "Скоро будет доступна" : stringConversion(task.coust) + " BYN"}
        </div>
        <div className={styles.tile_link}>
          <img src="./icons/textSvg.svg" alt="link" />
        </div>
      </Link>
    </React.Fragment>
  );
}

function ModalTypeHousesOrBathHouses(task: typeItemHouse) {
  return (
    <React.Fragment key={task.code}>
      <div className={styles.category_header}>
        {task.typeHouse}
        <div className={styles.line}></div>
      </div>
    </React.Fragment>
  );
}
