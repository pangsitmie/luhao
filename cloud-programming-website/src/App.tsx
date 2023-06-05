import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './components/nav/Nav';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Xiaodi from './pages/xiaodi/Xiaodi';
import BearPay from './pages/bearPay/BearPay';
import About from './pages/about/About';
import Line from './pages/line/Line';
import SearchSystem from './pages/searchSystem/SearchSystem';
import IPickPro from './pages/ipickpro/Ipickpro';
import GalaxyCity from './pages/galaxyCity/GalaxyCity';



function App() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
      else {
        entry.target.classList.remove('show');
      }
    })
  });

  const hiddenElements = document.querySelectorAll('hidden');
  hiddenElements.forEach((el) => observer.observe(el));

  return (
    <>
      <Suspense fallback={null}>
        <Router basename="/">
          {/* Add Menu Component */}
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />

            {/* 商務合作 */}
            <Route path='/line' element={<Line />} />
            <Route path='/search-system' element={<SearchSystem />} />

            {/* 服務平台 */}
            {/* <Route path='/marketing-system' element={<MarketingSystem />} /> */}
            <Route path='/xiaodi' element={<Xiaodi />} />
            <Route path='/bearpay' element={<BearPay />} />

            {/* 遊戲娛樂 */}
            <Route path='/ipickpro' element={<IPickPro />} />
            <Route path='/galaxy-city' element={<GalaxyCity />} />

            {/* <Route path='/media-design' element={<MediaDesign />} /> */}

            {/* <Route path='/404' element={<Maintenance />} /> */}
            <Route path='*' element={<Home />} />

          </Routes>
          <Footer />
        </Router>
      </Suspense>

    </>
  )
}
export default App

