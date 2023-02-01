import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatPercentBox = ({ title, subtitle, progress, }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="20px">
      <Box display="flex" justifyContent="space-between" alignItems={"center"} >
        <Box>
          <Typography
            variant="h2"
            fontWeight="bold"
            m={0}
            sx={{ color: "#fff" }}
          >
            {title}
          </Typography>
          <Typography variant="h5" fontSize={"14px"} sx={{ color: colors.grey[100] }}>
            {subtitle}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      {/* <Box>
        <Typography
          variant="h3"
          fontWeight="bold"
          m={0}
          sx={{ color: "#fff" }}
        >
          {title}
        </Typography>
      </Box> */}
      {/* <Box display="flex" justifyContent="space-between" mt="5px">
        <Typography variant="h5" fontSize={"14px"} sx={{ color: colors.grey[100] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.grey[100] }}
        >
          {increase}
        </Typography>
      </Box> */}
    </Box>
  );
};

export default StatPercentBox;
