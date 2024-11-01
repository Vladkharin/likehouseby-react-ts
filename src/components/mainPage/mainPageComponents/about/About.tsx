import React from "react";
import { INFORMATION, ADVANTAGES, listItem } from "./data";
import { SliderWithForm } from "./sliderWithForm/SliderWithForm";
import styles from "./About.module.css";

export function About() {
  return (
    <div id="about" className={styles.about}>
      <div className="container">
        <SliderWithForm />
        <div className={styles.wrapper}>
          <div className={styles.header}> О нас</div>
          <div className={styles.title}>
            Лайк Хаус — это строительная компания, которая создавалась с ориентированием на честное отношение к клиентам, это подтверждают
            наши многочисленные отзывы и хорошая репутация.
            <span>МЫ ЧЕСТНО ПОСТРОИМ ВАМ НАДЕЖНЫЙ ДОМ, ПО ЦЕНЕ УКАЗАННОЙ НА САЙТЕ</span>
            При выборе дома в первую очередь стоит обращать внимание не только на стоимость, но и на комплектацию. В Стоимость наших домов
            (базовая комплектация) включено все, чтобы вы могли круглогодично (ПМЖ) в нем проживать без лишних вложений. Вам останется
            ввести коммуникации, которые также смогут вам установить наши специалисты.
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
      <div className={styles.first_list_item}>
        <div className={styles.first_list_item_number}>{item.value}</div>
        <div className={styles.first_list_item_title}>{item.text}</div>
      </div>
    </React.Fragment>
  );
}

function SecondBlockSecondItem(item: listItem): JSX.Element {
  return (
    <React.Fragment key={item.uniqueId}>
      <div className={styles.line}></div>
      <div className={styles.second_list_item}>
        <div className={styles.second_list_item_number}>{item.value}</div>
        <div className={styles.second_list_item_title}>{item.text}</div>
      </div>
    </React.Fragment>
  );
}

function SecondBlockLists(): JSX.Element {
  return (
    <>
      <div className={styles.first_list} key={999}>
        {ADVANTAGES.map((item: listItem) => SecondBlockFirstItem(item))}
      </div>
      <div className={styles.second_list} key={998}>
        {INFORMATION.map((item: listItem) => SecondBlockSecondItem(item))}
      </div>
    </>
  );
}
