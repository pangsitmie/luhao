import { ThemeProvider } from "@mui/material";
import { useMode } from "./theme";
import Login from "./scenes/login/Login";

function LoginProvider() {
  const [theme, colorMode] = useMode();

  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

export default LoginProvider;
