// import { useState, useEffect } from "react";
// import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
// import { useQuery, useMutation, DocumentNode } from '@apollo/client'
// import { Formik } from "formik";
// import * as yup from "yup";
// import "../../components/Modal/modal.css";
// import { tokens } from "../../theme";
// import { ManagerCreateCurrencyReward } from "../../graphQL/Mutations";
// import { GetBrandList } from "../../graphQL/Queries";
// import { BRAND_CreateCurrencyReward } from "../../graphQL/BrandPrincipalMutations";
// import { useSelector } from "react-redux";
// import { BRAND_GetBrandCurrencyList } from "../../graphQL/BrandPrincipalQueries";
// import { useTranslation } from 'react-i18next';
// import { RootState } from "../../redux/store";
// import BrandType from "../../types/Brand";

// interface FormValues {
//   title: string;
//   content: string;
//   comment: string;
//   rewardId: string;
//   triggerAtDate: string;
//   expireAtDate: string;
//   currencyID: string;
//   currencyName: string;
//   currencyAmount: string;
//   receiveDaysOverdue: string;
//   rewardLimit: string;
//   rewardDescription: string;
//   rewardStatus: string;
//   startAt: string;
//   endAt: string;
// }


// const checkoutSchema = yup.object().shape({
//   title: yup.string().required("required"),
//   content: yup.string().required("required"),
//   comment: yup.string().required("required"),

//   // triggerAt: yup.string().required("required"),
//   // expireAt: yup.string().required("required"),

//   currencyAmount: yup.number().required("required"),
//   receiveDaysOverdue: yup.number().required("required"),
//   rewardLimit: yup.number().required("required"),
//   rewardDescription: yup.string().required("required"),

//   // startAt: yup.string().required("required"),
//   // endAt: yup.string().required("required"),
// });


// export default function CreateBrandCoinModal() {
//   const { t } = useTranslation();
//   const { entityName } = useSelector((state: RootState) => state.entity);

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
//     rewardId: "",
//     triggerAtDate: "",
//     expireAtDate: "",
//     currencyID: "",
//     currencyName: "",
//     currencyAmount: "",
//     receiveDaysOverdue: "",
//     rewardLimit: "",
//     rewardDescription: "",
//     rewardStatus: "",
//     startAt: "",
//     endAt: "",
//   });

//   //========================== GRAPHQL ==========================

//   let GET_BRAND_LIST_QUERY: DocumentNode = GetBrandList;
//   let CREATE_FREE_REWARD_MUTATION: DocumentNode = ManagerCreateCurrencyReward;

//   switch (entityName) {
//     case 'company':
//       GET_BRAND_LIST_QUERY = GetBrandList;
//       CREATE_FREE_REWARD_MUTATION = ManagerCreateCurrencyReward;
//       break;
//     case 'brand':
//       GET_BRAND_LIST_QUERY = BRAND_GetBrandCurrencyList;
//       CREATE_FREE_REWARD_MUTATION = BRAND_CreateCurrencyReward;
//       break;
//     default:
//       break;
//   }

//   const [ApolloCreateBrandFreeCoinNotification, { data }] = useMutation(CREATE_FREE_REWARD_MUTATION);
//   useEffect(() => {
//     if (data) {
//       window.location.reload();
//     }
//   }, [data]);


//   const { data: data1 } = useQuery(GET_BRAND_LIST_QUERY);
//   useEffect(() => {
//     if (data1) {
//       switch (entityName) {
//         case 'company':
//           setBrandList(data1.managerGetBrands);
//           break;
//         case 'brand':
//           setBrandList(data1.getBrandPrincipal.brands);
//           break;
//         default:
//           break;
//       }
//     }
//   }, [data1]);

//   const [{ brandId, brandName, brandCoinId, brandCoinName }, setBrandInfo] = useState({
//     brandId: "null",
//     brandName: "null",
//     brandCoinId: "null",
//     brandCoinName: "null",
//   });
//   const [brandListFilter, setBrandListFilter] = useState('');
//   const [brandList, setBrandList] = useState<BrandType[]>([]);

//   const handleBrandListChange = (e: SelectChangeEvent<string>) => {
//     const targetId = e.target.value;
//     console.log(targetId);

//     //find the brand id from brand list
//     const brand = brandList.find(brand => brand.id === targetId);

//     if (brand) {
//       setBrandListFilter(targetId);
//       setBrandInfo({
//         brandId: targetId,
//         brandName: brand.name,
//         brandCoinId: (brand.currency.id).toString(),
//         brandCoinName: brand.currency.name,
//       });
//       console.log(brand);
//     }
//   };



