import "./app.css";
import "./stylePages.css";
import "./fonts/stylesheet.css";
import { MainPage } from "./components/mainPage/MainPage";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PaymentPage } from "./components/paymentPage/paymentPage";
import { HousePage } from "./components/housePage/HousePage";

function App() {
  const [scroll, setScroll] = useState(0);
  const [mainPage] = useState("/");
  const [bodyStyle, setBodyStyle] = useState("");

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = bodyStyle;
  });

  return (
    <Router>
      <Header scroll={scroll} mainPage={mainPage} setBodyStyle={setBodyStyle} />
      <Routes>
        <Route path={"/:anchor?"} element={<MainPage setBodyStyle={setBodyStyle} />} />
        <Route path={"/payment"} element={<PaymentPage />} />
        <Route path={"/houses/:houseName?"} element={<HousePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
