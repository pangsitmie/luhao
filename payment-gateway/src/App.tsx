import { ThemeProvider } from "styled-components";
import { theme } from "./Theme";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Router basename="/">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/login" element={<Login />} />

            </Routes>
          </Router>
        </div>
      </ThemeProvider>

    </>
  )
}

export default App
