import React, { useEffect } from "react";
import { useMode } from "./theme";
import Login from "./scenes/login/Login";
import { ThemeProvider } from "@mui/material";


type Props = {}
const LoginProvider = (props: Props) => {
  const [theme, colorMode] = useMode();

  const clearLocalStorage = (): void => {
    console.log("LOGINPAGE___localStorage Items:")
    for (let i = 0; i < localStorage.length; i++) {
      console.log(`${localStorage.key(i)}: ${localStorage.getItem(localStorage.key(i) as string)}`);
    }
  };

  useEffect(() => {
    clearLocalStorage();
  }, []);


  return (
    <ThemeProvider theme={theme} >
      <React.StrictMode>
        <Login />
      </React.StrictMode>
    </ThemeProvider>
  )
}
export default LoginProvider