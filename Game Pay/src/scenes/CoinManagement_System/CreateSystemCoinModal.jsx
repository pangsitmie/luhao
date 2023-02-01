import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { useMutation } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { ManagerCreateCurrencyReward } from "../../graphQL/Mutations";



const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  content: yup.string().required("required"),
  comment: yup.string().required("required"),
  // triggerAt: yup.string().required("required"),
  // expireAt: yup.string().required("required"),

  currencyAmount: yup.number().required("required"),
  receiveDaysOverdue: yup.number().required("required"),
  rewardLimit: yup.number().required("required"),
  rewardDescription: yup.string().required("required"),

  // startAt: yup.string().required("required"),
  // endAt: yup.string().required("required"),
});


export default function CreateSystemCoinModal() {
  //========================== THEME ==========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //========================== INITIAL VALUES ==========================
  var btnTitle = "新增", confirmTitle = "新增", deleteTitle = "取消";
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

    // const newInitialValues = { ...initialValues };
    // newInitialValues.triggerAt = event.target.value;
    // setInitialValues(newInitialValues);
  }

  const [expireAtDate, setExpireAtDate] = useState('');
  function handleExpireAtDateChange(event) {
    setExpireAtDate(event.target.value);
    // setInitialValues({
    //   ...initialValues,
    //   expireAt: event.target.value
    // });
  }

  const [startAtDate, setStartAtDate] = useState('');
  function handleStartAtDateChange(event) {
    setStartAtDate(event.target.value);
    // setInitialValues({
    //   ...initialValues,
    //   startAt: event.target.value
    // });
  }

  const [endAtDate, setEndAtDate] = useState('');
  function handleEndAtDateChange(event) {
    setEndAtDate(event.target.value);
    // setInitialValues({
    //   ...initialValues,
    //   endAt: event.target.value
    // });
  }

  //========================== INITIAL VALUES ==========================
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    comment: "",
    rewardId: "",
    triggerAt: "",
    expireAt: "",
    currencyID: "",
    currencyAmount: "",
    receiveDaysOverdue: "",
    rewardLimit: "",
    rewardDescription: "",
    startAt: "",
    endAt: "",
  });


  //========================== GRAPHQL ==========================
  const [ApolloCreateSystemFreeCoinNotification, { loading, error, data }] = useMutation(ManagerCreateCurrencyReward);
  useEffect(() => {
    if (data) {
      console.log(data);
      window.location.reload();
    }
    else {
      console.log(error)
    }
  }, [data]);







  const handleFormSubmit = (values) => {
    const triggerAtDateObj = new Date(triggerAtDate);
    const expireAtDateObj = new Date(expireAtDate);
    const startAtDateObj = new Date(startAtDate);
    const endAtDateObj = new Date(endAtDate);

    let triggerAtUnix = triggerAtDateObj.getTime() / 1000;
    let expireAtUnix = expireAtDateObj.getTime() / 1000;
    let startAtUnix = startAtDateObj.getTime() / 1000;
    let endAtUnix = endAtDateObj.getTime() / 1000;

    let nowUnix = Math.floor(Date.now() / 1000);

    const variables = {
      receiveDaysOverdue: parseInt(values.receiveDaysOverdue),
      belongToRole: "manager",
      belongToId: "1",
      amount: parseInt(values.currencyAmount),
      currencyId: "1",
      sourceType: "direct",
      // triggerAt: triggerAtUnix,
      // startAt: startAtUnix,
      // endAt: endAtUnix,
      description: values.rewardDescription,
      limit: parseInt(values.rewardLimit),
      comment: values.comment,
      notification: {
        type: "freeCoin",
        title: values.title,
        content: values.content,
        // expireAt: expireAtUnix
      },
    }

    //check if startAtUnix is filled
    if (isNaN(triggerAtUnix)) {
      triggerAtUnix = nowUnix;
    }
    if (isNaN(startAtUnix)) {
      startAtUnix = nowUnix;
    }

    //insert startAtUnix to variables
    variables.triggerAt = triggerAtUnix;
    variables.startAt = startAtUnix;

    //insert endAtUnix to variables if it is selected
    if (!isNaN(endAtUnix)) {
      variables.endAt = endAtUnix;
    }
    if (!isNaN(expireAtUnix)) {
      variables.notification.expireAt = expireAtUnix;
    }

    if (endAtUnix < startAtUnix) {
      alert("End date must be greater than start date");
      return;
    }
    if (expireAtUnix < triggerAtUnix) {
      alert("expire date must be greater than trigger date");
      return;
    }
    console.log(variables);

    ApolloCreateSystemFreeCoinNotification({ variables });
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
                          variant="filled"
                          type="text"
                          label="標題"
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
                          variant="filled"
                          type="text"
                          label="備註"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.comment}
                          name="comment"
                          error={!!touched.comment && !!errors.comment}
                          helperText={touched.comment && errors.comment}
                          sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>

                      <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        fullWidth
                        maxRows={4}
                        variant="filled"
                        type="text"
                        label="内容"
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
                          fullWidth
                          id="datetime-local"
                          label="排程時間"
                          type="datetime-local"
                          // defaultValue="2017-05-24T10:30"
                          value={triggerAtDate}
                          name="triggerAt"
                          onChange={handleTriggerAtDateChange}
                          error={!!touched.triggerAt && !!errors.triggerAt}
                          helperText={touched.triggerAt && errors.triggerAt}
                          sx={{ marginBottom: "1rem", mr: '1rem' }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />

                        <TextField
                          fullWidth
                          id="datetime-local"
                          label="過期時間"
                          type="datetime-local"
                          // defaultValue="2017-05-24T10:30"
                          value={expireAtDate}
                          name="expireAt"
                          onChange={handleExpireAtDateChange}
                          error={!!touched.expireAt && !!errors.expireAt}
                          helperText={touched.expireAt && errors.expireAt}
                          sx={{ marginBottom: "1rem" }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Box>

                      <Typography variant="h4" sx={{ m: "1rem 0", textAlign: "center", fontSize: "1rem", fontWeight: "600", color: "#cecece" }}>
                        Reward
                      </Typography>



                      <Box display={"flex"} justifyContent={"space-between"}>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="數量"
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
                          variant="filled"
                          type="text"
                          label="最大發送次數"
                          placeholder="Null是不限制 或 1~60"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.rewardLimit}
                          name="rewardLimit"
                          error={!!touched.rewardLimit && !!errors.rewardLimit}
                          helperText={touched.rewardLimit && errors.rewardLimit}
                          sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="獎勵使用期限"
                          placeholder="Null是不限制"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.receiveDaysOverdue}
                          name="receiveDaysOverdue"
                          error={!!touched.receiveDaysOverdue && !!errors.receiveDaysOverdue}
                          helperText={touched.receiveDaysOverdue && errors.receiveDaysOverdue}
                          sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="獎勵描述"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.rewardDescription}
                        name="rewardDescription"
                        error={!!touched.rewardDescription && !!errors.rewardDescription}
                        helperText={touched.rewardDescription && errors.rewardDescription}
                        sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />



                      <Box display={"flex"} justifyContent={"space-between"}>
                        <TextField
                          fullWidth
                          id="datetime-local"
                          label="獎勵開始時間"
                          type="datetime-local"
                          // defaultValue="2017-05-24T10:30"
                          value={startAtDate}
                          name="startAt"
                          onChange={handleStartAtDateChange}
                          error={!!touched.startAt && !!errors.startAt}
                          helperText={touched.startAt && errors.startAt}
                          sx={{ marginBottom: "1rem", mr: '1rem' }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          fullWidth
                          id="datetime-local"
                          label="獎勵結束時間"
                          type="datetime-local"
                          // defaultValue="2017-05-24T10:30"
                          value={endAtDate}
                          name="endAt"
                          onChange={handleEndAtDateChange}
                          error={!!touched.endAt && !!errors.endAt}
                          helperText={touched.endAt && errors.endAt}
                          sx={{ marginBottom: "1rem" }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Box>


                    </Box>
                    <Box display="flex" justifyContent="center" >
                      <Button className="my-button" type="submit">{confirmTitle}</Button>
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
