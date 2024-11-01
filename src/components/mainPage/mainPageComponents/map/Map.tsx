import styles from "./Map.module.css";

export function Map() {
  return (
    <div id="map" className={styles.map}>
      <div className="container">
        <div className={styles.header}>Карта земельных участков в продаже</div>
        <iframe
          className={styles.iframe}
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab865a8330be3d851cd0c889034520877f8d4abb48412f35713cc0809d7e7d9b4&amp;source=constructor"
          width="1024"
          height="720"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
