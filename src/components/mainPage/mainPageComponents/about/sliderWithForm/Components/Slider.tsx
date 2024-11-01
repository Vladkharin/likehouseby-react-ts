import { SLIDES } from "../../data";
import styles from "./Slider.module.css";

export function Slider({ slide }: { slide: number }) {
  const pageWidth = document.documentElement.scrollWidth;

  let accumulator = 0;

  if (pageWidth > 319 && pageWidth < 481) {
    accumulator = -300;
  } else if (pageWidth > 480 && pageWidth < 640) {
    accumulator = -460;
  } else if (pageWidth > 639 && pageWidth < 960) {
    accumulator = -620;
  } else if (pageWidth > 959 && pageWidth < 1200) {
    accumulator = -520;
  } else if (pageWidth > 1199) {
    accumulator = -650;
  }
  const number = accumulator * slide;

  return (
    <>
      <div className={styles.slides}>
        <div className={styles.field} style={{ transform: `translateX(${number}px)` }}>
          {SLIDES.map((item, index) => {
            return <img key={index} className={styles.slide} src={item} alt="" />;
          })}
        </div>
      </div>
      {/* <div className={styles.buttons}>
        <button onClick={() => setSlide(slide - 1)} disabled={slide == 0 ? true : false}>
          <div
            className={styles.button_left_line_up}
            style={slide == 0 ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)" } : {}}
          ></div>
          <div
            className={styles.button_left_line_down}
            style={slide == 0 ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)" } : {}}
          ></div>
        </button>
        <button onClick={() => setSlide(slide + 1)} disabled={slide == SLIDES.length - 1 ? true : false}>
          <div
            className={styles.button_right_line_up}
            style={slide == SLIDES.length - 1 ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)" } : {}}
          ></div>
          <div
            className={styles.button_right_line_down}
            style={slide == SLIDES.length - 1 ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)" } : {}}
          ></div>
        </button>
      </div> */}
    </>
  );
}
