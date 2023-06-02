import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './components/nav/Nav';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Xiaodi from './pages/xiaodiPage/Xiaodi';



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
            {/* <Route path='/About' element={<About />} /> */}

            {/* 商務合作 */}
            {/* <Route path='/line' element={<Line />} /> */}
            {/* <Route path='/search-system' element={<SearchSystem />} /> */}

            {/* 服務平台 */}
            {/* <Route path='/marketing-system' element={<MarketingSystem />} /> */}
            <Route path='/xiaodi' element={<Xiaodi />} />

            {/* 遊戲娛樂 */}
            {/* <Route path='/ipickpro' element={<Ipickpro />} /> */}
            {/* <Route path='/galaxy-city' element={<GalaxyCity />} /> */}

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

