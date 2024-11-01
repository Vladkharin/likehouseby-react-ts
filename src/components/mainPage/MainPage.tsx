import React, { SetStateAction, useEffect } from "react";
import { Catalog } from "./mainPageComponents/catalog/Catalog";
import { About } from "./mainPageComponents/about/About";
import { AdditionalServices } from "./mainPageComponents/additionalServices/AdditionalServices";
import { Technology } from "./mainPageComponents/technology/Technology";
import { Feedback } from "./mainPageComponents/feedback/Feedback";
import { FirstBlock } from "./mainPageComponents/FirstBlock";

type MainPageProps = {
  setBodyStyle: React.Dispatch<SetStateAction<string>>;
};

export function MainPage({ setBodyStyle }: MainPageProps) {
  useEffect(() => {
    const y = window.scrollY;
    window.scrollBy(0, -y);
    document.title = "Каркасные дома | Like House";
  }, []);

  return (
    <>
      <FirstBlock setBodyStyle={setBodyStyle} />
      <About />
      <Catalog />
      <Technology />
      <AdditionalServices />
      <Feedback />
    </>
  );
}
