import React from "react";
import styles from "./AdditionalServiceItems.module.css";

import {
  typeAdditionalService,
  typeInputValue,
  typeListActiveAdditionalServices,
  typeChoiceAdditionalServices,
  typeActiveAdditionalService,
} from "../../../typesAndIntefaces";

import { addorSubtractPriceOnButton, addorSubtractPriceOnDiv, changeInputState } from "./functions";

export function AdditionalServiceItems(
  services: typeAdditionalService,
  inputValue: typeInputValue,
  stateInput: typeInputValue,
  setStateInput: React.Dispatch<React.SetStateAction<typeInputValue>>,
  listActiveAdditionalServices: typeListActiveAdditionalServices,
  setListActiveAdditionalServices: React.Dispatch<React.SetStateAction<typeListActiveAdditionalServices>>,
  choiceAdditionalServices: typeChoiceAdditionalServices,
  setPriceAdditionalServices: React.Dispatch<React.SetStateAction<number>>,
  imitationOfTimber: typeActiveAdditionalService,
  wallsAndCeilings: typeActiveAdditionalService
) {
  return (
    <div className={styles.services}>
      {services["Разделы"].map((service, index) => {
        if (service["Раздел"] == "Строительство дома в базовой комплектации") {
          return;
        }

        if (service["Раздел"] == "Несортированно (технический раздел)") {
          return;
        }

        index = 19192 + index;
        return (
          <React.Fragment key={index}>
            <div className={styles.header}>{service["Раздел"]}</div>
            {service["Подразделы"].map((section, secondIndex: number) => {
              let activeClass = styles.btn_inactive;
              secondIndex = 95959 + secondIndex;

              listActiveAdditionalServices.forEach((service) => {
                if (section.Код == service.code) {
                  activeClass = styles.btn_active;
                }
              });

              if (section.Подраздел === "Колодец (кольцо)") {
                return (
                  <React.Fragment key={secondIndex}>
                    <div className={styles.service}>
                      <div className={styles.button} id={section.Код}>
                        <button className={stateInput.Колодец ? styles.btn_active : styles.btn_inactive}></button>
                      </div>
                      <div className={styles.text}>
                        Устройство колодца <b>(колец)</b>
                        <input
                          className={styles.input}
                          type="number"
                          min="0"
                          max="10"
                          value={stateInput.Колодец}
                          onInput={(event) =>
                            changeInputState(
                              event,
                              inputValue,
                              setStateInput,
                              section.Код,
                              section.Подраздел,
                              listActiveAdditionalServices,
                              choiceAdditionalServices,
                              imitationOfTimber,
                              wallsAndCeilings,
                              setListActiveAdditionalServices,
                              setPriceAdditionalServices,
                              services
                            )
                          }
                        />
                      </div>
                    </div>
                  </React.Fragment>
                );
              } else if (section.Подраздел === "Скважина (метр)") {
                return (
                  <React.Fragment key={secondIndex}>
                    <div className={styles.service}>
                      <div className={styles.button} id={section.Код}>
                        <button className={stateInput.Скважина ? styles.btn_active : styles.btn_inactive}></button>
                      </div>
                      <div className={styles.text}>
                        Скважина Пластик <b>(метров)</b>
                        <input
                          className={styles.input}
                          type="number"
                          min="0"
                          max="100"
                          value={stateInput.Скважина}
                          onInput={(event) =>
                            changeInputState(
                              event,
                              inputValue,
                              setStateInput,
                              section.Код,
                              section.Подраздел,
                              listActiveAdditionalServices,
                              choiceAdditionalServices,
                              imitationOfTimber,
                              wallsAndCeilings,
                              setListActiveAdditionalServices,
                              setPriceAdditionalServices,
                              services
                            )
                          }
                        />
                      </div>
                    </div>
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={secondIndex}>
                    <div className={styles.service}>
                      <div
                        className={styles.button}
                        id={section.Код}
                        onClick={(event) =>
                          addorSubtractPriceOnDiv(
                            event,
                            section.Код,
                            section.Подраздел,
                            section.Стоимость,
                            listActiveAdditionalServices,
                            choiceAdditionalServices,
                            imitationOfTimber,
                            wallsAndCeilings,
                            setListActiveAdditionalServices,
                            setPriceAdditionalServices,
                            services
                          )
                        }
                      >
                        <button
                          className={activeClass}
                          value={section.Стоимость}
                          onClick={(event) =>
                            addorSubtractPriceOnButton(
                              event,
                              section.Код,
                              section.Подраздел,
                              section.Стоимость,
                              listActiveAdditionalServices,
                              choiceAdditionalServices,
                              imitationOfTimber,
                              wallsAndCeilings,
                              setListActiveAdditionalServices,
                              setPriceAdditionalServices,
                              services
                            )
                          }
                        ></button>
                      </div>
                      <div className={styles.text}>
                        {section.Подраздел} + {section.Стоимость.toString()} руб.
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
}
