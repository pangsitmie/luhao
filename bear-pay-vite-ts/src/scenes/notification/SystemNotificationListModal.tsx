import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useLazyQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { DeleteNotification } from "../../graphQL/Queries";
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { NotificationSchedulesType } from "../../types/Notification";

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  content: yup.string().required("required"),
  comments: yup.string().required("required"),
  rewardId: yup.string().required("required"),
});

type Props = {
  props: NotificationSchedulesType
}
interface FormValues {
  title: string;
  type: string;
  content: string;
  comment: string;
  triggerAtDate: string;
  expireAtDate: string;

}

export default function SystemNotificationListModal({ props }: Props) {
  const { t } = useTranslation();
  //========================== THEME ==========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  var btnTitle = t("view"), modalTitle = t("details");

  const [modal, setModal] = useState(false); //open or close modal


  // ========================== STATES AND HANDLERS ==========================
  const [initialValues, setInitialValues] = useState<FormValues>({
    title: "",
    type: "",
    content: "",
    comment: "",
    triggerAtDate: "",
    expireAtDate: "",
  });

  useEffect(() => {
    const expireAtDate = props.notification.expireAt === null ? t('none') : format(new Date(props.notification.expireAt * 1000), 'MM/dd/yyyy - HH:mm:ss');

    setInitialValues({
      title: props.notification.title,
      type: props.notification.type,
      content: props.notification.content,
      comment: props.comment,
      triggerAtDate: format(new Date(props.triggerAt * 1000), 'MM/dd/yyyy - HH:mm:ss'),
      expireAtDate: expireAtDate,
    });
  }, [props]);


  //========================== GRAPHQL ==========================
  const [ApolloRemoveNotification, { loading, error, data }] = useLazyQuery(DeleteNotification);
  useEffect(() => {
    if (data) {
      window.location.reload();
    }
    else {
      console.log(error)
    }
  }, [data]);


  const handleDelete = () => {
    var result = window.confirm("Are you sure you want to delete this notification?");
    if (result) {
      ApolloRemoveNotification({
        variables: {
          ids: props.id
        }
      })
    }
  };


  const handleFormSubmit = () => { };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {/* THE CONTENT OF THE BUTTON */}
      <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "1px solid #111", borderColor: colors.blueAccent[100] }}>{btnTitle}</Button>

      {/* CONTENT OF WHAT HAPPEN AFTER BUTTON CLICKED */}
      {modal && (
        <div className="modal">
          <Box onClick={toggleModal} className="overlay"></Box>
          <Box className="modal-content"
            sx={{
              backgroundColor: colors.primary[500],
            }}>
            <Box m="20px">
              <Typography variant="h2" sx={{ mb: "2rem", textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: "white" }}>
                {modalTitle}
              </Typography>

              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box color={"black"}>
                      <TextField className="modal_input_textfield"
                        disabled={true}
                        fullWidth
                        variant="filled"
                        type="text"
                        label={t('title')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.title}
                        name="title"
                        error={!!touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                        sx={{ marginBottom: "1rem", mr: '1rem', backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                      />

                      <TextField
                        disabled={true}
                        id="outlined-multiline-flexible"
                        multiline
                        fullWidth
                        maxRows={4}
                        variant="filled"
                        type="text"
                        label={t('content')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.content}
                        name="content"
                        error={!!touched.content && !!errors.content}
                        helperText={touched.content && errors.content}
                        sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />

                      <TextField
                        disabled={true}
                        fullWidth
                        variant="filled"
                        type="text"
                        label={t('description')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.comment}
                        name="comments"
                        error={!!touched.comment && !!errors.comment}
                        helperText={touched.comment && errors.comment}
                        sx={{ marginBottom: "1rem", marginRight: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />
                      <TextField
                        disabled={true}
                        fullWidth
                        variant="filled"
                        type="text"
                        label={t('trigger_at_time')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.triggerAtDate}
                        name="triggerAtDate"
                        error={!!touched.triggerAtDate && !!errors.triggerAtDate}
                        helperText={touched.triggerAtDate && errors.triggerAtDate}
                        sx={{ marginBottom: "1rem", marginRight: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />
                      <TextField
                        disabled={true}
                        fullWidth
                        variant="filled"
                        type="text"
                        label={t('expire_at_time')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.expireAtDate}
                        name="expireAtDate"
                        error={!!touched.expireAtDate && !!errors.expireAtDate}
                        helperText={touched.expireAtDate && errors.expireAtDate}
                        sx={{ marginBottom: "1rem", marginRight: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />
                    </Box>
                    <Box display="flex" justifyContent="center" >
                      <button onClick={handleDelete} className="btn_delete noselect"><span className="text">{t('delete')}</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box >
          </Box>
        </div>
      )
      }
    </>
  );
}
