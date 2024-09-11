import { defineDomain } from "../../../houses";

export function SixthBlock() {
  const domain: string = defineDomain(location.hostname);
  return (
    <div id="map" className={domain == "org" ? "map" : "none"}>
      <div className="container">
        <div className="map__header">Карта земельных участков в продаже</div>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab865a8330be3d851cd0c889034520877f8d4abb48412f35713cc0809d7e7d9b4&amp;source=constructor"
          width="1024"
          height="720"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
