import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar, sidebarClasses } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
// import Copy from "src/components/copy/Copy";

// ICONS
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import AnnouncementIcon from '@mui/icons-material/Announcement';

import NotificationsIcon from '@mui/icons-material/Notifications';

import BarChartIcon from '@mui/icons-material/BarChart';
import UpdateIcon from '@mui/icons-material/Update';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LOGO from "../../assets/logo512.png";

// REDUX
import { useSelector } from "react-redux";
import PaymentsIcon from '@mui/icons-material/Payments';
import { useApolloClient } from '@apollo/client';

// translate
import { useTranslation } from 'react-i18next';
import { RootState } from "../../redux/store";
// import Copy from "../../components/copy/Copy";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (title: string) => void;
  onClick?: () => void;
  isCollapsed?: boolean;
}

//item componenet
const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  onClick,
  isCollapsed,
}: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Link to={to} style={{}}>
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[200],
          display: "flex",
          alignItems: "center", // center the icon vertically
          justifyContent: !isCollapsed ? "center" : "flex-start",
        }}
        onClick={onClick ? onClick : () => setSelected(title)}
        icon={icon}
      >
        {!isCollapsed && (
          <Typography sx={{ textTransform: "capitalize" }}>{title}</Typography>
        )}

      </MenuItem>
    </Link>
  );
};






const SidebarMenu = () => {
  const client = useApolloClient();
  const { t } = useTranslation();

  // REDUX STORE
  const { entityName } = useSelector((state: RootState) => state.entity);

  const [name] = useState(entityName.toUpperCase());
  const [img] = useState(LOGO);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate(`/login`);
    client.clearStore();
  }

  const mq = window.matchMedia("(max-width: 900px)");
  const handleMatchMediaChange = (e: any) => {
    console.log(e.matches);
    setIsCollapsed(e.matches);
    collapseSidebar(e.matches)
  };

  useEffect(() => {
    handleMatchMediaChange(mq);
  }, []);

  const { collapseSidebar } = useProSidebar();

  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          height: "100vh",
          width: isCollapsed ? "90px" : "250px",
          backgroundColor: `${colors.primary[400]} !important`,
        },
      }}>
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                backgroundColor: active ? colors.blueAccent[800] : undefined,
                marginBottom: "10px",
                borderRadius: "14px",
                ":hover": {
                  backgroundColor: colors.blueAccent[800],
                },
              };
          },
        }}>
        {/* LOGO AND MENU ICON */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isCollapsed ? "center" : "space-between",
            alignItems: "center",
            padding: "1rem",
            color: colors.grey[100],
          }}
        >
          {!isCollapsed && (
            <Box>
              <Typography variant="h4" color={colors.grey[100]}>
                BEAR PAY
              </Typography>
            </Box>
          )}
          <IconButton
            onClick={() => {
              setIsCollapsed(!isCollapsed)
              collapseSidebar(!isCollapsed)
            }}
          >
            <MenuOutlinedIcon />
          </IconButton>
        </Box>

        {!isCollapsed && (
          <Box m="1rem 0 2rem">
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

        <Box padding={"0 5%"}>
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
                        isCollapsed={isCollapsed}
                      />
                      <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: isCollapsed ? "" : "20px 0 5px 25px", textTransform: "capitalize", textAlign: isCollapsed ? "center" : "left" }}
                      >
                        {t('finance')}
                      </Typography>
                      <Item
                        title={t('Image')}
                        to="/statistic"
                        icon={<BarChartIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                      />
                      <Item
                        title={t('Video')}
                        to="/deposit-management"
                        icon={<PaymentsIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                      />

                      <Item
                        title={t('gift_code')}
                        to="/gift-code"
                        icon={<CardGiftcardIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                      />

                      <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: isCollapsed ? "" : "20px 0 5px 25px", textTransform: "capitalize", textAlign: isCollapsed ? "center" : "left" }}
                      >
                        {t('notification')}
                      </Typography>
                      <Item
                        title={`${t('notification')} & ${t('free_coin')}`}
                        to="/system-notification"
                        icon={<NotificationsIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                      />
                      <Item
                        title={t('system_ads')}
                        to="/system-ads"
                        icon={<AnnouncementIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                      />

                      <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: isCollapsed ? "" : "20px 0 5px 25px", textTransform: "capitalize", textAlign: isCollapsed ? "center" : "left" }}
                      >
                        {t('manage')}
                      </Typography>
                      <Item
                        title={t('user_management')}
                        to="/user-management"
                        icon={<PeopleOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                      />
                      <Item
                        title={t('brand_management')}
                        to="/brand-management"
                        icon={<LocalOfferIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                      />
                      <Item
                        title={t('store_management')}
                        to="/store-management"
                        icon={<StoreIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                      />
                      <Item
                        title={t('advertiser')}
                        to="/advertiser-management"
                        icon={<HandshakeIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                      />
                      <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: isCollapsed ? "" : "20px 0 5px 25px", textTransform: "capitalize", textAlign: isCollapsed ? "center" : "left" }}
                      >
                        {t('system')}
                      </Typography>
                      <Item
                        title={t('version_control')}
                        to="/version"
                        icon={<UpdateIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                      />
                      <Item
                        title={t('logout')}
                        icon={<LogoutIcon />}
                        to="/login"
                        selected={selected}
                        setSelected={setSelected}
                        onClick={logout}
                        isCollapsed={isCollapsed}
                      />
                      <Typography
                        variant="h6"
                        color={colors.grey[200]}
                        textAlign={"center"}
                        sx={{ m: "20px 0 5px 0" }}
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
                        isCollapsed={isCollapsed}
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
                        isCollapsed={isCollapsed}
                      />

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
                        isCollapsed={isCollapsed}
                      />
                      <Item
                        title={t('store_management')}
                        to="/store-management"
                        icon={<StoreIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
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
                        isCollapsed={isCollapsed}
                      />
                      <Typography
                        variant="h6"
                        color={colors.grey[200]}
                        textAlign={"center"}
                        sx={{ m: "20px 0 5px 0" }}
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
                        isCollapsed={isCollapsed}
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
                        isCollapsed={isCollapsed}
                      />
                      <Item
                        title={t('bonus_game')}
                        to="/bonus-game"
                        icon={<SportsEsportsIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                      />
                      <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "20px 0 5px 20px", textTransform: "capitalize" }}
                      >
                        {t('manage')}
                      </Typography>
                      <Item
                        title={t('store_management')}
                        to="/store-management"
                        icon={<StoreIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                      />
                      <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "20px 0 5px 20px", textTransform: "capitalize" }}
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
                        isCollapsed={isCollapsed}
                      />
                      <Typography
                        variant="h6"
                        color={colors.grey[200]}
                        textAlign={"center"}
                        sx={{ m: "20px 0 5px 0" }}
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
    </Sidebar >
  );
}


export default SidebarMenu;
