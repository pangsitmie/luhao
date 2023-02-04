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
import Statistics from "./scenes/statistics/Statistics";
import StatisticManagement from "./scenes/statistics/StatisticManagement";
import FinanceStatistic from "./scenes/statistics/FinanceStatistic";
import PartnerAdsManagement from "./scenes/partnerAds/PartnerAdsManagement";
import PartnerManagement from "./scenes/partner/PartnerManagement";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setBrand, setCompany, setStore } from "./redux/entity";
import NotFound from "./components/404/NotFound";


const StoreManagement = lazy(() => import('./scenes/storeManagement/StoreManagement'));
const MachineManagement = lazy(() => import('./scenes/machineManagement/MachineManagement'));




function App() {
  // REDUX STORE
  const { entityName } = useSelector((state) => state.entity);
  const dispatch = useDispatch();

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
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />

                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" />} />

                  {/* SEPARATE URLS BASED ON REDUX ENTITY STATE */}
                  {entityName === "company" ? (
                    <>
                      <Route path="/user-management" element={<UserManagement />} />
                      <Route path="/brand-management" element={<BrandManagement />} />

                      {/* MANAGEMENT */}
                      <Route path="/billboard-management" element={<BillboardManagement />} />
                      <Route path="/store-management" element={<StoreManagement />} />
                      <Route path="/machine-management" element={<MachineManagement />} />
                      <Route path="/system-ads" element={<AdsManagement />} />
                      <Route path="/partner" element={<PartnerManagement />} />
                      <Route path="/partner-ads" element={<PartnerAdsManagement />} />

                      {/* NOTIFICATION */}
                      <Route path="/system-notification" element={<SystemNotificationManagement />} />
                      <Route path="/system-coins" element={<SystemCoinManagement />} />
                      <Route path="/brand-coins" element={<BrandCoinManagement />} />

                      {/* STATISTIC */}
                      <Route path="/statistic" element={<Statistics />} />
                      <Route path="/statistic-management" element={<StatisticManagement />} />
                      <Route path="/statistic-management/finance" element={<FinanceStatistic />} />

                      <Route path="/promotion" element={<Promotion />} />
                      {/* SYSTEM */}
                      <Route path="/version" element={<VersionManagement />} />
                    </>
                  ) : entityName === "brand" ? (
                    <>
                      <Route path="/brand-management" element={<BrandManagement />} />
                      <Route path="/billboard-management" element={<BillboardManagement />} />
                      <Route path="/store-management" element={<StoreManagement />} />
                      <Route path="/machine-management" element={<MachineManagement />} />
                      <Route path="/brand-coins" element={<BrandCoinManagement />} />

                      {/* STATISTIC */}
                      <Route path="/statistic" element={<Statistics />} />
                      <Route path="/statistic-management" element={<StatisticManagement />} />
                      <Route path="/statistic-management/finance" element={<FinanceStatistic />} />
                    </>
                  ) : entityName === "store" ? (
                    <>
                      <Route path="/store-management" element={<StoreManagement />} />
                      <Route path="/machine-management" element={<MachineManagement />} />

                      {/* STATISTIC */}
                      <Route path="/statistic" element={<Statistics />} />
                      <Route path="/statistic-management" element={<StatisticManagement />} />
                      <Route path="/statistic-management/finance" element={<FinanceStatistic />} />
                    </>
                  ) : (
                    <Navigate to="/404" />
                  )}
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
