import { useState } from "react";
import { Form } from "./Components/Form";

import { Slider } from "./Components/Slider";
import styles from "./SliderWithForm.module.css";

export function SliderWithForm() {
  const [slide] = useState<number>(0);

  return (
    <div className={styles.slider}>
      <Form slide={slide} />
      <Slider slide={slide} />
    </div>
  );
}
