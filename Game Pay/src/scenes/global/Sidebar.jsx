import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";

// ICONS
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import BusinessIcon from '@mui/icons-material/Business';
import FeedIcon from '@mui/icons-material/Feed';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import UpdateIcon from '@mui/icons-material/Update';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from '@mui/icons-material/Logout';

import LOGO from "../../assets/logo512.png";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setBrand, setCompany, setStore } from "../../redux/entity";
import { BRAND_GetBrandInfo } from "src/graphQL/BrandPrincipalQueries";
import { useQuery } from "@apollo/client";
import { STORE_GetStoreInfo } from "src/graphQL/StorePrincipalQueries";


const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      // onClick={() => setSelected(title)}
      onClick={onClick ? onClick : () => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  // REDUX STORE
  const { entityName } = useSelector((state) => state.entity);

  const [name, setName] = useState("COMPANY");


  let SIDEBAR_INIT_QUERY;
  switch (entityName) {
    case "company":
      SIDEBAR_INIT_QUERY = null;
    case "brand":
      SIDEBAR_INIT_QUERY = BRAND_GetBrandInfo;
      break;
    case "store":
      SIDEBAR_INIT_QUERY = STORE_GetStoreInfo;
      break;
    default:
      break;
  }

  // const { loading, error, data } = useQuery(SIDEBAR_INIT_QUERY);
  // useEffect(() => {
  //   if (data) {
  //     console.log(data.getBrandPrincipal.name);
  //     setName(data.getBrandPrincipal.name);
  //   }
  // }, [data]);

  const { loading, error, data } = useQuery(SIDEBAR_INIT_QUERY);
  useEffect(() => {
    if (data) {
      switch (entityName) {
        case 'company':
          break;
        case 'brand':
          console.log(data.getBrandPrincipal.name);
          setName(data.getBrandPrincipal.name);
          break;
        case 'store':
          console.log(data.getStorePrincipal.name);
          setName(data.getStorePrincipal.name);
          break;
        default:
          break;
      }
    }
  }, [data]);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 950px)");
    const handleMatchMediaChange = (e) => {
      setIsCollapsed(e.matches);
    };
    handleMatchMediaChange(mq);
  }, []);


  return (
    <Box
      height={"100%"}
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 25px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  GAME PAY
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px" m="2rem 0">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="65px"
                  height="65px"
                  src={LOGO}
                  style={{ borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "1rem 0 .4rem 0" }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "0 0 1rem 0" }}
                >
                  ADMIN
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {
              (() => {
                switch (entityName) {
                  case "company":
                    return (
                      <>
                        <Item
                          title="Dashboard"
                          to="/"
                          icon={<HomeOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />

                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          管理
                        </Typography>
                        <Item
                          title="使用者管理"
                          to="/user-management"
                          icon={<PeopleOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="品牌管理"
                          to="/brand-management"
                          icon={<LocalOfferIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="店面管理 "
                          to="/store-management"
                          icon={<StoreIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          廣告
                        </Typography>
                        <Item
                          title="系統廣告"
                          to="/system-ads"
                          icon={<AnnouncementIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="商業合作"
                          to="/partner"
                          icon={<BusinessIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          通知
                        </Typography>
                        <Item
                          title="系統通知"
                          to="/system-notification"
                          icon={<NotificationsIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          財務
                        </Typography>
                        <Item
                          title="系統免費幣發送"
                          to="/system-coins"
                          icon={<AttachMoneyIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="品牌專屬幣發送"
                          to="/brand-coins"
                          icon={<MonetizationOnIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="統計"
                          to="/statistic"
                          icon={<BarChartIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          系統
                        </Typography>

                        <Item
                          title="版本管控"
                          to="/version"
                          icon={<UpdateIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="登出"
                          icon={<LogoutIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          onClick={logout}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          Version 1.0
                        </Typography>
                      </>
                    );
                  case "brand":
                    return (
                      <>
                        <Item
                          title="Dashboard"
                          to="/"
                          icon={<HomeOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />

                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          管理
                        </Typography>
                        <Item
                          title="品牌管理"
                          to="/brand-management"
                          icon={<LocalOfferIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="店面管理 "
                          to="/store-management"
                          icon={<StoreIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          財務
                        </Typography>
                        <Item
                          title="品牌專屬幣發送"
                          to="/brand-coins"
                          icon={<MonetizationOnIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="統計"
                          to="/statistic"
                          icon={<BarChartIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          系統
                        </Typography>
                        <Item
                          title="登出"
                          icon={<LogoutIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          onClick={logout}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          Version 1.0
                        </Typography>
                      </>
                    );
                  case "store":
                    return (
                      <>
                        <Item
                          title="Dashboard"
                          to="/"
                          icon={<HomeOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />

                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          管理
                        </Typography>
                        <Item
                          title="店面管理 "
                          to="/store-management"
                          icon={<StoreIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          財務
                        </Typography>
                        <Item
                          title="統計"
                          to="/statistic"
                          icon={<BarChartIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          系統
                        </Typography>
                        <Item
                          title="登出"
                          icon={<LogoutIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          onClick={logout}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          Version 1.0
                        </Typography>
                      </>
                    );
                  default:
                    return <p>Error</p>
                }
              })()
            }
          </Box>
        </Menu>
        <a href="https://roundbytes.com/" rel="dofollow"></a>
      </ProSidebar>
    </Box>
  );
}


export default Sidebar;
