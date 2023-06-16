import { ThemeProvider } from "styled-components";
import { theme } from "./Theme";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewbPayForm from "./pages/Form";

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Router basename="/">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/form" element={<NewbPayForm />} />

            </Routes>
          </Router>
        </div>
      </ThemeProvider>

    </>
  )
}

export default App
