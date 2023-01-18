import React, { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import City from "./pages/city/City";
import Area from "./pages/area/Area";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";



function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/city" element={<City />} />
          <Route exact path="/area" element={<Area />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
