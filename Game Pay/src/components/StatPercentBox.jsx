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
            sx={{ color: colors.primary[100] }}
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
    </Box>
  );
};

export default StatPercentBox;
