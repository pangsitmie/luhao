// import React, { useState, useEffect } from "react";
// import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
// import { useMutation } from '@apollo/client'
// import { Formik } from "formik";
// import * as yup from "yup";
// import "../../components/Modal/modal.css";
// import { tokens } from "../../theme";
// import { ManagerCreateCurrencyReward } from "../../graphQL/Mutations";
// import { useTranslation } from 'react-i18next';




// interface FormValues {
//   receiveDaysOverdue: string;
//   // belongToRole: string;
//   // belongToId: string;
//   amount: string;
//   currencyId: string;
//   // sourceType: string;
//   // triggerAt: string;
//   // startAt: string;
//   // endAt: string;
//   description: string;
//   limit: string;
//   comment: string;
//   title: string;
//   content: string;
//   // type: string;
//   // expireAt: string;



// }


// const checkoutSchema = yup.object().shape({
//   title: yup.string().required("required"),
//   content: yup.string().required("required"),
//   comment: yup.string().required("required"),
//   // triggerAt: yup.string().required("required"),
//   // expireAt: yup.string().required("required"),

//   amount: yup.number().required("required"),
//   receiveDaysOverdue: yup.number().required("required"),
//   limit: yup.number().required("required"),
//   // description: yup.string().required("required"),

//   // startAt: yup.string().required("required"),
//   // endAt: yup.string().required("required"),
// });


// export default function CreateSystemCoinModal() {
//   const { t } = useTranslation();
//   //========================== THEME ==========================
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   //========================== INITIAL VALUES ==========================
//   var btnTitle = t("create"), confirmTitle = t("confirm");
//   const [modal, setModal] = useState(false); //open or close modal
//   const toggleModal = () => {
//     setModal(!modal);
//   };


//   const [triggerAtDate, setTriggerAtDate] = useState('');
//   function handleTriggerAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setTriggerAtDate(event.target.value);
//   }

//   const [expireAtDate, setExpireAtDate] = useState('');
//   function handleExpireAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setExpireAtDate(event.target.value);
//   }

//   const [startAtDate, setStartAtDate] = useState('');
//   function handleStartAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setStartAtDate(event.target.value);
//   }

//   const [endAtDate, setEndAtDate] = useState('');
//   function handleEndAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setEndAtDate(event.target.value);
//   }

//   //========================== INITIAL VALUES ==========================
//   const [initialValues] = useState<FormValues>({
//     title: "",
//     content: "",
//     comment: "",
//     // triggerAt: "",
//     // expireAt: "",
//     currencyId: "",
//     amount: "",
//     receiveDaysOverdue: "",
//     limit: "",
//     description: "",
//     // startAt: "",
//     // endAt: "",
//   });


//   //========================== GRAPHQL ==========================
//   const [ApolloCreateSystemFreeCoinNotification, { error, data }] = useMutation(ManagerCreateCurrencyReward);
//   useEffect(() => {
//     if (data) {
//       console.log(data);
//       window.location.reload();
//     }
//     else {
//       console.log(error)
//     }
//   }, [data]);







//   const handleFormSubmit = (values: FormValues) => {
//     const startAtDateObj = new Date(startAtDate);
//     const endAtDateObj = new Date(endAtDate);

//     let startAtUnix = startAtDateObj.getTime() / 1000;
//     let endAtUnix = endAtDateObj.getTime() / 1000;

//     let nowUnix = Math.floor(Date.now() / 1000);

//     const variables: any = {
//       receiveDaysOverdue: parseInt(values.receiveDaysOverdue),
//       belongToRole: "manager",
//       belongToId: "1",
//       amount: parseInt(values.amount),
//       currencyId: "1",
//       sourceType: "direct",
//       // triggerAt: triggerAtUnix,
//       // startAt: startAtUnix,
//       // endAt: endAtUnix,
//       description: values.description,
//       limit: parseInt(values.limit),
//       comment: values.comment,
//       notification: {
//         type: "freeCoin",
//         title: values.title,
//         content: values.content,
//         // expireAt: expireAtUnix
//       },
//     }

//     //check if startAtUnix is filled
//     // if (isNaN(triggerAtUnix)) {
//     //   triggerAtUnix = nowUnix;
//     // }
//     if (isNaN(startAtUnix)) {
//       startAtUnix = nowUnix;
//     }

//     //insert startAtUnix to variables
//     // variables.triggerAt = triggerAtUnix;
//     variables.startAt = startAtUnix;

//     //insert endAtUnix to variables if it is selected
//     if (!isNaN(endAtUnix)) {
//       variables.endAt = endAtUnix;
//     }
//     // if (!isNaN(expireAtUnix)) {
//     //   variables.notification.expireAt = expireAtUnix;
//     // }

//     if (endAtUnix < startAtUnix) {
//       alert("End date must be greater than start date");
//       return;
//     }
//     // if (expireAtUnix < triggerAtUnix) {
//     //   alert("expire date must be greater than trigger date");
//     //   return;
//     // }
//     console.log(variables);

//     ApolloCreateSystemFreeCoinNotification({ variables });
//   };



//   if (modal) {
//     document.body.classList.add('active-modal')
//   } else {
//     document.body.classList.remove('active-modal')
//   }

//   return (
//     <>
//       {/* THE CONTENT OF THE BUTTON */}
//       <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "1px solid #111", borderColor: colors.blueAccent[100] }}>{btnTitle}</Button>

