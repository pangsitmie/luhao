import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

type Props = {
  title: number | string;
  subtitle: string;
  icon: any;
  progress?: string;
  increase: string;
  textColor: string;
};
const StatBox = ({ title, subtitle, icon, progress, increase, textColor }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="15px 20px">
      <Box display="flex" justifyContent="space-between" alignItems={"center"}>
        <Box>
        </Box>
        <Box>
          {icon}
        </Box>
      </Box>
      <Box mt={"15px"}>
        <Typography
          variant="h3"
          fontWeight="bold"
          m={0}
          sx={{ color: textColor }}
        >
          {title}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="5px">
        <Typography variant="h5" fontSize={"14px"} sx={{ color: textColor }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: textColor }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
