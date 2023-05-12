import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

type Props = {
  title: string,
  subtitle: string,
  progress?: string,
  icon?: any;
}
const StatPercentBox = ({ title, subtitle, progress, icon }: Props) => {
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
            sx={{
              color: colors.primary[100],
              marginBottom: "6px"
            }}
          >
            {title}
          </Typography>
          <Typography variant="h5" fontSize={"14px"} sx={{ color: colors.grey[100] }}>
            {subtitle}
          </Typography>
        </Box>

        {progress && (
          <Box>
            <ProgressCircle progress={progress} />
          </Box>
        )}
        {(!progress && icon) && (
          <Box>
            {icon}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StatPercentBox;
