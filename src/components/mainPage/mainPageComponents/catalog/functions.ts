import {typeAdditionalServices, typeChoiceTypeHouse} from "./Catalog"
import { typeItemsHouse } from "../../../typesAndIntefaces";
import { getAdditionalServices } from "../../../../API/routes";
import { itemsHouse } from "../../../../houses";


export const fetchAdditionalServices = async (setAdditionalServices: React.Dispatch<React.SetStateAction<typeAdditionalServices | undefined>>) => {
    const houses = await getAdditionalServices();
    setAdditionalServices(houses);
};

function findHouseTypes(houses: typeItemsHouse): string[] {
    const typesHouseArray: string[] = [];

    houses.forEach((item) => {
      if (typesHouseArray.indexOf(item.typeHouse) == -1) {
        typesHouseArray.push(item.typeHouse);
      }
    });

    return typesHouseArray;
  }

function createEntireCatalogOfHouses(houses: typeItemsHouse) {
    const entireCatalogOfHouses: typeItemsHouse = [];

    findHouseTypes(houses).forEach((typeHouse, index) => {
      index = 10000 + index;
      const typeHouseObject = { typeHouse: typeHouse, code: index.toString() };
      entireCatalogOfHouses.push(typeHouseObject);

      houses.forEach((item) => {
        if (item.typeHouse == typeHouse) {
          entireCatalogOfHouses.push(item);
        }
      });
    });

    return entireCatalogOfHouses;
}

export function getActiveTypeHouses(choiceTypeHouse : typeChoiceTypeHouse) {
    let activeAllCatalog: typeItemsHouse = [];
    let typeHouse: string = "";

    if (choiceTypeHouse.type != "all") {
      createEntireCatalogOfHouses(itemsHouse).forEach((item, index) => {
        if (item.type == choiceTypeHouse.type) {
          const arr = activeAllCatalog.filter((item) => item.typeHouse == typeHouse);

          if (arr.length === 0 || typeHouse != item.typeHouse) {
            typeHouse = item.typeHouse;
            const houseObject = { typeHouse: item.typeHouse, code: index.toString() };
            activeAllCatalog.push(houseObject);
          } else {
            if (arr[0].typeHouse != typeHouse) {
              index = 9999 + index;
              const houseObject = { typeHouse: item.typeHouse, code: index.toString() };
              activeAllCatalog.push(houseObject);
            }
          }
          activeAllCatalog.push(item);
        }
      });
    } else {
      activeAllCatalog = [...createEntireCatalogOfHouses(itemsHouse)];
    }

    return activeAllCatalog;
}

export function stringConversion(task: string) {
    const array: string[] = [];
  
    // const number = Number(task) - Number(task) * 0.15;
  
    // task = number.toString();
  
    // const round = (number: number, accumulator: number) => Math.round(number / accumulator) * accumulator;
  
    // task = round(number, 1000).toString();
  
    task?.split("").forEach((item, index) => {
      if (task?.length - index == 7) {
        item = item + " ";
      } else if (task?.length - index == 4) {
        item = item + " ";
      }
      array.push(item);
    });
  
    return array.join("");
}