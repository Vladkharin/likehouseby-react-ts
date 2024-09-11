import { defineDomain } from "../../../houses";

export function FifthBlock() {
  const domain: string = defineDomain(location.hostname);
  return (
    <div id="dop" className="sixthBlock">
      <div className="container">
        <div className="sixthBlock__wrapper">
          <div className="sixthBlock__headerMax481">Доп. услуги</div>
          <div className="sixthBlock__headerMin481">Дополнительные услуги</div>
          <div className="sixthBlock__items">
            <div className="sixthBlock__item">
              <img className="sixthBlock__mediaMax481px" src="./icons/sixthBlockFirstIcons.svg" alt="icon" />
              <img className="sixthBlock__mediaMin481px" src="./icons/sixthBlockFirstIconsWhite.svg" alt="icon" />
              <div className="sixthBlock__item-text">ЭЛЕКТРИФИКАЦИЯ</div>
            </div>
            <div className="sixthBlock__item">
              <img className="sixthBlock__mediaMax481px" src="./icons/sixthBlockSecondIcons.svg" alt="icon" />
              <img className="sixthBlock__mediaMin481px" src="./icons/sixthBlockSecondIconsWhite.svg" alt="icon" />
              <div className="sixthBlock__item-text">ВОДОСНАБЖЕНИЕ</div>
            </div>
            <div className="sixthBlock__item">
              <img className="sixthBlock__mediaMax481px" src="./icons/sixthBlockThirdIcons.svg" alt="icon" />
              <img className="sixthBlock__mediaMin481px" src="./icons/sixthBlockThirdIconsWhite.svg" alt="icon" />
              <div className="sixthBlock__item-text">КАНАЛИЗАЦИЯ</div>
            </div>
            <div className="sixthBlock__item">
              <img className="sixthBlock__mediaMax481px" src="./icons/sixthBlockFourthIcons.svg" alt="icon" />
              <img className="sixthBlock__mediaMin481px" src="./icons/sixthBlockFourthIconsWhite.svg" alt="icon" />
              <div className="sixthBlock__item-text">ОТОПЛЕНИЕ</div>
            </div>
          </div>
          {domain == "org" ? payment() : ""}
        </div>
      </div>
    </div>
  );

  function payment() {
    return (
      <>
        <div className="sixthBlock__title">Оплата</div>
        <div className="sixthBlock__text">НАЛИЧНЫЕ, БЕЗНАЛИЧНЫЙ СПОСОБ ОПЛАТЫ, МАТЕРИНСКИЙ КАПИТАЛ</div>
        <a className="sixthBlock__button" href="payment.html">
          <div className="sixthBlock__button">
            <button className="sixthBlock__button">Подробнее</button>
          </div>
        </a>
      </>
    );
  }
}
