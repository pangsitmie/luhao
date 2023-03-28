import { useMutation } from "@apollo/client";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { AcceptReview } from "src/graphQL/Mutations";


const AcceptReviewButton = ({ REQUEST_ID }) => {
    console.log(REQUEST_ID)
    const [ApolloAcceptReview, { data, loading, error }] = useMutation(AcceptReview, {
        variables: {
            requestId: REQUEST_ID,
        }
    });

    useEffect(() => {
        if (data) {
            window.location.reload();
        }
    }, [data]);


    return (
        <Button onClick={ApolloAcceptReview} sx={{
            minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", background: "#32CD32",
            ':hover': {
                bgcolor: "#93C572",
            }
        }}>
            <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "#fff" }}>
                Accept
            </Typography>
        </Button>
    )
}
export default AcceptReviewButton