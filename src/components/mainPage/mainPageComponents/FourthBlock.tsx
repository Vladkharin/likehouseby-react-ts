import React, { SetStateAction, useState } from "react";

type typeItems = typeItem[];

type typeItem = {
  value: string;
  title: string;
  subtitle: string;
};

const items: typeItems = [
  {
    value: "01",
    title: "ДОСТУПНЫЕ ЦЕНЫ",
    subtitle:
      "Стоимость каркасных домов обычно ниже каменных и брусовых, но не уступают в надежности и теплосберегающих свойствах. Строительные материалы остаются более доступными по цене. Также их можно собрать вручную, не нанимая строительную технику и не организуя площадку для нее.",
  },
  {
    value: "02",
    title: "ЭКОНОМИЯ НА ОТДЕЛКЕ",
    subtitle:
      "В каменном доме без внутренней отделки не обойтись – невозможно жить в голых кирпичных стенах. А вот дерево в дополнительной отделке не нуждается.",
  },
  {
    value: "03",
    title: "МАЛЫЙ ВЕС",
    subtitle:
      "Это важное преимущество – благодаря небольшому весу самого дома, можно обойтись облегченным фундаментом, а не устанавливать усиленный.",
  },
  {
    value: "04",
    title: "РЕГУЛИРОВКА МИКРОКЛИМАТА",
    subtitle:
      "Каркасные стены создают оптимальный микроклимат – нет избыточной влажности, чрезмерной сухости. Вот почему находиться в таком доме всегда комфортно.",
  },
  {
    value: "05",
    title: "СОКРАЩЕННЫЕ СРОКИ СТРОИТЕЛЬСТВА",
    subtitle:
      "Сроки строительства зависят от выбранной технологии и материала – в случае с каркасным домом не нужно ждать усадки конструкции, что позволяет сократить сроки строительства, в других же без этого обойтись нельзя.",
  },
  {
    value: "06",
    title: "ДОЛГОВЕЧНОСТЬ",
    subtitle: "При должном уходе каркасный дом может прослужить до 100 лет.",
  },
];

const imgs: string[] = [
  "./img/fifthBlockFirstimg.png",
  "./img/fifthBlockSecondimg.png",
  "./img/fifthBlockThirdimg.png",
  "./img/fifthBlockFourthimg.webp",
];

type MainPageProps = {
  setBodyStyle: React.Dispatch<SetStateAction<string>>;
};

export function FourthBlock({ setBodyStyle }: MainPageProps) {
  const [stateModal, setStateModal] = useState<boolean>(false);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  return (
    <div id="tech" className="fifthBlock">
      <div className="container">
        <div className="fifthBlock__header">Технология</div>
        <div className="fifthBlock__imgs">
          {imgs.map((img, index) => {
            const key = index + 11111111;
            return (
              <img
                key={key}
                src={img}
                alt="img"
                className="fifthBlock__img"
                onClick={() => {
                  setStateModal(true);
                  setBodyStyle("hidden");
                  setActiveSlide(index);
                }}
              />
            );
          })}
        </div>
        {renderItems()}
      </div>
      {modal(stateModal, setStateModal, activeSlide, setActiveSlide, setBodyStyle)}
    </div>
  );
}

function renderItems() {
  return (
    <React.Fragment>
      <div className="fifthBlock__items">{items.map((item: typeItem, index: number) => createItem(item, index))}</div>
    </React.Fragment>
  );
}

function createItem(item: typeItem, index: number) {
  index = 1000222 + index;
  return (
    <React.Fragment key={index.toString()}>
      <div className="fifthBlock__item">
        <div className="fifthBlock__item-number">{item.value}</div>
        <div className="fifthBlock__item-text">{item.title}</div>
        <img
          src="./icons/plus.svg"
          alt=""
          className="fifthBlock__item-plus"
          onClick={(event) => {
            const imgEl = event.nativeEvent.target as HTMLImageElement;
            if (imgEl.nextElementSibling as HTMLDivElement) {
              if (imgEl.nextElementSibling?.classList.length == 1) {
                imgEl.classList.add("rotate");
                imgEl.nextElementSibling?.classList.add("openMenu");
              } else {
                imgEl.classList.remove("rotate");
                imgEl.nextElementSibling?.classList.remove("openMenu");
              }
            }
          }}
        />
        <div className="fifthBlock__item-subtitle">{item.subtitle}</div>
      </div>
      <div className="line gold"></div>
    </React.Fragment>
  );
}

type typeModal = "hidden" | "visible";

function modal(
  stateModal: boolean,
  setStateModal: React.Dispatch<React.SetStateAction<boolean>>,
  activeSlide: number,
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>,
  setBodyStyle: React.Dispatch<React.SetStateAction<string>>
) {
  let activeClass = "none";
  let activeStyle: typeModal = "hidden";
  if (stateModal) {
    activeClass = "";
    activeStyle = "visible";
  }

  if (activeSlide > imgs.length - 1) {
    activeSlide = 0;
  } else if (activeSlide < 0) {
    activeSlide = imgs.length - 1;
  }
  return (
    <div className={"modalImgSlider " + activeClass} style={{ visibility: activeStyle }}>
      <div className="modalImgSlider__field">
        {imgs.map((img, index) => {
          let activeClassImg = "none";
          if (index == activeSlide) {
            activeClassImg = "";
          }
          return <img key={index + 120011} className={"modalImgSlider__img " + activeClassImg} src={img} alt="fifthBlockFirstimg" />;
        })}
      </div>
      <button className="modalImgSlider__button-right" onClick={() => setActiveSlide(activeSlide + 1)}>
        <img src="./icons/NextArrow.png" alt="" />
      </button>
      <button className="modalImgSlider__button-left" onClick={() => setActiveSlide(activeSlide - 1)}>
        <img src="./icons/PrevArrow.png" alt="" />
      </button>
      <button
        className="modalImgSlider__close"
        onClick={() => {
          setStateModal(false);
          setBodyStyle("");
        }}
      >
        {" "}
      </button>
    </div>
  );
}
