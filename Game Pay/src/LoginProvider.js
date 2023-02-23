import { ThemeProvider } from "@mui/material";
import { useMode } from "./theme";
import Login from "./scenes/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BrandLoginPage from "./scenes/login/BrandLoginPage";
import React from "react";
import StoreLoginPage from "./scenes/login/StoreLoginPage";
import NotFound from "./components/404/NotFound";

function LoginProvider() {
  const [theme, colorMode] = useMode();

  return (
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/company" element={<Login />} />
          <Route path="/brand" element={<BrandLoginPage />} />
          <Route path="/store" element={<StoreLoginPage />} />
        </Routes>
      </React.StrictMode>
    </ThemeProvider>
  );
}

export default LoginProvider;
