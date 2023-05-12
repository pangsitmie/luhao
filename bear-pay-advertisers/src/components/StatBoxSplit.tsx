import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

type Props = {
  icon: any,
  title: string,
  subtitle1: string,
  val1: string,
  subtitle2: string,
  val2: string
}
const StatBoxSplit = ({ icon, title, subtitle1, val1, subtitle2, val2 }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="15px 20px">
      <Box display="flex" justifyContent="space-between" alignItems={"center"} >
        <Box>
          <Typography
            variant="h3"
            textAlign={"center"}
            fontWeight="bold"
            sx={{ color: colors.primary[100] }}>
            {title}
          </Typography>
        </Box>
        <Box>
          {icon}
        </Box>
      </Box>


      <Box display="flex" justifyContent="space-evenly"
        mt="15px"
        pt="15px"
        borderTop={"1px solid " + colors.grey[200]}>
        <Box width={"50%"} borderRight={"1px solid " + colors.grey[200]}>
          <Typography
            variant="h3"
            textAlign={"center"}
            fontWeight="bold"
            sx={{ color: colors.primary[100] }}>
            {val1}
          </Typography>
          <Typography textAlign={"center"} variant="h5" fontSize={"14px"} sx={{ color: colors.grey[100] }}>
            {subtitle1}
          </Typography>
        </Box>
        <Box width={"50%"} >
          <Typography
            variant="h3"
            textAlign={"center"}
            fontWeight="bold"
            sx={{ color: colors.primary[100] }}>
            {val2}
          </Typography>
          <Typography textAlign={"center"} variant="h5" fontSize={"14px"} sx={{ color: colors.grey[100] }}>
            {subtitle2}
          </Typography>
        </Box>

      </Box>
    </Box >
  );
};

export default StatBoxSplit;
