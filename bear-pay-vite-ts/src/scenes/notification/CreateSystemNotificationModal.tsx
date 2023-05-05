import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useMutation } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { CreateSystemNotification } from "../../graphQL/Mutations";
import { useTranslation } from 'react-i18next';

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  content: yup.string().required("required"),
  comments: yup.string().required("required"), //this one is required by the api
});

interface FormValues {
  title: string;
  content: string;
  comments: string;
  rewardId: string;
}

export default function CreateSystemNotificationModal() {
  const { t } = useTranslation();
  //========================== THEME ==========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //========================== INITIAL VALUES ==========================
  const [initialValues] = useState<FormValues>({
    title: "",
    content: "",
    comments: "",
    rewardId: "",
  });

  // ========================== STATES AND HANDLERS ==========================
  var btnTitle = t("create"), confirmTitle = t("confirm");

  const [modal, setModal] = useState(false); //open or close modal
  const toggleModal = () => {
    setModal(!modal);
  };



  const [triggerAtDate, setTriggerAtDate] = useState('');
  function handleTriggerAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTriggerAtDate(event.target.value);
  }

  const [expireAtDate, setExpireAtDate] = useState('');
  function handleExpireAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setExpireAtDate(event.target.value);
  }

  const handleFormSubmit = (values: FormValues) => {
    const triggerAtDateObj = new Date(triggerAtDate);
    const expireAtDateObj = new Date(expireAtDate);


    let triggerAtUnix = triggerAtDateObj.getTime() / 1000;
    let expireAtUnix = expireAtDateObj.getTime() / 1000;
    let nowUnix = Math.floor(Date.now() / 1000);


    const variables: any = {
      comment: values.comments,
      // triggerAt: triggerAtUnix,
      notification: {
        type: "system",
        title: values.title,
        content: values.content,
        // expireAt: expireAtUnix,
      }
    }

    //check if startAtUnix is filled
    if (isNaN(triggerAtUnix)) {
      triggerAtUnix = nowUnix;
    }
    //insert triggerAtUnix to variables
    variables.triggerAt = triggerAtUnix;
    //insert endAtUnix to variables if it is selected
    if (!isNaN(expireAtUnix)) {
      variables.notification.expireAt = expireAtUnix;
    }
    if (expireAtUnix < triggerAtUnix) {
      alert("End date must be greater than start date");
      return;
    }

    console.log(variables);
    ApolloCreateNotification({ variables });

  };

  //========================== GRAPHQL ==========================
  const [ApolloCreateNotification, { data }] = useMutation(CreateSystemNotification);
  useEffect(() => {
    if (data) {
      window.location.reload();
    }
  }, [data]);

  //========================== RENDER ==========================
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  // ========================== RETURN ==========================
  return (
    <>
      {/* THE CONTENT OF THE BUTTON */}
      <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "1px solid #111", borderColor: colors.blueAccent[100] }}>{btnTitle}</Button>

      {/* CONTENT OF WHAT HAPPEN AFTER BUTTON CLICKED */}
      {modal && (
        <Box className="modal">
          <Box onClick={toggleModal} className="overlay"></Box>
          <Box className="modal-content"
            sx={{
              backgroundColor: colors.primary[500],
            }}>
            <Box m="20px">
              <Typography variant="h2" sx={{ mb: "2rem", textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: "white" }}>
                {btnTitle}
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
                        fullWidth
                        variant="filled"
                        type="text"
                        label={t('title')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.title}
                        name="title"
                        required
                        error={!!touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                        sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                      />

                      <TextField
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
                        required
                        error={!!touched.content && !!errors.content}
                        helperText={touched.content && errors.content}
                        sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label={t('comments')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.comments}
                        name="comments"
                        required
                        error={!!touched.comments && !!errors.comments}
                        helperText={touched.comments && errors.comments}
                        sx={{ marginBottom: "1rem", marginRight: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />

                      <TextField
                        fullWidth
                        id="datetime-local"
                        label={t('trigger_at_time')}
                        type="datetime-local"
                        // defaultValue="2017-05-24T10:30"
                        value={triggerAtDate}
                        onChange={handleTriggerAtDateChange}
                        sx={{ marginBottom: "1rem" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        fullWidth
                        id="datetime-local"
                        label={t('expire_at_time')}
                        type="datetime-local"
                        // defaultValue="2017-05-24T10:30"
                        value={expireAtDate}
                        onChange={handleExpireAtDateChange}
                        sx={{ marginBottom: "1rem" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                    <Box display="flex" justifyContent="center" >
                      <button className="my-button" type="submit">{confirmTitle}</button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box >
          </Box>
        </Box>
      )
      }
    </>
  );
}
