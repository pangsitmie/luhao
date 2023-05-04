import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from "@mui/material";
import { RejectReview } from "../../graphQL/Mutations";
import { tokens } from "../../theme";
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";

type Props = {
    REQUEST_ID: string,
    onUpdate: () => void
}


const RejectReviewButton = ({ REQUEST_ID, onUpdate }: Props) => {
    const { t } = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [reason, setReason] = useState("");
    const [open, setOpen] = useState(false);
    const [ApolloRejectReview, { data }] = useMutation(RejectReview);
    const handleReject = () => {
        if (reason) {
            ApolloRejectReview({
                variables: {
                    requestId: REQUEST_ID,
                    reason: reason,
                },
            });
            setOpen(false);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (data) {
            onUpdate();
            toast.error(t('review_rejected'));
        }
    }, [data]);

    return (
        <>
            <Button onClick={handleOpen} sx={{
                minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", background: colors.redAccent[300],
                ':hover': {
                    bgcolor: colors.redAccent[400],
                }
            }}>
                <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "#fff" }}>
                    Reject
                </Typography>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reason for rejection</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Reason"
                        fullWidth
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleReject}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RejectReviewButton;
