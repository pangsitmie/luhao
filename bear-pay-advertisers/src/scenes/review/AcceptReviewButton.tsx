import { useMutation } from "@apollo/client";
import { Button, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { AcceptReview } from "../../graphQL/Mutations";
import { useTranslation } from 'react-i18next';
import { tokens } from "../../theme";

type Props = {
    REQUEST_ID: string,
    onUpdate: () => void
}
const AcceptReviewButton = ({ REQUEST_ID, onUpdate }: Props) => {

    //========================== THEME ==========================
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { t } = useTranslation();
    console.log(REQUEST_ID)
    const [ApolloAcceptReview, { data }] = useMutation(AcceptReview, {
        variables: {
            requestId: REQUEST_ID,
        }
    });

    useEffect(() => {
        if (data) {
            onUpdate();
            toast.success(t('review_accepted'));
        }
    }, [data]);


    return (
        <Button
            variant="contained"
            onClick={() => ApolloAcceptReview()}
            sx={{
                backgroundColor: colors.greenAccent[400],
                minWidth: "100px",
                padding: ".5rem 1.5rem",
                borderRadius: "10px",
                color: colors.primary[100],
                ':hover': {
                    bgcolor: colors.greenAccent[500],
                    color: "#fff",
                    transition: "all .5s ease",
                }
            }}>
            <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "#fff" }}>
                {t('confirm')}
            </Typography>
        </Button>
    )
}
export default AcceptReviewButton