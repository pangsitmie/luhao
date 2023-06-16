import { ThemeProvider } from "styled-components";
import { theme } from "./Theme";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="">
          <Router basename="/">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </Router>
          <Footer />
        </div>
      </ThemeProvider>

    </>
  )
}

export default App
