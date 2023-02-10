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
import UserManagement from "src/scenes/userManagement/UserManagement";
import BrandManagement from "src/scenes/brandManagement/BrandManagement";
// import StoreManagement from "./scenes/storeManagement/StoreManagement";
import CommodityManagement from "src/scenes/store/commodity/CommodityManagement";
import MachineManagement from "src/scenes/store/machine/MachineManagement";
import SystemNotificationManagement from "src/scenes/systemNotificationManagement/SystemNotificationManagement";
import SystemCoinManagement from "src/scenes/CoinManagement_System/SystemCoinManagement";
import BillboardManagement from "src/scenes/brandManagement/billboardManagement/BillboardManagement";
import BrandCoinManagement from "src/scenes/CoinManagement_Brand/BrandCoinManagement";
import AdsManagement from "src/scenes/adsManagement/AdsManagement";
import VersionManagement from "src/scenes/version/VersionManagement";
import Promotion from "src/scenes/promotion/Promotion";
import StatisticList from "src/scenes/statistics/StatisticList";
import StatisticManagement from "src/scenes/statistics/StatisticManagement";
import FinanceStatistic from "src/scenes/statistics/FinanceStatistic";
import PartnerAdsManagement from "src/scenes/partnerAds/PartnerAdsManagement";
import PartnerManagement from "src/scenes/partner/PartnerManagement";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setBrand, setCompany, setStore } from "./redux/entity";
import NotFound from "./components/404/NotFound";
import BrandDashboard from "./scenes/dashboard/BrandDashboard";
import StoreDashboard from "./scenes/dashboard/StoreDashboard";
import RewardManagement from "./scenes/store/reward/RewardManagement";


const StoreManagement = lazy(() => import('./scenes/store/StoreManagement'));
// const MachineManagement = lazy(() => import('./scenes/machineManagement/MachineManagement'));




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

                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" />} />

                  {/* SEPARATE URLS BASED ON REDUX ENTITY STATE */}
                  {entityName === "company" ? (
                    <>
                      <Route exact path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />

                      <Route path="/user-management" element={<UserManagement />} />
                      <Route path="/brand-management" element={<BrandManagement />} />

                      {/* MANAGEMENT */}
                      <Route path="/billboard-management" element={<BillboardManagement />} />
                      <Route path="/store-management" element={<StoreManagement />} />
                      <Route path="/commodity-management" element={<CommodityManagement />} />
                      <Route path="/reward-management" element={<RewardManagement />} />
                      <Route path="/machine-management" element={<MachineManagement />} />
                      <Route path="/system-ads" element={<AdsManagement />} />
                      <Route path="/partner" element={<PartnerManagement />} />
                      <Route path="/partner-ads" element={<PartnerAdsManagement />} />

                      {/* NOTIFICATION */}
                      <Route path="/system-notification" element={<SystemNotificationManagement />} />
                      <Route path="/system-coins" element={<SystemCoinManagement />} />
                      <Route path="/brand-coins" element={<BrandCoinManagement />} />

                      {/* STATISTIC */}
                      <Route path="/statistic" element={<StatisticList />} />
                      <Route path="/statistic-management" element={<StatisticManagement />} />
                      <Route path="/statistic-management/finance" element={<FinanceStatistic />} />

                      <Route path="/promotion" element={<Promotion />} />
                      {/* SYSTEM */}
                      <Route path="/version" element={<VersionManagement />} />
                    </>
                  ) : entityName === "brand" ? (
                    <>
                      <Route exact path="/" element={<BrandDashboard />} />
                      <Route path="/dashboard" element={<BrandDashboard />} />

                      <Route path="/brand-management" element={<BrandManagement />} />
                      <Route path="/billboard-management" element={<BillboardManagement />} />
                      <Route path="/store-management" element={<StoreManagement />} />
                      <Route path="/commodity-management" element={<CommodityManagement />} />
                      <Route path="/reward-management" element={<RewardManagement />} />
                      <Route path="/machine-management" element={<MachineManagement />} />
                      <Route path="/brand-coins" element={<BrandCoinManagement />} />

                      {/* STATISTIC */}
                      <Route path="/statistic" element={<StatisticList />} />
                      <Route path="/statistic-management" element={<StatisticManagement />} />
                      <Route path="/statistic-management/finance" element={<FinanceStatistic />} />
                    </>
                  ) : entityName === "store" ? (
                    <>
                      <Route exact path="/" element={<StoreDashboard />} />
                      <Route path="/dashboard" element={<StoreDashboard />} />

                      <Route path="/store-management" element={<StoreManagement />} />
                      <Route path="/commodity-management" element={<CommodityManagement />} />
                      <Route path="/reward-management" element={<RewardManagement />} />
                      <Route path="/machine-management" element={<MachineManagement />} />

                      {/* STATISTIC */}
                      <Route path="/statistic" element={<StatisticList />} />
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
