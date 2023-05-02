import { useMutation } from "@apollo/client";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { AcceptReview } from "../../graphQL/Mutations";
import { useTranslation } from 'react-i18next';

type Props = {
    REQUEST_ID: string,
    onUpdate: () => void
}
const AcceptReviewButton = ({ REQUEST_ID, onUpdate }: Props) => {
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
                minWidth: "100px",
                padding: ".5rem 1.5rem",
                margin: "0 1rem",
                borderRadius: "10px",
                backgroundColor: "#32CD32",
                "&:hover": {
                    bgcolor: "#93C572",
                },
            }}>
            <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "#fff" }}>
                Accept
            </Typography>
        </Button>
    )
}
export default AcceptReviewButton