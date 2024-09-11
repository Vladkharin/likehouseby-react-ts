import React from "react";

type list = listItem[];

type listItem = {
  value: string;
  text: string;
  uniqueId: number;
};

const firstListItems: list = [
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

const secondListItems: list = [
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

export function SecondBlock() {
  return (
    <div id="about" className="secondBlock">
      <div className="container">
        <div className="secondBlock__wrapper">
          <div className="secondBlock__header"> О нас</div>
          <div className="secondBlock__title">
            Лайк Хаус — это строительная компания, которая создавалась с ориентированием на честное отношение к клиентам, это
            подтверждают наши многочисленные отзывы и хорошая репутация.
            <span>МЫ ЧЕСТНО ПОСТРОИМ ВАМ НАДЕЖНЫЙ ДОМ, ПО ЦЕНЕ УКАЗАННОЙ НА САЙТЕ</span>
            При выборе дома в первую очередь стоит обращать внимание не только на стоимость, но и на комплектацию. В Стоимость
            наших домов (базовая комплектация) включено все, чтобы вы могли круглогодично (ПМЖ) в нем проживать без лишних
            вложений. Вам останется ввести коммуникации, которые также смогут вам установить наши специалисты.
          </div>
          <SecondBlockLists />
        </div>
      </div>
    </div>
  );
}

function SecondBlockFirstItem(item: listItem): JSX.Element {
  return (
    <React.Fragment key={item.uniqueId}>
      <div className="secondBlock__item">
        <div className="secondBlock__item-number">{item.value}</div>
        <div className="secondBlock__item-title">{item.text}</div>
      </div>
    </React.Fragment>
  );
}

function SecondBlockSecondItem(item: listItem): JSX.Element {
  return (
    <React.Fragment key={item.uniqueId}>
      <div className="line"></div>
      <div className="secondBlock__secondListItem">
        <div className="secondBlock__secondItem-number">{item.value}</div>
        <div className="secondBlock__item-title2">{item.text}</div>
      </div>
    </React.Fragment>
  );
}

function SecondBlockLists(): JSX.Element {
  return (
    <>
      <div className="secondBlock__list" key={999}>
        {firstListItems.map((item: listItem) => SecondBlockFirstItem(item))}
      </div>
      <div className="secondBlock__secondList" key={998}>
        {secondListItems.map((item: listItem) => SecondBlockSecondItem(item))}
      </div>
    </>
  );
}
