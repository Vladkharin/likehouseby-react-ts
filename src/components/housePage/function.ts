// import { Location } from "react-router-dom";

// import { typeItemsHouse, typeItemHouse } from "../typesAndIntefaces";

export function stringConversion(task: string | undefined, priceAdditionalServices: number) {
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
