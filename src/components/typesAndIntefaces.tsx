export type typeAdditionalServices = {
  ДатаФормирования: string;
  Дома: [];
};

export type typeAdditionalService = {
  ДомКод: string;
  ДомНаименование: string;
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

export interface LocationState {
  task: typeItemHouse;
}

export type typeInputValue = {
  Колодец: number;
  Скважина: number;
};

export type typeActiveAdditionalService = {
  name: string;
  code: string;
  count: number;
  coust: number;
};

export type typeListActiveAdditionalServices = typeActiveAdditionalService[];

export type typeItemHouse = {
  img?: string;
  alt?: string;
  coust?: string;
  mortgage?: string;
  information?: string[];
  imgs?: string[];
  type?: string;
  link?: string;
  typeHouse: string;
  code: string;
  houseName?: string;
};

export type typeChoiceAdditionalServices = {
  "mutually exclusive": { [key: string]: string[] };
  "cant choose without": { [key: string]: string[] };
  "cant be removed without": { [key: string]: string[] };
};

export type typeItemsHouse = typeItemHouse[];

export type typeInputsError = {
  inputName: string;
  inputPhone: string;
};
