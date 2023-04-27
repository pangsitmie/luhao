import { useTranslation } from "react-i18next";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import NotFound from "./components/404/NotFound";
import Dashboard from "./scenes/dashboard/Dashboard";
import UserManagement from "./scenes/user/UserManagement";



type Props = {}

const App = (props: Props) => {
  const { t } = useTranslation();

  const { entityName } = useSelector((state: RootState) => state.entity);
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

  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // check for device type
  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      )
    );
  }, []);

  //check for device orientation
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
            <Sidebar />

            <main className="content">
              <Topbar />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" />} />

                  {/* SEPARATE URLS BASED ON REDUX ENTITY STATE */}
                  {entityName === "company" ? (
                    <>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      {/* <Route path="/setting" element={<Setting />} /> */}

                      <Route
                        path="/user-management"
                        element={<UserManagement />}
                      />
                      {/* <Route
                        path="/brand-management"
                        element={<BrandManagement />}
                      /> */}

                      {/* MANAGEMENT */}
                      {/* <Route
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
                      /> */}

                      {/* NOTIFICATION */}
                      {/* <Route path="/system-notification" element={<SystemNotificationManagement />} />
                      <Route path="/system-ads" element={<AdsManagement />} />
                      <Route path="/partner" element={<PartnerManagement />} />
                      <Route path="/partner-ads" element={<PartnerAdsManagement />} /> */}

                      {/* FINANCE */}
                      {/* <Route
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
                      <Route
                        path="/gift-code"
                        element={<GiftCodeManagement />}
                      /> */}

                      {/* STATISTIC */}
                      {/* <Route path="/statistic" element={<StatisticList />} />
                      <Route
                        path="/statistic-management"
                        element={<StatisticManagement />}
                      />
                      <Route
                        path="/statistic-management/finance"
                        element={<FinanceStatistic />}
                      />
                      <Route
                        path="/statistic-management/machine"
                        element={<MachineStatisticPeriod />}
                      /> */}

                      {/* <Route path="/promotion" element={<Promotion />} /> */}
                      {/* SYSTEM */}
                      {/* <Route path="/version" element={<VersionManagement />} /> */}

                      {/* REVIEW */}
                      {/* <Route path="/review" element={<ReviewManagement />} /> */}
                    </>
                  ) : entityName === "brand" ? (
                    <>

                    </>
                  ) : entityName === "store" ? (
                    <>

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
  )
}
export default App