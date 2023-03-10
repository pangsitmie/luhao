import React, { lazy, Suspense } from "react";
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/Dashboard";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useTranslation } from "react-i18next";

// SCENES
import UserManagement from "src/scenes/user/UserManagement";
import BrandManagement from "src/scenes/brandManagement/BrandManagement";
import StoreManagement from "src/scenes/store/StoreManagement";
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
import NotFound from "./components/404/NotFound";
import BrandDashboard from "./scenes/dashboard/BrandDashboard";
import StoreDashboard from "./scenes/dashboard/StoreDashboard";
import RewardManagement from "./scenes/store/reward/RewardManagement";
import ReviewManagement from "./scenes/review/ReviewManagement";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import DepositManagement from "./scenes/deposit/DepositManagement";
// import { setBrand, setCompany, setStore } from "./redux/entity";

// const StoreManagement = lazy(() => import("./scenes/store/StoreManagement"));
// const MachineManagement = lazy(() => import('./scenes/machineManagement/MachineManagement'));

function App() {
  const { t } = useTranslation();
  // REDUX STORE
  const { entityName } = useSelector((state) => state.entity);
  const dispatch = useDispatch();

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  //check if token is null if null navigate to login
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login/");
      navigate(`/login/${entityName}/`);
    }
  }, []);

  const [isPortrait, setIsPortrait] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      )
    );
  }, []);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortrait(window.orientation === 0 || window.orientation === 180);
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    // If isPortrait is null, set it based on the initial orientation
    if (isPortrait === null) {
      setIsPortrait(window.orientation === 0 || window.orientation === 180);
    }

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [isPortrait]);

  return (
    <React.Fragment>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isMobile && isPortrait && (
            <div className="rotate-screen">
              <Typography variant="h4" component="h4" gutterBottom>
                {t("please_rotate_your_device")}
              </Typography>
            </div>
          )}
          <div className={` ${isMobile && isPortrait ? "hidden" : "app"}`}>
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

                      <Route
                        path="/user-management"
                        element={<UserManagement />}
                      />
                      <Route
                        path="/brand-management"
                        element={<BrandManagement />}
                      />

                      {/* MANAGEMENT */}
                      <Route
                        path="/billboard-management"
                        element={<BillboardManagement />}
                      />
                      <Route
                        path="/store-management"
                        element={<StoreManagement />}
                      />
                      <Route
                        path="/commodity-management"
                        element={<CommodityManagement />}
                      />
                      <Route
                        path="/machine-management"
                        element={<MachineManagement />}
                      />

                      {/* NOTIFICATION */}
                      <Route path="/system-notification" element={<SystemNotificationManagement />} />
                      <Route path="/system-ads" element={<AdsManagement />} />
                      <Route path="/partner" element={<PartnerManagement />} />
                      <Route path="/partner-ads" element={<PartnerAdsManagement />} />

                      {/* FINANCE */}
                      <Route
                        path="/deposit-management"
                        element={<DepositManagement />}
                      />
                      <Route
                        path="/reward-management"
                        element={<RewardManagement />}
                      />
                      <Route
                        path="/system-coins"
                        element={<SystemCoinManagement />}
                      />
                      <Route
                        path="/brand-coins"
                        element={<BrandCoinManagement />}
                      />

                      {/* STATISTIC */}
                      <Route path="/statistic" element={<StatisticList />} />
                      <Route
                        path="/statistic-management"
                        element={<StatisticManagement />}
                      />
                      <Route
                        path="/statistic-management/finance"
                        element={<FinanceStatistic />}
                      />

                      <Route path="/promotion" element={<Promotion />} />
                      {/* SYSTEM */}
                      <Route path="/version" element={<VersionManagement />} />

                      {/* REVIEW */}
                      <Route path="/review" element={<ReviewManagement />} />
                    </>
                  ) : entityName === "brand" ? (
                    <>
                      <Route exact path="/" element={<BrandDashboard />} />
                      <Route path="/dashboard" element={<BrandDashboard />} />

                      <Route
                        path="/brand-management"
                        element={<BrandManagement />}
                      />
                      <Route
                        path="/billboard-management"
                        element={<BillboardManagement />}
                      />
                      <Route
                        path="/store-management"
                        element={<StoreManagement />}
                      />
                      <Route
                        path="/commodity-management"
                        element={<CommodityManagement />}
                      />
                      <Route
                        path="/reward-management"
                        element={<RewardManagement />}
                      />
                      <Route
                        path="/machine-management"
                        element={<MachineManagement />}
                      />
                      <Route
                        path="/brand-coins"
                        element={<BrandCoinManagement />}
                      />

                      {/* STATISTIC */}
                      <Route path="/statistic" element={<StatisticList />} />
                      <Route
                        path="/statistic-management"
                        element={<StatisticManagement />}
                      />
                      <Route
                        path="/statistic-management/finance"
                        element={<FinanceStatistic />}
                      />

                      {/* REVIEW */}
                      <Route path="/review" element={<ReviewManagement />} />
                    </>
                  ) : entityName === "store" ? (
                    <>
                      <Route exact path="/" element={<StoreDashboard />} />
                      <Route path="/dashboard" element={<StoreDashboard />} />

                      <Route
                        path="/store-management"
                        element={<StoreManagement />}
                      />
                      <Route
                        path="/commodity-management"
                        element={<CommodityManagement />}
                      />
                      <Route
                        path="/reward-management"
                        element={<RewardManagement />}
                      />
                      <Route
                        path="/machine-management"
                        element={<MachineManagement />}
                      />

                      {/* STATISTIC */}
                      <Route path="/statistic" element={<StatisticList />} />
                      <Route
                        path="/statistic-management"
                        element={<StatisticManagement />}
                      />
                      <Route
                        path="/statistic-management/finance"
                        element={<FinanceStatistic />}
                      />

                      {/* REVIEW */}
                      <Route path="/review" element={<ReviewManagement />} />
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
