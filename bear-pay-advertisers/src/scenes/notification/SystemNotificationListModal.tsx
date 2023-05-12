import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useLazyQuery, useQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { DeleteNotification, HealthCheck } from "../../graphQL/Queries";
import { useTranslation } from 'react-i18next';
import { getRESTEndpoint } from "../../utils/Utils";
import axios from "axios";


const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  content: yup.string().required("required"),
  comments: yup.string().required("required"),
  rewardId: yup.string().required("required"),
});

type Props = {
  scheduleId: string,
  triggerAt: number,
  rewardType: string | null,
}
interface FormValues {
  title: string;
  content: string;
  triggerAtDate: string;
  expireAtDate: string;

  //what type of notification is this (get from prop)
  type: string;


  // bellow is only when rewardType is not null
  rewardId?: string;
  currencyId?: string;
  currencyName?: string;
  belongToRole?: string;
  amount?: string;
  receiveDaysOverdue?: string;
  limit?: string;
  description?: string;
  rewardStatus?: string;
  startAt?: string;
  endAt?: string;
}

export default function SystemNotificationListModal({ scheduleId, triggerAt, rewardType }: Props) {
  const { t } = useTranslation();
  //========================== THEME ==========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  var btnTitle = t("view"), modalTitle = t("details");

  const [modal, setModal] = useState(false); //open or close modal


  // ========================== STATES AND HANDLERS ==========================
  const [initialValues, setInitialValues] = useState<FormValues>({
    title: "",
    content: "",
    rewardId: "",
    triggerAtDate: new Date(triggerAt * 1000).toLocaleString(),
    expireAtDate: "",
    currencyId: "",
    amount: "",
    receiveDaysOverdue: "",
    limit: "",
    description: "",
    rewardStatus: "",
    startAt: "",
    endAt: "",
    type: "",
  });




  //========================== GRAPHQL ==========================
  const [ApolloRemoveNotification, { data }] = useLazyQuery(DeleteNotification);
  useEffect(() => {
    if (data) {
      window.location.reload();
    }
  }, [data]);


  const { refetch: refetchHealthCheck } = useQuery(HealthCheck);

  const REST_FetchNotificationDetail = async () => {
    const MAX_RETRY_ATTEMPTS = 3;
    let retryCount = 0;

    while (retryCount < MAX_RETRY_ATTEMPTS) {
      try {
        let URI = `${getRESTEndpoint()}/notificationSchedule/getDetails`;

        const response = await axios.post(URI,
          {
            // body
            scheduleId: scheduleId
          },
          {
            headers: {
              // need to put Authorization Bearer token
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            }
          });
        console.log(response);
        if (response.data && response.data.data) {
          const result = response.data.data;
          console.log(result);



          if (rewardType) {
            setInitialValues({
              title: result.title,
              content: result.content,
              triggerAtDate: new Date(triggerAt * 1000).toLocaleString(),
              expireAtDate: new Date(result.expireAt * 1000).toLocaleString(),
              type: rewardType !== null ? rewardType : "Notification",

              rewardId: result.reward.rewardId,
              currencyId: result.reward.content.currencyId,
              currencyName: result.reward.content.currencyName,
              belongToRole: result.reward.belongToRole,
              startAt: new Date(result.reward.startAt * 1000).toLocaleString(),
              endAt: new Date(result.reward.endAt * 1000).toLocaleString(),
              amount: result.reward.content.amount,
              receiveDaysOverdue: result.reward.receiveDaysOverdue,
              limit: (result.reward.limit) ? result.reward.limit : t('none'),
              description: result.reward.description,
            });
          }
          else {
            setInitialValues({
              title: result.title,
              content: result.content,
              triggerAtDate: new Date(triggerAt * 1000).toLocaleString(),
              expireAtDate: new Date(result.expireAt * 1000).toLocaleString(),
              type: rewardType !== null ? rewardType : "Notification",
            });
          }

        } else {
          refetchHealthCheck();
        }
      } catch (error) {
        console.error('Error:', error);
      }

      retryCount++;
      console.log(`Retrying API call (attempt ${retryCount})...`);

      if (retryCount > 0) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // wait for 1 second before retrying
      }
    }
    if (retryCount === MAX_RETRY_ATTEMPTS) {
      console.log(`Maximum retry attempts (${MAX_RETRY_ATTEMPTS}) exceeded.`);
    }
  };

  useEffect(() => {
    if (modal) {
      REST_FetchNotificationDetail();
      console.log("SCHEDULE ID: " + scheduleId)
    }
  }, [modal]);


  const handleDelete = () => {
    var result = window.confirm("Are you sure you want to delete this notification?");
    if (result) {
      ApolloRemoveNotification({
        variables: {
          ids: scheduleId
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
                enableReinitialize={true}
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
                        value={values.description}
                        name="description"
                        error={!!touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                        sx={{ marginBottom: "1rem", marginRight: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />
                      <Box display={"flex"} gap={"1rem"}>
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
                          sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
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
                    </Box>

                    {rewardType !== null && (
                      <Box>
                        <Box display={"flex"} gap={"1rem"} >
                          <TextField
                            disabled={true}
                            fullWidth
                            variant="filled"
                            type="text"
                            label={t('brand')}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.currencyName}
                            name="currencyName"
                            error={!!touched.currencyName && !!errors.currencyName}
                            helperText={touched.currencyName && errors.currencyName}
                            sx={{ margin: "0rem 0rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                          />

                          <TextField
                            disabled={true}
                            fullWidth
                            variant="filled"
                            type="text"
                            label={t('reward_description')}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={rewardType}
                            name="description"
                            sx={{ margin: "0rem 0rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                          />
                          <TextField
                            disabled={true}
                            fullWidth
                            variant="filled"
                            type="text"
                            label={t('reward_description')}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                            name="description"
                            error={!!touched.description && !!errors.description}
                            helperText={touched.description && errors.description}
                            sx={{ margin: "0rem 0rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                          />
                        </Box>



                        <Box display={"flex"} justifyContent={"space-between"}>
                          <TextField
                            disabled={true}
                            fullWidth
                            variant="filled"
                            type="text"
                            label={t('amount')}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.amount}
                            name="amount"
                            error={!!touched.amount && !!errors.amount}
                            helperText={touched.amount && errors.amount}
                            sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                          />
                          <TextField
                            disabled={true}
                            fullWidth
                            variant="filled"
                            type="text"
                            label={t('currency_limit')}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.limit}
                            name="limit"
                            error={!!touched.limit && !!errors.limit}
                            helperText={touched.limit && errors.limit}
                            sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                          />
                          <TextField
                            fullWidth
                            disabled={true}
                            variant="filled"
                            type="number"
                            label={t('currency_days_limit')}
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


                        <Box display={"flex"} gap={"1rem"}>
                          <TextField
                            disabled={true}
                            fullWidth
                            variant="filled"
                            type="text"
                            label={t('start_time')}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.startAt}
                            name="startAt"
                            error={!!touched.startAt && !!errors.startAt}
                            helperText={touched.startAt && errors.startAt}
                            sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                          />
                          <TextField
                            disabled={true}
                            fullWidth
                            variant="filled"
                            type="text"
                            label={t('end_time')}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.endAt}
                            name="endAt"
                            error={!!touched.endAt && !!errors.endAt}
                            helperText={touched.endAt && errors.endAt}
                            sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                          />
                        </Box>
                      </Box>
                    )}
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
