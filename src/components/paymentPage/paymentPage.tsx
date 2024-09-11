import { useEffect } from "react";

export function PaymentPage() {
  useEffect(() => {
    const y = window.scrollY;
    window.scrollBy(0, -y);
  }, []);
  return (
    <>
      <div className="stylePagepayment">
        <div className="stylePagecontainer">
          <div className="stylePagepayment__header">Оплата домов и бань</div>
          <div className="stylePagepayment__subtitle">
            ДЛЯ ВАШЕГО УДОБСТВА И УВЕРЕННОСТИ В КАЧЕСТВЕ НАШИХ РАБОТ ВСЕ ОПЛАТЫ ЗА УСЛУГИ РАЗДЕЛЕНЫ НА 4 ЭТАПА
          </div>
          <div className="stylePagepayment__items">
            <div className="stylePagepayment__item">
              <div className="stylePagepayment__item-text">
                01 ЭТАП <span>30 000 руб.</span>
              </div>
              <div className="stylePagepayment__item-descr">
                Первоначальная сумма предоплаты производится при заключении договора строительства
              </div>
            </div>
            <div className="stylePagepayment__item">
              <div className="stylePagepayment__item-text">
                02 ЭТАП <span>45%</span>
              </div>
              <div className="stylePagepayment__item-descr">
                Вторая часть предоплаты производится после установки фундамента и завоза материала на ваш участок
              </div>
            </div>
            <div className="stylePagepayment__item">
              <div className="stylePagepayment__item-text">
                03 ЭТАП <span>45%</span>
              </div>
              <div className="stylePagepayment__item-descr">
                Третья часть предоплаты производится после сборки каркаса и завоза оставшихся материала на ваш участок
              </div>
            </div>
            <div className="stylePagepayment__item">
              <div className="stylePagepayment__item-text">
                04 ЭТАП <span>10%</span>
              </div>
              <div className="stylePagepayment__item-descr">
                Оставшаяся часть оплаты производится после выполнения всех работ согласно договору строительства,проверки
                домаотделом контроля качества по чек листам и подписания акта выполненных работ.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stylePagehelp">
        <div className="stylePagecontainer">
          <div className="stylePagehelp__header">Поможем с ипотекой</div>
          <div className="stylePagehelp__wrapper">
            <img src="./pages/8x11Images/01.jpg" alt="" />
            <div className="stylePagehelp__items">
              <div className="stylePagehelp__item">
                <span>98%</span> положительных заявок
              </div>
              <div className="stylePageline2"></div>
              <div className="stylePagehelp__item">
                Ипотека для семей с детьми <span>от 6%</span>
              </div>
              <div className="stylePageline2"></div>
              <div className="stylePagehelp__item">
                Одобрение<span> от 1 дня</span>
              </div>
              <div className="stylePageline2"></div>
              <div className="stylePagehelp__item">
                Ипотека с гос. поддержкой <span>8%</span> на строительство
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="mortgage" className="stylePagemortgage">
        <div className="stylePagecontainer">
          <div className="stylePagepayment__header">Рассчитать ипотеку</div>
          <iframe src="https://ipoteka.domclick.ru/calc-reg/calculator.html?prod=6" frameBorder="0"></iframe>
        </div>
      </div>

      <div className="stylePagematernalCapital">
        <div className="stylePagecontainer">
          <div className="stylePagepayment__header">Материнский капитал</div>
          <div className="stylePagepayment__subtitle">
            ДЛЯ ИСПОЛЬЗОВАНИЯ МАТЕРИНСКОГО КАПИТАЛА НА СТРОИТЕЛЬСТВО ДОМА ВАМ НЕОБХОДИМО:
          </div>
          <div className="stylePagematernalCapital__items">
            <div className="stylePagematernalCapital__item">
              <div className="stylePagematernalCapital__item-number">01</div>
              <div className="stylePagematernalCapital__item-text">
                Иметь в наличии участок (деньги по Материнскому капиталу выделяются только на строительство жилого дома ИЖС)
              </div>
            </div>
            <div className="stylePagematernalCapital__item">
              <div className="stylePagematernalCapital__item-number">02</div>
              <div className="stylePagematernalCapital__item-text">
                Заключить договор на строительство дома (при себе иметь паспорт РФ, сертификат на Материнский капитал или его
                копию)
              </div>
            </div>
            <div className="stylePagematernalCapital__item">
              <div className="stylePagematernalCapital__item-number">03</div>
              <div className="stylePagematernalCapital__item-text">
                Обратиться в Пенсионный фонд с договором на строительство дома
              </div>
            </div>
            <div className="stylePagematernalCapital__item">
              <div className="stylePagematernalCapital__item-number">04</div>
              <div className="stylePagematernalCapital__item-text">
                После перечисления Пенсионным фондом денежных средств материнского капитала на расчетный счет Компании, доплатить
                оставшуюся сумму по договору на строительство дома
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="stylePagerequisites">
        <div className="stylePagecontainer">
          <div className="stylePagepayment__header">Реквизиты</div>
          <div className="stylePagerequisites__items">
            <div className="stylePagerequisites__item">
              ООО "ЛАЙК ХАУС" <br />
              ИНН: 5074068806 <br />
              КПП: 507401001 <br />
              ОГРН: 1215000027990 <br />
            </div>
            <div className="stylePagerequisites__item">
              Банк: ПАО СБЕРБАНК <br />
              БИК: 044525225 <br />
              Расчётный счёт: 40702810040000088319 <br />
              Кор. счёт: 30101810400000000225 <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
