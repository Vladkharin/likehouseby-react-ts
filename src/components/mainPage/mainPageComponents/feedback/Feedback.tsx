import styles from "./Feedback.module.css";

export function Feedback() {
  return (
    <div id="feedback" className={styles.feedback}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.header}>Отзывы</div>
          <iframe className={styles.iframe} src="https://yandex.ru/maps-reviews-widget/30862034181?comments" frameBorder="0"></iframe>
        </div>
      </div>
    </div>
  );
}
