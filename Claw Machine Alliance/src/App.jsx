import React, { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import MainTest from "./pages/main/MainTest";
import City from "./pages/city/City";
import Area from "./pages/area/Area";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Map from "./pages/map/Map";
import Main from "./pages/main/Main";
import About from "./pages/about/About";
import NotFound from "./components/404/NotFound";
import Fengjia from "./pages/places/Fengjia";
// import Copy from "./components/copy/Copy";


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <img src={GRADIENT_BLUR_TOP} className={"gradient_blur_top"} /> */}
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="*" element={<NotFound />} />
          <Route exact path="/maintest" element={<MainTest />} />
          <Route exact path="/map" element={<Map />} />
          <Route exact path="/city" element={<City />} />
          <Route exact path="/area" element={<Area />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/fengjia" element={<Fengjia />} />
        </Routes>
        <Footer />
        {/* <Copy /> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
