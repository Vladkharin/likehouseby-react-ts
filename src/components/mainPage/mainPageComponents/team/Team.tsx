import styles from "./Team.module.css";

export function Team() {
  return (
    <div className={styles.team}>
      <div className="container">
        <div className={styles.header}>Наша команда</div>
        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.item_img}>
              <img src="./img/seventhBlockImg.png" alt="img" />
            </div>
            <div className={styles.item_title}>
              <br /> Илья Макачев <br /> <br />
              Операционный директор <br /> <br />
              Является ключевым руководителем, ответственным за планирование, организацию и контроль всех операций, связанных с процессом
              строительства каркасных домов. Важными аспектами его работы являются управление проектами, оптимизация производственных
              процессов, осуществление контроля качества и соблюдения сроков выполнения работ.
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_img}>
              <img src="./img/seventhBlockSecondImg.png" alt="img" />
            </div>
            <div className={styles.item_title}>
              <br /> Орлов Артём
              <br /> <br />
              Технолог <br /> <br />
              Артём играет ключевую роль в обеспечении высокого уровня технической экспертизы и эффективности процесса строительства. Он
              отвечает за планирование, разработку и контроль технологических процессов, необходимых для строительства каркасных домов.
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_img}>
              <img src="./img/seventhBlockThirdImg.png" alt="img" />
            </div>
            <div className={styles.item_title}>
              <br />
              Ананкин Павел <br /> <br />
              Руководитель отдела по юридическим аспектам и ипотечному соглашению <br /> <br />
              Павел является экспертом в области договоров и имеет обширный опыт в одобрении ипотечных заявок. Он профессионально и
              ответственно осуществляет весь процесс, начиная от составления и анализа договоров, заключения сделок и подготовки необходимой
              документации для клиентов.
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_img}>
              <img src="./img/seventhBlockFourthImg.png" alt="img" />
            </div>
            <div className={styles.item_title}>
              <br />
              Дмитрий Сорокин <br /> <br />
              Специалист по организации монтажа инженерных сетей и коммуникаций <br /> <br />
              Дмитрий отвечает за планирование, координацию и контроль работы всей команды инженеров, техников и рабочих, связанных с
              установкой и настройкой инженерных систем и коммуникаций в каркасных домах.
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_img}>
              <img src="./img/seventhBlockFifthImg.png" alt="img" />
            </div>
            <div className={styles.item_title}>
              <br />
              Иван Бирюков <br /> <br />
              Клиентский менеджер <br /> <br />
              Иван - это ответственный сотрудник, который осуществляет эффективную коммуникацию с заказчиками на всех этапах процесса,
              начиная от консультации и помощи в выборе материалов, и заканчивая обеспечением своевременной доставки.
            </div>
          </div>
          <div className={styles.scroll}>
            <div className={styles.scroll_text}>Листать вбок</div>
            <div className={styles.scroll_img}>
              <img src="./icons/threeArrow.svg" alt="threeArrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
