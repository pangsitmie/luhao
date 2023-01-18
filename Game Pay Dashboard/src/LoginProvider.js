import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { useMode } from "./theme";
import Login from "./scenes/login/Login";
import { useNavigate } from "react-router-dom";

//APOLLO
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';




function LoginProvider() {
  const [theme, colorMode] = useMode();


  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

export default LoginProvider;
