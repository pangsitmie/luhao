import React, { lazy, Suspense } from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/Dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

//APOLLO


// SCENES
import UserManagement from "./scenes/userManagement/UserManagement";
import BrandManagement from "./scenes/brandManagement/BrandManagement";
// import StoreManagement from "./scenes/storeManagement/StoreManagement";
// import MachineManagement from "./scenes/machineManagement/MachineManagement";
import SystemNotificationManagement from "./scenes/systemNotificationManagement/SystemNotificationManagement";
import SystemCoinManagement from "./scenes/CoinManagement_System/SystemCoinManagement";
import BillboardManagement from "./scenes/billboardManagement/BillboardManagement";
import BrandCoinManagement from "./scenes/CoinManagement_Brand/BrandCoinManagement";
import AdsManagement from "./scenes/adsManagement/AdsManagement";
import VersionManagement from "./scenes/version/VersionManagement";
import Promotion from "./scenes/promotion/Promotion";


const StoreManagement = lazy(() => import('./scenes/storeManagement/StoreManagement'));
const MachineManagement = lazy(() => import('./scenes/machineManagement/MachineManagement'));




function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  //check if token is null if null navigate to login
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <React.Fragment>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <Routes>
            <Route path="/" element={<Login />} />
          </Routes> */}
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>

                  {/* <Route path="/" element={<UserManagement />} /> */}
                  <Route exact path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/user-management" element={<UserManagement />} />
                  <Route path="/brand-management" element={<BrandManagement />} />

                  <Route path="/store-management" element={<StoreManagement />} />

                  {/* <Route path="/store-management" element={<StoreManagement />} /> */}
                  <Route path="/ads-management" element={<AdsManagement />} />
                  <Route path="/machine-management" element={<MachineManagement />} />
                  <Route path="/billboard-management" element={<BillboardManagement />} />
                  <Route path="/system-notification" element={<SystemNotificationManagement />} />
                  <Route path="/system-coins" element={<SystemCoinManagement />} />
                  <Route path="/brand-coins" element={<BrandCoinManagement />} />
                  <Route path="/promotion" element={<Promotion />} />
                  {/* SYSTEM */}
                  <Route path="/version" element={<VersionManagement />} />

                </Routes>
              </Suspense>

            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.Fragment>
  );
}

export default App;
