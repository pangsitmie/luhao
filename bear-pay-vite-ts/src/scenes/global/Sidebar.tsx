import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
// import Copy from "src/components/copy/Copy";

// ICONS
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import AnnouncementIcon from '@mui/icons-material/Announcement';
// import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
// import BusinessIcon from '@mui/icons-material/Business';
// import FeedIcon from '@mui/icons-material/Feed';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import UpdateIcon from '@mui/icons-material/Update';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import LOGO from "../../assets/logo512.png";
// import STORE_LOGO from "../../assets/store_logo.png";

// REDUX
import { useSelector } from "react-redux";
import PaymentsIcon from '@mui/icons-material/Payments';
import { useApolloClient } from '@apollo/client';

// translate
import { useTranslation } from 'react-i18next';
import { RootState } from "../../redux/store";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (title: string) => void;
  onClick?: () => void;
}

//item componenet
const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  onClick,
}: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={onClick ? onClick : () => setSelected(title)}
      icon={icon}
    >
      <Typography sx={{ textTransform: "capitalize" }}>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const client = useApolloClient();
  const { t } = useTranslation();

  // REDUX STORE
  const { entityName } = useSelector((state: RootState) => state.entity);

  const [name] = useState(entityName.toUpperCase());
  const [img] = useState(LOGO);



  // let SIDEBAR_INIT_QUERY;
  // switch (entityName) {
  //   case "company":
  //     setName("COMPANY");
  //     break;
  //   case "brand":
  //     setName("BRAND");
  //     break;
  //   case "store":
  //     setName("STORE");
  //     break;
  //   default:
  //     break;
  // }

  // const { loading, error, data } = useQuery(SIDEBAR_INIT_QUERY);
  // useEffect(() => {
  //   if (data) {
  //     switch (entityName) {
  //       case 'company':
  //         break;
  //       case 'brand':
  //         setName(data.getBrandPrincipal.name);
  //         setImg(getImgURL(data.getBrandPrincipal.brands[0].logo));
  //         break;
  //       case 'store':
  //         setName(data.getStorePrincipal.name);
  //         setImg(STORE_LOGO);
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }, [data]);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    // navigate(`/login/${entityName}`);
    navigate(`/login`);
    client.clearStore();
  }

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 950px)");
    const handleMatchMediaChange = (e: any) => {
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
                  BEAR PAY
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
                  width="70px"
                  height="70px"
                  src={img}
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
                          title={t('dashboard')}
                          to="/"
                          icon={<HomeOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px", textTransform: "capitalize" }}
                        >
                          {t('finance')}
                        </Typography>
                        <Item
                          title={t('statistic')}
                          to="/statistic"
                          icon={<BarChartIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title={t('deposit')}
                          to="/deposit-management"
                          icon={<PaymentsIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        {/* <Item
                          title={t('rewards')}
                          to="/reward-management"
                          icon={<CardGiftcardIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        /> */}
                        <Item
                          title={t('gift_code')}
                          to="/gift-code"
                          icon={<CardGiftcardIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title={t('system_free_coin')}
                          to="/system-coins"
                          icon={<AttachMoneyIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title={t('brand_free_coin')}
                          to="/brand-coins"
                          icon={<MonetizationOnIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px", textTransform: "capitalize" }}
                        >
                          {t('notification')}
                        </Typography>
                        <Item
                          title={t('system_notification')}
                          to="/system-notification"
                          icon={<NotificationsIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title={t('system_ads')}
                          to="/system-ads"
                          icon={<AnnouncementIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        {/* <Item
                          title={t('partner_ads')}
                          to="/partner"
                          icon={<BusinessIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        /> */}
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px", textTransform: "capitalize" }}
                        >
                          {t('manage')}
                        </Typography>
                        <Item
                          title={t('user_management')}
                          to="/user-management"
                          icon={<PeopleOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title={t('brand_management')}
                          to="/brand-management"
                          icon={<LocalOfferIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title={t('store_management')}
                          to="/store-management"
                          icon={<StoreIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px", textTransform: "capitalize" }}
                        >
                          {t('system')}
                        </Typography>
                        <Item
                          title={t('version_control')}
                          to="/version"
                          icon={<UpdateIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title={t('logout')}
                          icon={<LogoutIcon />}
                          to="/login"
                          selected={selected}
                          setSelected={setSelected}
                          onClick={logout}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px" }}
                        >
                          Ver 1.0
                        </Typography>
                      </>
                    );
                  case "brand":
                    return (
                      <>
                        <Item
                          title={t('dashboard')}
                          to="/"
                          icon={<HomeOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px", textTransform: "capitalize" }}
                        >
                          {t('finance')}
                        </Typography>
                        {/* <Item
                          title="獎勵"
                          to="/reward-management"
                          icon={<CardGiftcardIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        /> */}
                        {/* <Item
                          title={t('brand_free_coin')}
                          to="/brand-coins"
                          icon={<MonetizationOnIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        /> */}
                        <Item
                          title={t('statistic')}
                          to="/statistic"
                          icon={<BarChartIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        {/* <Item
                          title={t('gift_code')}
                          to="/gift-code"
                          icon={<CardGiftcardIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        /> */}
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px", textTransform: "capitalize" }}
                        >
                          {t('manage')}
                        </Typography>
                        <Item
                          title={t('brand_management')}
                          to="/brand-management"
                          icon={<LocalOfferIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title={t('store_management')}
                          to="/store-management"
                          icon={<StoreIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px", textTransform: "capitalize" }}
                        >
                          {t('system')}
                        </Typography>
                        <Item
                          title={t('logout')}
                          to="/login"
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
                          Ver 1.0
                        </Typography>
                      </>
                    );
                  case "store":
                    return (
                      <>
                        <Item
                          title={t('dashboard')}
                          to="/"
                          icon={<HomeOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px", textTransform: "capitalize" }}
                        >
                          {t('finance')}
                        </Typography>
                        {/* <Item
                          title="獎勵"
                          to="/reward-management"
                          icon={<CardGiftcardIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        /> */}
                        <Item
                          title={t('statistic')}
                          to="/statistic"
                          icon={<BarChartIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title={t('bonus_game')}
                          to="/bonus-game"
                          icon={<SportsEsportsIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px", textTransform: "capitalize" }}
                        >
                          {t('manage')}
                        </Typography>
                        <Item
                          title={t('store_management')}
                          to="/store-management"
                          icon={<StoreIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Typography
                          variant="h6"
                          color={colors.grey[300]}
                          sx={{ m: "25px 0 5px 20px", textTransform: "capitalize" }}
                        >
                          {t('system')}
                        </Typography>
                        <Item
                          title={t('logout')}
                          to="/login"
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
                          Ver 1.0
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
        {/* <Copy /> */}
      </ProSidebar>
    </Box>
  );
}


export default Sidebar;
