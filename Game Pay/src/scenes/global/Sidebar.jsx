import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import UpdateIcon from '@mui/icons-material/Update';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import LOGO from "../../assets/logo512.png";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
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
                  width="80px"
                  height="80px"
                  src={LOGO}
                  style={{ borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "1rem 0 1rem 0" }}
                >
                  ADMIN
                </Typography>

              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
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
            <Item
              title="廣告管理"
              to="/ads-management"
              icon={<AnnouncementIcon />}
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

            {/* <Item
              title="優惠管理"
              to="/promotion"
              icon={<CardGiftcardIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

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
            {/* <Item
              title="統計"
              to="/statistics"
              icon={<BarChartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="帳目"
              to="/account"
              icon={<AccountCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "25px 0 5px 20px" }}
            >
              Version 1.0
            </Typography>
          </Box>
        </Menu>
        <a href="https://roundbytes.com/" rel="dofollow"></a>
      </ProSidebar>


    </Box>
  );
};

export default Sidebar;
