import { useEffect } from "react";
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


  useEffect(() => {
    clearLocalStorage();
  }, []);

  const clearLocalStorage = () => {
    console.log("LOGINPAGE___localStorage Items:")
    for (let i = 0; i < localStorage.length; i++) {
      console.log(`${localStorage.key(i)}: ${localStorage.getItem(localStorage.key(i))}`);
    }    // localStorage.clear();
    // localStorage.removeItem("token");
    // localStorage.removeItem("login_token");
  };
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