//   const handleFormSubmit = (values: FormValues) => {
//     const triggerAtDateObj = new Date(triggerAtDate);
//     const expireAtDateObj = new Date(expireAtDate);
//     const startAtDateObj = new Date(startAtDate);
//     const endAtDateObj = new Date(endAtDate);

//     let triggerAtUnix = triggerAtDateObj.getTime() / 1000;
//     let expireAtUnix = expireAtDateObj.getTime() / 1000;
//     let startAtUnix = startAtDateObj.getTime() / 1000;
//     let endAtUnix = endAtDateObj.getTime() / 1000;

//     let nowUnix = Math.floor(Date.now() / 1000);

//     console.log("BRAND INFO" + brandId + brandName + brandCoinId + brandCoinName)

//     const variables: any = {
//       receiveDaysOverdue: parseInt(values.receiveDaysOverdue),
//       belongToRole: "brand",
//       belongToId: brandId,
//       amount: parseInt(values.currencyAmount),
//       currencyId: brandCoinId,
//       sourceType: "direct",
//       description: values.rewardDescription,
//       limit: parseInt(values.rewardLimit),
//       comment: values.comment,
//       notification: {
//         type: "freeCoin",
//         title: values.title,
//         content: values.content,
//         // expireAt: expireAtUnix
//       }
//     }

//     //check if startAtUnix is filled
//     if (isNaN(triggerAtUnix)) {
//       triggerAtUnix = nowUnix;
//     }
//     if (isNaN(startAtUnix)) {
//       startAtUnix = nowUnix;
//     }

//     //insert startAtUnix to variables
//     variables.triggerAt = triggerAtUnix;
//     variables.startAt = startAtUnix;

//     //insert endAtUnix to variables if it is selected
//     if (!isNaN(endAtUnix)) {
//       variables.endAt = endAtUnix;
//     }
//     if (!isNaN(expireAtUnix)) {
//       variables.notification.expireAt = expireAtUnix;
//     }

//     if (endAtUnix < startAtUnix) {
//       alert("End date must be greater than start date");
//       return;
//     }
//     if (expireAtUnix < triggerAtUnix) {
//       alert("expire date must be greater than trigger date");
//       return;
//     }
//     console.log(variables);

//     ApolloCreateBrandFreeCoinNotification({ variables });

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
//               <Typography variant="h2" sx={{ mb: "2rem", textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: "white" }}>
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



//                       <Box display={"flex"} justifyContent={"space-between"}>
//                         <FormControl sx={{ minWidth: 165, height: "100%" }}>
//                           <InputLabel id="demo-simple-select-label" >{t('brand_filter')}</InputLabel>
//                           <Select
//                             sx={{ borderRadius: "10px", background: colors.primary[400], height: "100%", width: "auto" }}
//                             labelId="demo-simple-select-label"
//                             id="demo-simple-select"
//                             value={brandListFilter}
//                             label="brandListFilter"
//                             onChange={handleBrandListChange}
//                           >
//                             {brandList.map((brand, i) => (
//                               <MenuItem
//                                 value={brand.id}
//                                 key={`${i}`}
//                               >
//                                 {brand.id} - {brand.name} - {brand.currency.id} - {brand.currency.name}
//                               </MenuItem>
//                             ))}
//                           </Select>
//                         </FormControl>

//                         <TextField
//                           fullWidth
//                           variant="filled"
//                           type="text"
//                           label={t('reward_description')}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           value={values.rewardDescription}
//                           name="rewardDescription"
//                           error={!!touched.rewardDescription && !!errors.rewardDescription}
//                           helperText={touched.rewardDescription && errors.rewardDescription}
//                           sx={{ margin: "0rem 0rem 1rem 1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
//                         />
//                       </Box>

//                       <Box display={"flex"} justifyContent={"space-between"}>
//                         <TextField
//                           fullWidth
//                           variant="filled"
//                           type="text"
//                           label={t('amount')}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           value={values.currencyAmount}
//                           name="currencyAmount"
//                           error={!!touched.currencyAmount && !!errors.currencyAmount}
//                           helperText={touched.currencyAmount && errors.currencyAmount}
//                           sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
//                         />
//                         <TextField
//                           fullWidth
//                           variant="filled"
//                           type="text"
//                           label={t('currency_limit')}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           value={values.rewardLimit}
//                           name="rewardLimit"
//                           error={!!touched.rewardLimit && !!errors.rewardLimit}
//                           helperText={touched.rewardLimit && errors.rewardLimit}
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
//                           onChange={handleEndAtDateChange}
//                           sx={{ marginBottom: "1rem" }}
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                         />
//                       </Box>


//                     </Box>
//                     <Box display="flex" justifyContent="center" >
//                       <Button className="my-button" type="submit">{confirmTitle}</Button>
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
