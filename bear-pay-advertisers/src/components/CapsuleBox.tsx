import { Typography } from "@mui/material"
import { Box } from "@mui/system"

type Props = {
    title: string,
    content: string,
    borderColor?: string,
    textColor?: string,
}

const CapsuleBox = (props: Props) => {
    return (
        <Box
            sx={{
                borderRadius: "20px",
                border: "2px solid " + props.borderColor,
                color: props.textColor,
                padding: "8px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "5px",
            }}>
            <Typography variant="h5" sx={{ margin: 0 }}>{props.title}: </Typography>
            <Typography variant="h5" sx={{ margin: 0 }}>{props.content}</Typography>
        </Box>
    )
}
export default CapsuleBox