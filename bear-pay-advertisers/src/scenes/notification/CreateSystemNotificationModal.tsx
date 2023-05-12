import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { useMutation, DocumentNode, useQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { CreateSystemNotification, ManagerCreateCurrencyReward } from "../../graphQL/Mutations";
import { useTranslation } from 'react-i18next';
import { GetBrandList } from "../../graphQL/Queries";
import { RootState } from "../../redux/store";
import BrandType from "../../types/Brand";
import { useSelector } from "react-redux";
import { BRAND_GetBrandCurrencyList } from "../../graphQL/BrandPrincipalQueries";
// import { BRAND_CreateCurrencyReward } from "../../graphQL/BrandPrincipalMutations";
import ConfirmButton from "../../components/ConfirmButton";

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  content: yup.string().required("required"),
  comment: yup.string().required("required"), //this one is required by the api
});

interface FormValues {
  title: string;
  content: string;
  comment: string;
  rewardId: string;
  triggerAtDate: string;
  expireAtDate: string;
  currencyID: string;
  amount: string;
  receiveDaysOverdue: string;
  limit: string;
  description: string;
  rewardStatus: string;
  startAt: string;
  endAt: string;
}

export default function CreateSystemNotificationModal() {
  const { t } = useTranslation();
  const { entityName } = useSelector((state: RootState) => state.entity);

  //========================== THEME ==========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //========================== INITIAL VALUES ==========================
  const [initialValues] = useState<FormValues>({
    title: "",
    content: "",
    comment: "",
    rewardId: "",
    triggerAtDate: "",
    expireAtDate: "",
    currencyID: "",
    amount: "",
    receiveDaysOverdue: "",
    limit: "",
    description: "",
    rewardStatus: "",
    startAt: "",
    endAt: ""
  });

  // ========================== STATES AND HANDLERS ==========================
  var btnTitle = t("create"), confirmTitle = t("confirm");

  const [modal, setModal] = useState(false); //open or close modal
  const toggleModal = () => {
    setModal(!modal);
  };


  const [notificationType, setNotificationType] = useState('system');
  const handleNotificationTypeChange = (event: SelectChangeEvent<string>) => {
    setNotificationType(event.target.value);
  };

  const [rewardCheck, setCounterCheck] = useState(false);
  const handleRewardCheckChange = (event: SelectChangeEvent<string>) => {
    setCounterCheck(event.target.value === 'true' ? true : false);
  };

  const [{ brandId, brandCoinId, }, setBrandInfo] = useState<{
    brandId: string;
    brandName: string;
    brandCoinId: string;
    brandCoinName: string;
  }>({
    brandId: "-1",
    brandName: "null",
    brandCoinId: "null",
    brandCoinName: "null",
  });

  // brandListFilter is only for displaying the dropdown
  const [brandListFilter, setBrandListFilter] = useState('');
  const [brandList, setBrandList] = useState<BrandType[]>([]);

  let GET_BRAND_LIST_QUERY: DocumentNode = GetBrandList;
  // let CREATE_FREE_REWARD_MUTATION: DocumentNode = ManagerCreateCurrencyReward;

  switch (entityName) {
    case 'company':
      GET_BRAND_LIST_QUERY = GetBrandList;
      // CREATE_FREE_REWARD_MUTATION = ManagerCreateCurrencyReward;
      break;
    case 'brand':
      GET_BRAND_LIST_QUERY = BRAND_GetBrandCurrencyList;
      // CREATE_FREE_REWARD_MUTATION = BRAND_CreateCurrencyReward;
      break;
    default:
      break;
  }

  const { data: dataBrandList } = useQuery(GET_BRAND_LIST_QUERY);
  useEffect(() => {
    if (dataBrandList) {
      switch (entityName) {
        case 'company':
          // setBrandList(data1.managerGetBrands);
          setBrandList([{ id: "-1", name: '系統', currency: { id: '-1', name: "系統免費幣" }, }, ...dataBrandList.managerGetBrands]);
          break;
        case 'brand':
          setBrandList(dataBrandList.getBrandPrincipal.brands);
          break;
        default:
          break;
      }
    }
  }, [dataBrandList]);

  const handleBrandListChange = (e: SelectChangeEvent<string>) => {
    const targetId = e.target.value;
    console.log(targetId);

    //find the brand id from brand list
    const brand = brandList.find(brand => brand.id === targetId);

    if (brand) {
      setBrandListFilter(targetId);
      setBrandInfo({
        brandId: targetId.toString(),
        brandName: brand.name,
        brandCoinId: (brand.currency.id).toString(),
        brandCoinName: brand.currency.name,
      });
    }
  };



  const [triggerAtDate, setTriggerAtDate] = useState('');
  function handleTriggerAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTriggerAtDate(event.target.value);
  }

  const [expireAtDate, setExpireAtDate] = useState('');
  function handleExpireAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setExpireAtDate(event.target.value);
  }

  const [startAtDate, setStartAtDate] = useState('');
  function handleStartAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStartAtDate(event.target.value);
  }

  const [endAtDate, setEndAtDate] = useState('');
  function handleEndAtDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEndAtDate(event.target.value);
  }


  //========================== GRAPHQL ==========================
  const [ApolloCreateNotification, { data: createNotification }] = useMutation(CreateSystemNotification);
  const [ApolloSendSystemFreeCoin, { data: sendSystemFreeCoin }] = useMutation(ManagerCreateCurrencyReward);

  useEffect(() => {
    if (createNotification || sendSystemFreeCoin) {
      window.location.reload();
    }
  }, [createNotification, sendSystemFreeCoin]);


  const handleFormSubmit = (values: FormValues) => {
    const triggerAtDateObj = new Date(triggerAtDate);
    const expireAtDateObj = new Date(expireAtDate);
    const startAtDateObj = new Date(startAtDate);
    const endAtDateObj = new Date(endAtDate);

    let triggerAtUnix = triggerAtDateObj.getTime() / 1000;
    let expireAtUnix = expireAtDateObj.getTime() / 1000;
    let startAtUnix = startAtDateObj.getTime() / 1000;
    let endAtUnix = endAtDateObj.getTime() / 1000;
    let nowUnix = Math.floor(Date.now() / 1000);


    let variables: any = {};

    //if rewardCheck is false we want to send notification only
    if (!rewardCheck) {
      variables = {
        comment: values.comment,
        notification: {
          type: "system",
          title: values.title,
          content: values.content,
        }
      }

      if (isNaN(triggerAtUnix)) {
        triggerAtUnix = nowUnix;
      }
      variables.triggerAt = triggerAtUnix;

      if (!isNaN(expireAtUnix)) {
        variables.notification.expireAt = expireAtUnix;
      }

      if (expireAtUnix < triggerAtUnix) {
        alert("End date must be greater than start date");
        return;
      }

      console.log(variables);
      ApolloCreateNotification({ variables });
    }
    else {
      //fixme: if rewardCheck is true we want to send notification and reward 
      // if selectedId = 0, it means we want to send system reward
      //  belongToRole: "manager",
      //belongToId: "1",

      //if selectedId is not 0 then we want to send brand reward
      //    belongToRole: "brand",
      //belongToId: brandId,
      console.log("BRAND ID: " + brandId);
      console.log(typeof brandId);
      console.log(brandId === "-1");
      console.log(brandId !== "-1" ? "brand reward" : "system reward");


      variables = {
        receiveDaysOverdue: parseInt(values.receiveDaysOverdue),
        belongToRole: brandId === "-1" ? "manager" : "brand",
        belongToId: brandId === "-1" ? "1" : brandId,
        amount: parseInt(values.amount),
        currencyId: brandId === "-1" ? "1" : brandCoinId,
        sourceType: "direct",
        description: values.description,
        limit: parseInt(values.limit),
        comment: values.comment,
        notification: {
          type: "system",
          title: values.title,
          content: values.content,
        },
      }

      if (isNaN(triggerAtUnix)) {
        triggerAtUnix = nowUnix;
      }
      variables.triggerAt = triggerAtUnix;

      if (isNaN(startAtUnix)) {
        startAtUnix = nowUnix;
      }
      variables.startAt = startAtUnix;

      if (!isNaN(endAtUnix)) {
        variables.endAt = endAtUnix;
      }

      if (endAtUnix < startAtUnix) {
        alert("End date must be greater than start date");
        return;
      }

      if (!isNaN(expireAtUnix)) {
        variables.notification.expireAt = expireAtUnix;
      }

      if (expireAtUnix < triggerAtUnix) {
        alert("End date must be greater than start date");
        return;
      }

      console.log(variables);
      ApolloSendSystemFreeCoin({ variables });
    };
  };



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
                        label={t('comment')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.comment}
                        name="comment"
                        required
                        error={!!touched.comment && !!errors.comment}
                        helperText={touched.comment && errors.comment}
                        sx={{ marginBottom: "1rem", marginRight: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />

                      <Box display={"flex"} gap={"1rem"}>
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
                    </Box>
                    <FormControl
                      fullWidth
                      sx={{
                        marginBottom: "1rem",
                      }}>
                      <InputLabel id="demo-simple-select-label" >{t('reward')}</InputLabel>
                      <Select
                        sx={{ borderRadius: "10px", background: colors.primary[400] }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rewardCheck.toString()}
                        label={t('reward')}
                        name="rewardCheck"
                        onChange={handleRewardCheckChange}
                      >
                        <MenuItem value={"true"}>{t('yes')}</MenuItem>
                        <MenuItem value={"false"}>{t('no')}</MenuItem>
                      </Select>
                    </FormControl>

                    {/* if reward check is set to true bellow will open */}
                    {rewardCheck && (
                      <Box>
                        <Box display={"flex"} gap={"1rem"} >
                          <FormControl sx={{ minWidth: 145, height: "100%" }}>
                            <InputLabel id="demo-simple-select-label" >{t('brand_filter')}</InputLabel>
                            <Select
                              sx={{ borderRadius: "10px", background: colors.primary[400], height: "100%", width: "auto" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={brandListFilter}
                              label="brandListFilter"
                              onChange={handleBrandListChange}
                            >
                              {brandList.map((brand, i) => (
                                <MenuItem
                                  value={brand.id}
                                  key={`${i}`}
                                >
                                  {brand.id} - {brand.name} | {brand.currency.id} - {brand.currency.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>


                          <FormControl sx={{ minWidth: 145 }}>
                            <InputLabel id="demo-simple-select-label" >{t("type")}</InputLabel>
                            <Select
                              sx={{ borderRadius: "10px", background: colors.primary[400] }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={notificationType}
                              label="type"
                              onChange={handleNotificationTypeChange}
                            >
                              <MenuItem value={"system"}>System</MenuItem>
                              <MenuItem value={"brandActivity"}>Brand Activity</MenuItem>
                              <MenuItem value={"reward"}>Reward</MenuItem>
                            </Select>
                          </FormControl>

                          <TextField
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
                            required={rewardCheck}
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
                            required={rewardCheck}
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
                            required={rewardCheck}
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


                        <Box display={"flex"} justifyContent={"space-between"}>
                          <TextField
                            fullWidth
                            id="datetime-local"
                            label={t('start_time')}
                            type="datetime-local"
                            // defaultValue="2017-05-24T10:30"
                            value={startAtDate}
                            onChange={handleStartAtDateChange}
                            sx={{ marginBottom: "1rem", mr: '1rem' }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <TextField
                            fullWidth
                            id="datetime-local"
                            label={t('end_time')}
                            type="datetime-local"
                            // defaultValue="2017-05-24T10:30"
                            value={endAtDate}
                            onChange={handleEndAtDateChange}
                            sx={{ marginBottom: "1rem" }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Box>
                      </Box>
                    )
                    }

                    <Box display="flex" justifyContent="center" >
                      <ConfirmButton title={confirmTitle} />
                    </Box>
                  </form>
                )}
              </Formik>
            </Box >
          </Box>
        </Box >
      )
      }
    </>
  );
}
