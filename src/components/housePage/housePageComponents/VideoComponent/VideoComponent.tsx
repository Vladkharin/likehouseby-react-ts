import styles from "./VideoComponent.module.css";

import { typeItemHouse } from "../../../typesAndIntefaces";

export function VideoComponent({ myRef, house }: { myRef: React.RefObject<HTMLElement>; house: typeItemHouse | undefined }) {
  return (
    <section ref={myRef} className={styles.videos}>
      <div className="container">
        <div className={styles.header}>Видеообзор построенных домов</div>
        <div className={styles.wrapper}>
          {house?.videos?.map((item, index) => {
            return (
              <iframe
                key={index}
                className={styles.iframe}
                src={`https://www.youtube.com/embed/${item.id}?si=${item.si}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            );
          })}
          {/* <iframe
            width="560"
            height="315"
            
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe> */}

          {/* <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/vjb6ArYR8hM?si=dcAWH6E8Tcv8saju"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe> */}
        </div>
      </div>
    </section>
  );
}
