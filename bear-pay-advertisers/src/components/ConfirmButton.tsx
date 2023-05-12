import { Button, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme";

type Props = {
    title: string
    onClick?: () => void
}

const ConfirmButton = ({ title, onClick }: Props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Button className="my-button" type="submit"
            onClick={onClick}
            sx={{
                padding: "1em 2.2rem",
                borderRadius: "12px",
                "&:before": {
                    content: "''",
                    background: colors.primary[400],
                    width: "120%",
                    left: "-10%",
                    transition: "transform 0.4s cubic-bezier(0.3, 1, 0.8, 1)",
                }
            }}>
            <Typography variant="h5"
                sx={{
                    textAlign: "center",
                    fontSize: ".9rem",
                    color: colors.primary[100],
                    position: "relative",
                }}>
                {title}
            </Typography>
        </Button>
    )
}
export default ConfirmButton