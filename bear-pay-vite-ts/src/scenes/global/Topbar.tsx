import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetReviewList } from "../../graphQL/Queries";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LanguageDropdown from "../../components/languageDropdown/LanguageDropdown";


const Topbar = () => {
  const { entityName } = useSelector((state: RootState) => state.entity);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);


  const [reviewCount, setReviewCount] = useState(0);
  const { data: dataNotReviewed } = useQuery(GetReviewList, {
    variables: {
      onlyNotReview: true,
    },
    skip: entityName === "store",
  });
  useEffect(() => {
    if (dataNotReviewed) {
      setReviewCount(dataNotReviewed.getReviewList.length); //all brand datas
    }
  }, [dataNotReviewed]);

  const location = useLocation();
  const isStatisticPath = (location.pathname.includes("/statistic") || location.pathname.includes("/machine-management"));


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <div>
      </div>
      {/* ICONS */}
      <Box display="flex" justifyContent={"center"}>
        {
          entityName === "store" ? null :
            <Link to="/review">
              <IconButton className={reviewCount > 0 ? "notification-circle" : ""} data-count={reviewCount}>
                <NotificationsOutlinedIcon />
              </IconButton>
            </Link>
        }

        {/* <Link to="/setting">
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
        </Link> */}

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>


        {/* Conditionally render the LanguageDropdown based on URL path */}
        {!isStatisticPath && <LanguageDropdown />}
      </Box>
    </Box>
  );
};

export default Topbar;
