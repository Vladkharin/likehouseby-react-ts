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

import Helmet from "react-helmet";
import { defineDomain } from "./houses";

function App() {
  const [scroll, setScroll] = useState(0);
  const [mainPage] = useState("/");
  const [bodyStyle, setBodyStyle] = useState("");
  const domain: string = defineDomain(location.hostname);

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
      <Helmet>
        {/* <!-- Google Tag Manager --> */}
        <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TZDBGTVJ');`}</script>
        {/* <!-- End Google Tag Manager --> */}

        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>{`<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TZDBGTVJ"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`}</noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
      </Helmet>
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