//       {/* CONTENT OF WHAT HAPPEN AFTER BUTTON CLICKED */}
//       {modal && (
//         <Box className="modal">
//           <Box onClick={toggleModal} className="overlay"></Box>
//           <Box className="modal-content"
//             sx={{
//               backgroundColor: colors.primary[500],
//             }}>
//             <Box m="20px">
//               <Typography variant="h2" sx={{ mb: "2rem", textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
//                 {btnTitle}
//               </Typography>

//               <Formik
//                 onSubmit={handleFormSubmit}
//                 initialValues={initialValues}
//                 validationSchema={checkoutSchema}
//               >
//                 {({
//                   values,
//                   errors,
//                   touched,
//                   handleBlur,
//                   handleChange,
//                   handleSubmit,
//                 }) => (
//                   <form onSubmit={handleSubmit}>
//                     <Box color={"black"}>
//                       <Box display={"flex"} justifyContent={"space-between"}>
//                         <TextField className="modal_input_textfield"
//                           fullWidth
//                           variant="filled"
//                           type="text"
//                           label={t('title')}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           value={values.title}
//                           name="title"
//                           error={!!touched.title && !!errors.title}
//                           helperText={touched.title && errors.title}
//                           sx={{ marginBottom: "1rem", mr: '1rem', backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
//                         />
//                         <TextField
//                           fullWidth
//                           variant="filled"
//                           type="text"
//                           label={t('description')}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           value={values.comment}
//                           name="comment"
//                           error={!!touched.comment && !!errors.comment}
//                           helperText={touched.comment && errors.comment}
//                           sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
//                         />
//                       </Box>

//                       <TextField
//                         id="outlined-multiline-flexible"
//                         multiline
//                         fullWidth
//                         maxRows={4}
//                         variant="filled"
//                         type="text"
//                         label={t('content')}
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         value={values.content}
//                         name="content"
//                         error={!!touched.content && !!errors.content}
//                         helperText={touched.content && errors.content}
//                         sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
//                       />

//                       <Box display={"flex"} justifyContent={"space-between"}>
//                         <TextField
//                           fullWidth
//                           id="datetime-local"
//                           label={t('trigger_at_time')}
//                           type="datetime-local"
//                           // defaultValue="2017-05-24T10:30"
//                           value={triggerAtDate}
//                           name="triggerAt"
//                           onChange={handleTriggerAtDateChange}
//                           sx={{ marginBottom: "1rem", mr: '1rem' }}
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                         />

//                         <TextField
//                           fullWidth
//                           id="datetime-local"
//                           label={t('expire_at_time')}
//                           type="datetime-local"
//                           // defaultValue="2017-05-24T10:30"
//                           value={expireAtDate}
//                           name="expireAt"
//                           onChange={handleExpireAtDateChange}
//                           sx={{ marginBottom: "1rem" }}
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                         />
//                       </Box>

//                       <Typography variant="h4" sx={{ m: "1rem 0", textAlign: "center", fontSize: "1rem", fontWeight: "600", color: "#cecece" }}>
//                         {t('reward')}
//                       </Typography>

//                       <TextField
//                         fullWidth
//                         variant="filled"
//                         type="text"
//                         label={t('reward_description')}
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         value={values.description}
//                         name="description"
//                         error={!!touched.description && !!errors.description}
//                         helperText={touched.description && errors.description}
//                         sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
//                       />

//                       <Box display={"flex"} justifyContent={"space-between"}>
//                         <TextField
//                           fullWidth
//                           variant="filled"
//                           type="text"
//                           label={t('amount')}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           value={values.amount}
//                           name="amount"
//                           error={!!touched.amount && !!errors.amount}
//                           helperText={touched.amount && errors.amount}
//                           sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
//                         />
//                         <TextField
//                           fullWidth
//                           variant="filled"
//                           type="text"
//                           label={t('currency_limit')}
//                           placeholder="Null是不限制 或 1~60"
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           value={values.limit}
//                           name="limit"
//                           error={!!touched.limit && !!errors.limit}
//                           helperText={touched.limit && errors.limit}
//                           sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
//                         />
//                         <TextField
//                           fullWidth
//                           variant="filled"
//                           type="number"
//                           label={t('currency_days_limit')}
//                           placeholder="Null是不限制"
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           value={values.receiveDaysOverdue}
//                           name="receiveDaysOverdue"
//                           error={!!touched.receiveDaysOverdue && !!errors.receiveDaysOverdue}
//                           helperText={touched.receiveDaysOverdue && errors.receiveDaysOverdue}
//                           sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
//                         />
//                       </Box>

//                       <Box display={"flex"} justifyContent={"space-between"}>
//                         <TextField
//                           fullWidth
//                           id="datetime-local"
//                           label={t('start_time')}
//                           type="datetime-local"
//                           // defaultValue="2017-05-24T10:30"
//                           value={startAtDate}
//                           name="startAt"
//                           onChange={handleStartAtDateChange}
//                           sx={{ marginBottom: "1rem", mr: '1rem' }}
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                         />
//                         <TextField
//                           fullWidth
//                           id="datetime-local"
//                           label={t('end_time')}
//                           type="datetime-local"
//                           // defaultValue="2017-05-24T10:30"
//                           value={endAtDate}
//                           name="endAt"
//                           onChange={handleEndAtDateChange}
//                           sx={{ marginBottom: "1rem" }}
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                         />
//                       </Box>


//                     </Box>
//                     <Box display="flex" justifyContent="center" >
//                       <button className="my-button" type="submit">{confirmTitle}</button>
//                     </Box>
//                   </form>
//                 )}
//               </Formik>
//             </Box >
//           </Box>
//         </Box>
//       )
//       }
//     </>
//   );
// }
