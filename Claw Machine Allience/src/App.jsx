import React, { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import MainTest from "./pages/main/MainTest";
import City from "./pages/city/City";
import Area from "./pages/area/Area";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import GRADIENT_BLUR_TOP from "src/assets/gradient_blur_top.png";
import Map from "./pages/map/Map";
import Main from "./pages/main/Main";


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
          <Route exact path="/maintest" element={<MainTest />} />
          <Route exact path="/map" element={<Map />} />
          <Route exact path="/city" element={<City />} />
          <Route exact path="/area" element={<Area />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
