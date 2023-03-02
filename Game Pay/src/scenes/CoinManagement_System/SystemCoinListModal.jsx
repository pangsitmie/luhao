import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { useLazyQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import IMG from "../../assets/user.png";
import { tokens } from "../../theme";
import { DeleteNotification } from "../../graphQL/Queries";
import { format } from 'date-fns';
import { replaceNullWithEmptyString } from "../../utils/Utils";
import { useTranslation } from 'react-i18next';

const checkoutSchema = yup.object().shape({});


export default function SystemCoinListModal({ props }) {
  const { t } = useTranslation();
  //========================== THEME ==========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //========================== INITIAL VALUES ==========================
  var btnTitle = t("details"), deleteTitle = t("delete");
  const [modal, setModal] = useState(false); //open or close modal
  const toggleModal = () => {
    setModal(!modal);
  };

  const [notifType, setNotifType] = useState('system');
  const handleNotifTypeChange = (event) => {
    setNotifType(event.target.value);
  };
  const [triggerAtDate, setTriggerAtDate] = useState('');
  function handleTriggerAtDateChange(event) {
    setTriggerAtDate(event.target.value);
  }

  const [expireAtDate, setExpireAtDate] = useState('');
  function handleExpireAtDateChange(event) {
    setExpireAtDate(event.target.value);
  }

  //========================== INITIAL VALUES ==========================
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    comment: "",
    rewardId: "",
    triggerAtDate: "",
    expireAtDate: "",
    currencyID: "",
    currencyName: "",
    currencyAmount: "",
    receiveDaysOverdue: "",
    rewardLimit: "",
    rewardDescription: "",
    rewardStatus: "",
    startAt: "",
    endAt: "",
  });
  useEffect(() => {
    if (props) {
      setInitialValues({
        title: props.notification.title,
        content: props.notification.content,
        comment: props.comment,
        rewardId: props.rewardId,
        triggerAtDate: format(new Date(props.triggerAt * 1000), 'MM/dd/yyyy - HH:mm:ss'),
        expireAtDate: props.notification.expireAt === null ? t("none") : format(new Date(props.notification.expireAt * 1000), 'MM/dd/yyyy - HH:mm:ss'),
        currencyID: props.notification.reward.content.currency.id,
        currencyName: props.notification.reward.content.currency.name,
        currencyAmount: props.notification.reward.content.amount,
        receiveDaysOverdue: props.notification.reward.receiveDaysOverdue === null ? t("none"): props.notification.reward.receiveDaysOverdue,
        rewardLimit: props.notification.reward.limit === null ? t("none") : props.notification.reward.limit,
        rewardDescription: props.notification.reward.description === null ? t("none") : props.notification.reward.description,
        rewardStatus: props.notification.reward.status.name,
        startAt: props.notification.reward.startAt === null ? t("none"): format(new Date(props.notification.reward.startAt * 1000), 'MM/dd/yyyy - HH:mm:ss'),
        endAt: props.notification.reward.endAt === null ? t("none") : format(new Date(props.notification.reward.endAt * 1000), 'MM/dd/yyyy - HH:mm:ss'),
      });
    }
  }, [props]);

  //========================== GRAPHQL ==========================
  const [ApolloRemoveNotification, { loading, error, data }] = useLazyQuery(DeleteNotification);
  useEffect(() => {
    if (data) {
      console.log(data);
      window.location.reload();
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
      console.log("deleted");
    } else {
      console.log("not deleted");
    }
  };

  const handleFormSubmit = (values) => { };

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
        <Box className="modal">
          <Box onClick={toggleModal} className="overlay"></Box>
          <Box className="modal-content" backgroundColor={colors.primary[500]}>
            <Box m="20px">
              <Typography variant="h2" sx={{ mb: "2rem", textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
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
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <TextField className="modal_input_textfield"
                          fullWidth
                          disabled={true}
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
                          fullWidth
                          disabled={true}
                          variant="filled"
                          type="text"
                          label={t('description')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.comment}
                          name="comments"
                          error={!!touched.comment && !!errors.comment}
                          helperText={touched.comment && errors.comment}
                          sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>

                      <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        fullWidth
                        disabled={true}
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

                      <Box display={"flex"} justifyContent={"space-between"}>
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
                          sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>

                      <Typography variant="h4" sx={{ m: "1rem 0", textAlign: "center", fontSize: "1rem", fontWeight: "600", color: "#cecece" }}>
                        {t('reward')}
                      </Typography>

                      <Box display={"flex"} justifyContent={"space-between"}>
                        <TextField
                          fullWidth
                          disabled={true}
                          variant="filled"
                          type="text"
                          label={t('currency_name')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.currencyName}
                          name="currencyName"
                          error={!!touched.currencyName && !!errors.currencyName}
                          helperText={touched.currencyName && errors.currencyName}
                          sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>

                      <Box display={"flex"} justifyContent={"space-between"}>
                        <TextField
                          fullWidth
                          disabled={true}
                          variant="filled"
                          type="text"
                          label={t('amount')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.currencyAmount}
                          name="currencyAmount"
                          error={!!touched.currencyAmount && !!errors.currencyAmount}
                          helperText={touched.currencyAmount && errors.currencyAmount}
                          sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                        <TextField
                          fullWidth
                          disabled={true}
                          variant="filled"
                          type="text"
                          label={t('currency_limit')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.rewardLimit}
                          name="currencyLimit"
                          error={!!touched.rewardLimit && !!errors.rewardLimit}
                          helperText={touched.rewardLimit && errors.rewardLimit}
                          sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                        <TextField
                          fullWidth
                          disabled={true}
                          variant="filled"
                          type="number"
                          label={t('currency_days_limit')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.receiveDaysOverdue}
                          name="receiveDaysOverdue"
                          error={!!touched.receiveDaysOverdue && !!errors.receiveDaysOverdue}
                          helperText={touched.receiveDaysOverdue && errors.receiveDaysOverdue}
                          sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>

                      <Box display={"flex"} justifyContent={"space-between"}>
                        <TextField
                          fullWidth
                          disabled={true}
                          variant="filled"
                          type="text"
                          label={t('reward_description')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.rewardDescription}
                          name="rewardDescription"
                          error={!!touched.rewardDescription && !!errors.rewardDescription}
                          helperText={touched.rewardDescription && errors.rewardDescription}
                          sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                        <TextField
                          fullWidth
                          disabled={true}
                          variant="filled"
                          type="text"
                          label={t('reward_status')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.rewardStatus}
                          name="rewardStatus"
                          error={!!touched.rewardStatus && !!errors.rewardStatus}
                          helperText={touched.rewardStatus && errors.rewardStatus}
                          sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>

                      <Box display={"flex"} justifyContent={"space-between"}>
                        <TextField
                          fullWidth
                          disabled={true}
                          variant="filled"
                          type="text"
                          label={t('start_time')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.startAt}
                          name="startAt"
                          error={!!touched.startAt && !!errors.startAt}
                          helperText={touched.startAt && errors.startAt}
                          sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                        <TextField
                          fullWidth
                          disabled={true}
                          variant="filled"
                          type="text"
                          label={t('end_time')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.endAt}
                          name="endAt"
                          error={!!touched.endAt && !!errors.endAt}
                          helperText={touched.endAt && errors.endAt}
                          sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>


                    </Box>
                    <Box display="flex" justifyContent="center" >
                      <button onClick={handleDelete} className="btn_delete noselect"><span className="text">移除</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
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
