export type listItem = {
  value: string;
  text: string;
  uniqueId: number;
};

type list = listItem[];

export const INFORMATION: list = [
  {
    value: "с 2016",
    text: "года на рынке строительства",
    uniqueId: 97,
  },
  {
    value: "150",
    text: "счастливых семей в год",
    uniqueId: 98,
  },
  {
    value: "20+",
    text: "бригад в штате компании",
    uniqueId: 99,
  },
  {
    value: "от 30",
    text: "дней срок строительства дома",
    uniqueId: 100,
  },
];

export const ADVANTAGES: list = [
  {
    value: "01",
    text: "Выезд специалиста на участок",
    uniqueId: 410,
  },
  {
    value: "02",
    text: "Экскурсии на строящиеся и готовые объекты",
    uniqueId: 411,
  },
  {
    value: "03",
    text: "Видео обзоры проектов",
    uniqueId: 412,
  },
  {
    value: "04",
    text: "Строим по своим и индивидуальным проектам",
    uniqueId: 413,
  },
  {
    value: "05",
    text: "Адаптируем проект под особенности вашего участка",
    uniqueId: 414,
  },
  {
    value: "06",
    text: "Полный спектр услуг по коммуникациям",
    uniqueId: 415,
  },
];

export const SLIDES = ["./img/firstSlide.jpg"];

export const FORM_STATUS_MESSAGE = {
  loading: "Загрузка...",
  success: "Спасибо! Скоро мы с вами свяжемся",
  failure: "Что-то пошло не так...",
};
