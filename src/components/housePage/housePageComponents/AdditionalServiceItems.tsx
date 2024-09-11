import React from "react";

import {
  typeAdditionalService,
  typeInputValue,
  typeListActiveAdditionalServices,
  typeChoiceAdditionalServices,
  typeActiveAdditionalService,
} from "../../typesAndIntefaces";

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
  function mutuallyExclusive(code: string) {
    const choiceArray: typeActiveAdditionalService[] = [];
    choiceAdditionalServices["mutually exclusive"][code].forEach((item) => {
      const choiceItem = listActiveAdditionalServices.find((el) => el.code == item);

      if (choiceItem !== undefined) {
        choiceArray.push(choiceItem);
      }
    });

    return choiceArray;
  }

  function cantChooseWithout(code: string): typeActiveAdditionalService[] {
    const choiceArray: typeActiveAdditionalService[] = [];
    choiceAdditionalServices["cant choose without"][code].forEach((item) => {
      services["Разделы"].forEach((car) => {
        car.Подразделы.forEach((el) => {
          if (item == el.Код) {
            choiceArray.push({
              name: el.Подраздел,
              code: el.Код,
              count: 1,
              coust: el.Стоимость,
            });
          }
        });
      });
    });

    return choiceArray;
  }

  function cantBeRemovedWithout(code: string) {
    const choiceArray: typeActiveAdditionalService[] = [];
    choiceAdditionalServices["cant be removed without"][code].forEach((item) => {
      const choiceItem = listActiveAdditionalServices.find((el) => el.code == item);

      if (choiceItem !== undefined) {
        choiceArray.push(choiceItem);
      }
    });

    return choiceArray;
  }

  function onBtn(code: string, name: string, coust: number, index = -1, count = 1) {
    const mutuallyExclusiveArray: typeActiveAdditionalService[] = [];
    const cantChooseWithoutArray: typeActiveAdditionalService[] = [];

    if (choiceAdditionalServices["mutually exclusive"][code]) {
      mutuallyExclusiveArray.push(...mutuallyExclusive(code));
    }

    let s = listActiveAdditionalServices.filter((e) => !mutuallyExclusiveArray.includes(e));

    if (choiceAdditionalServices["cant choose without"][code]) {
      [...cantChooseWithout(code)].forEach((item) => {
        if (listActiveAdditionalServices.findIndex((el) => el.code == item.code) == -1) {
          cantChooseWithoutArray.push(item);
        }
      });

      s.push(...cantChooseWithoutArray);
    }

    if (index != -1) {
      s = s.filter((item) => item.code != code);
    }

    if (code === "000000126") {
      s = s.filter((item) => item.code != "000000127");
    } else if (code === "000000127") {
      s = s.filter((item) => item.code != "000000126");
    }

    const object: typeActiveAdditionalService = {
      name: name,
      code: code,
      count: count,
      coust: coust,
    };

    s.push(object);

    const price = s.reduce((acc, item) => acc + item.coust * item.count, 0);

    setPriceAdditionalServices(price);
    setListActiveAdditionalServices([...s]);
  }

  function offBtn(code: string) {
    let endArray = listActiveAdditionalServices.filter((item) => item.code != code);
    const firstIndex = listActiveAdditionalServices.findIndex((item) => item.code == "000000144");
    const secondIndex = listActiveAdditionalServices.findIndex((item) => item.code == "000000132");
    if (
      typeof choiceAdditionalServices["mutually exclusive"][code] !== "undefined" &&
      firstIndex === -1 &&
      choiceAdditionalServices["mutually exclusive"][code].findIndex((item) => item === "000000144") !== -1
    ) {
      endArray.push({
        code: imitationOfTimber.code,
        name: imitationOfTimber.name,
        count: imitationOfTimber.count,
        coust: imitationOfTimber.coust,
      });
    }

    if (
      typeof choiceAdditionalServices["mutually exclusive"][code] !== "undefined" &&
      secondIndex === -1 &&
      choiceAdditionalServices["mutually exclusive"][code].findIndex((item) => item === "000000132") !== -1
    ) {
      endArray.push({
        code: wallsAndCeilings.code,
        name: wallsAndCeilings.name,
        count: wallsAndCeilings.count,
        coust: wallsAndCeilings.coust,
      });
    }

    if (choiceAdditionalServices["cant be removed without"][code]) {
      const cantBeRemovedWithoutArray = [...cantBeRemovedWithout(code)];

      endArray = listActiveAdditionalServices.filter((item) => !cantBeRemovedWithoutArray.includes(item));
    }

    if (code === "000000144" || code === "000000132") {
      return;
    }
    const arr = endArray.filter((item) => item.code !== code);

    setPriceAdditionalServices(arr.reduce((acc, item) => acc + item.coust * item.count, 0));
    setListActiveAdditionalServices(arr.filter((item) => item.count != 0));
  }

  const addorSubtractPriceOnButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    code: string,
    name: string,
    coust: number
  ) => {
    if (event.target instanceof HTMLButtonElement) {
      if (event.target.classList[1] === "stylePageinactiveBtn") {
        onBtn(code, name, coust);
      } else if (event.target.classList[1] === "stylePageactiveBtn") {
        offBtn(code);
      }
    }
  };

  const addorSubtractPriceOnDiv = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    code: string,
    name: string,
    coust: number
  ) => {
    if (event.target instanceof HTMLDivElement) {
      const children = event.target.children[0];
      if (children instanceof HTMLButtonElement) {
        if (children.classList[1] === "stylePageinactiveBtn") {
          onBtn(code, name, coust);
        } else if (children.classList[1] === "stylePageactiveBtn") {
          offBtn(code);
        }
      }
    }
  };

  function cnslLog(
    event: React.FormEvent<HTMLInputElement>,
    inputValue: typeInputValue,
    setStateInput: React.Dispatch<React.SetStateAction<typeInputValue>>,
    code: string,
    name: string
  ) {
    if (event.target instanceof HTMLInputElement) {
      const element = event.target.parentElement?.previousSibling as HTMLButtonElement;
      let coust = 0;
      if (isNaN(event.target.valueAsNumber)) {
        coust = 0;
        event.target.valueAsNumber = 0;
        setStateInput({ Скважина: 0, Колодец: 0 });
        offBtn(code);
      } else if (event.target.valueAsNumber > 0) {
        coust = 0;
        let index = 0;
        if (element.getAttribute("id") === "000000126") {
          index = listActiveAdditionalServices.findIndex((el) => el.code === "000000126");
          if (event.target.valueAsNumber >= 100) {
            event.target.valueAsNumber = 100;
          }
          coust = inputValue.Скважина;
          setStateInput({ Колодец: 0, Скважина: event.target.valueAsNumber });
        } else if (element.getAttribute("id") === "000000127") {
          index = listActiveAdditionalServices.findIndex((el) => el.code === "000000127");
          if (event.target.valueAsNumber >= 10) {
            event.target.valueAsNumber = 10;
          }
          coust = inputValue.Колодец;
          setStateInput({ Скважина: 0, Колодец: event.target.valueAsNumber });
        }
        onBtn(code, name, coust, index, event.target.valueAsNumber);
      } else if (event.target.valueAsNumber == 0) {
        setStateInput({ Скважина: 0, Колодец: 0 });
        offBtn(code);
      }
    }
  }

  return (
    <div className="stylePagesecondBlock__services">
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
            <div className="stylePagesecondBlock__services-header">{service["Раздел"]}</div>
            {service["Подразделы"].map((section, secondIndex: number) => {
              let activeClass = "stylePageinactiveBtn";
              secondIndex = 95959 + secondIndex;

              listActiveAdditionalServices.forEach((service) => {
                if (section.Код == service.code) {
                  activeClass = "stylePageactiveBtn";
                }
              });

              if (section.Подраздел === "Колодец (кольцо)") {
                return (
                  <React.Fragment key={secondIndex}>
                    <div className="stylePagesecondBlock__service">
                      <div className="stylePagesecondBlock__service-button" id={section.Код}>
                        <button
                          className={`stylePagesecondBlock__service-buttonSelector ${
                            stateInput.Колодец ? "stylePageactiveBtn" : "stylePageinactiveBtn"
                          }`}></button>
                      </div>
                      <div className="stylePagesecondBlock__service-text">
                        Устройство колодца <b>(колец)</b>
                        <input
                          className="stylePagesecondBlock__service-input"
                          type="number"
                          min="0"
                          max="10"
                          value={stateInput.Колодец}
                          onInput={(event) => cnslLog(event, inputValue, setStateInput, section.Код, section.Подраздел)}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                );
              } else if (section.Подраздел === "Скважина (метр)") {
                return (
                  <React.Fragment key={secondIndex}>
                    <div className="stylePagesecondBlock__service">
                      <div className="stylePagesecondBlock__service-button" id={section.Код}>
                        <button
                          className={`stylePagesecondBlock__service-buttonSelector ${
                            stateInput.Скважина ? "stylePageactiveBtn" : "stylePageinactiveBtn"
                          }`}></button>
                      </div>
                      <div className="stylePagesecondBlock__service-text">
                        Скважина Пластик <b>(метров)</b>
                        <input
                          className="stylePagesecondBlock__service-input"
                          type="number"
                          min="0"
                          max="100"
                          value={stateInput.Скважина}
                          onInput={(event) => cnslLog(event, inputValue, setStateInput, section.Код, section.Подраздел)}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={secondIndex}>
                    <div className="stylePagesecondBlock__service">
                      <div
                        className="stylePagesecondBlock__service-button"
                        id={section.Код}
                        onClick={(event) => addorSubtractPriceOnDiv(event, section.Код, section.Подраздел, section.Стоимость)}>
                        <button
                          className={`stylePagesecondBlock__service-buttonSelector ${activeClass}`}
                          value={section.Стоимость}
                          onClick={(event) =>
                            addorSubtractPriceOnButton(event, section.Код, section.Подраздел, section.Стоимость)
                          }></button>
                      </div>
                      <div className="stylePagesecondBlock__service-text">
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
