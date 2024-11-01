import {
  typeInputValue,
  typeActiveAdditionalService,
  typeListActiveAdditionalServices,
  typeChoiceAdditionalServices,
  typeAdditionalService,
} from "../../../typesAndIntefaces";

import styles from "./AdditionalServiceItems.module.css";

export function mutuallyExclusive(
  code: string,
  choiceAdditionalServices: typeChoiceAdditionalServices,
  listActiveAdditionalServices: typeListActiveAdditionalServices
) {
  const choiceArray: typeActiveAdditionalService[] = [];
  choiceAdditionalServices["mutually exclusive"][code].forEach((item) => {
    const choiceItem = listActiveAdditionalServices.find((el) => el.code == item);

    if (choiceItem !== undefined) {
      choiceArray.push(choiceItem);
    }
  });

  return choiceArray;
}

function cantChooseWithout(
  code: string,
  choiceAdditionalServices: typeChoiceAdditionalServices,
  services: typeAdditionalService
): typeActiveAdditionalService[] {
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

function cantBeRemovedWithout(
  code: string,
  choiceAdditionalServices: typeChoiceAdditionalServices,
  listActiveAdditionalServices: typeListActiveAdditionalServices
) {
  const choiceArray: typeActiveAdditionalService[] = [];
  choiceAdditionalServices["cant be removed without"][code].forEach((item) => {
    const choiceItem = listActiveAdditionalServices.find((el) => el.code == item);

    if (choiceItem !== undefined) {
      choiceArray.push(choiceItem);
    }
  });

  return choiceArray;
}

function onBtn(
  code: string,
  name: string,
  coust: number,
  choiceAdditionalServices: typeChoiceAdditionalServices,
  listActiveAdditionalServices: typeListActiveAdditionalServices,
  setListActiveAdditionalServices: React.Dispatch<React.SetStateAction<typeListActiveAdditionalServices>>,
  services: typeAdditionalService,
  setPriceAdditionalServices: React.Dispatch<React.SetStateAction<number>>,
  index = -1,
  count = 1
) {
  const mutuallyExclusiveArray: typeActiveAdditionalService[] = [];
  const cantChooseWithoutArray: typeActiveAdditionalService[] = [];

  if (choiceAdditionalServices["mutually exclusive"][code]) {
    mutuallyExclusiveArray.push(...mutuallyExclusive(code, choiceAdditionalServices, listActiveAdditionalServices));
  }

  let s = listActiveAdditionalServices.filter((e) => !mutuallyExclusiveArray.includes(e));

  if (choiceAdditionalServices["cant choose without"][code]) {
    [...cantChooseWithout(code, choiceAdditionalServices, services)].forEach((item) => {
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

function offBtn(
  code: string,
  listActiveAdditionalServices: typeListActiveAdditionalServices,
  choiceAdditionalServices: typeChoiceAdditionalServices,
  imitationOfTimber: typeActiveAdditionalService,
  wallsAndCeilings: typeActiveAdditionalService,
  setListActiveAdditionalServices: React.Dispatch<React.SetStateAction<typeListActiveAdditionalServices>>,
  setPriceAdditionalServices: React.Dispatch<React.SetStateAction<number>>
) {
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
    const cantBeRemovedWithoutArray = [...cantBeRemovedWithout(code, choiceAdditionalServices, listActiveAdditionalServices)];

    endArray = listActiveAdditionalServices.filter((item) => !cantBeRemovedWithoutArray.includes(item));
  }

  if (code === "000000144" || code === "000000132") {
    return;
  }
  const arr = endArray.filter((item) => item.code !== code);

  setPriceAdditionalServices(arr.reduce((acc, item) => acc + item.coust * item.count, 0));
  setListActiveAdditionalServices(arr.filter((item) => item.count != 0));
}

export const addorSubtractPriceOnButton = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  code: string,
  name: string,
  coust: number,
  listActiveAdditionalServices: typeListActiveAdditionalServices,
  choiceAdditionalServices: typeChoiceAdditionalServices,
  imitationOfTimber: typeActiveAdditionalService,
  wallsAndCeilings: typeActiveAdditionalService,
  setListActiveAdditionalServices: React.Dispatch<React.SetStateAction<typeListActiveAdditionalServices>>,
  setPriceAdditionalServices: React.Dispatch<React.SetStateAction<number>>,
  services: typeAdditionalService
) => {
  if (event.target instanceof HTMLButtonElement) {
    if (event.target.classList[0] === styles.btn_inactive) {
      onBtn(
        code,
        name,
        coust,
        choiceAdditionalServices,
        listActiveAdditionalServices,
        setListActiveAdditionalServices,
        services,
        setPriceAdditionalServices
      );
    } else if (event.target.classList[0] === styles.btn_active) {
      offBtn(
        code,
        listActiveAdditionalServices,
        choiceAdditionalServices,
        imitationOfTimber,
        wallsAndCeilings,
        setListActiveAdditionalServices,
        setPriceAdditionalServices
      );
    }
  }
};

export const addorSubtractPriceOnDiv = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  code: string,
  name: string,
  coust: number,
  listActiveAdditionalServices: typeListActiveAdditionalServices,
  choiceAdditionalServices: typeChoiceAdditionalServices,
  imitationOfTimber: typeActiveAdditionalService,
  wallsAndCeilings: typeActiveAdditionalService,
  setListActiveAdditionalServices: React.Dispatch<React.SetStateAction<typeListActiveAdditionalServices>>,
  setPriceAdditionalServices: React.Dispatch<React.SetStateAction<number>>,
  services: typeAdditionalService
) => {
  if (event.target instanceof HTMLDivElement) {
    const children = event.target.children[0];
    if (children instanceof HTMLButtonElement) {
      if (children.classList[0] === styles.btn_inactive) {
        onBtn(
          code,
          name,
          coust,
          choiceAdditionalServices,
          listActiveAdditionalServices,
          setListActiveAdditionalServices,
          services,
          setPriceAdditionalServices
        );
      } else if (children.classList[0] === styles.btn_active) {
        offBtn(
          code,
          listActiveAdditionalServices,
          choiceAdditionalServices,
          imitationOfTimber,
          wallsAndCeilings,
          setListActiveAdditionalServices,
          setPriceAdditionalServices
        );
      }
    }
  }
};

export function changeInputState(
  event: React.FormEvent<HTMLInputElement>,
  inputValue: typeInputValue,
  setStateInput: React.Dispatch<React.SetStateAction<typeInputValue>>,
  code: string,
  name: string,
  listActiveAdditionalServices: typeListActiveAdditionalServices,
  choiceAdditionalServices: typeChoiceAdditionalServices,
  imitationOfTimber: typeActiveAdditionalService,
  wallsAndCeilings: typeActiveAdditionalService,
  setListActiveAdditionalServices: React.Dispatch<React.SetStateAction<typeListActiveAdditionalServices>>,
  setPriceAdditionalServices: React.Dispatch<React.SetStateAction<number>>,
  services: typeAdditionalService
) {
  if (event.target instanceof HTMLInputElement) {
    const element = event.target.parentElement?.previousSibling as HTMLButtonElement;
    let coust = 0;
    if (isNaN(event.target.valueAsNumber)) {
      coust = 0;
      event.target.valueAsNumber = 0;
      setStateInput({ Скважина: 0, Колодец: 0 });
      offBtn(
        code,
        listActiveAdditionalServices,
        choiceAdditionalServices,
        imitationOfTimber,
        wallsAndCeilings,
        setListActiveAdditionalServices,
        setPriceAdditionalServices
      );
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
      onBtn(
        code,
        name,
        coust,
        choiceAdditionalServices,
        listActiveAdditionalServices,
        setListActiveAdditionalServices,
        services,
        setPriceAdditionalServices,
        index,
        event.target.valueAsNumber
      );
    } else if (event.target.valueAsNumber == 0) {
      setStateInput({ Скважина: 0, Колодец: 0 });
      offBtn(
        code,
        listActiveAdditionalServices,
        choiceAdditionalServices,
        imitationOfTimber,
        wallsAndCeilings,
        setListActiveAdditionalServices,
        setPriceAdditionalServices
      );
    }
  }
}
