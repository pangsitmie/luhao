import React, { useState, useEffect, useRef } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { useQuery, useLazyQuery } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { GetBrand, UpdateBrand, RemoveBrand, UnbanBrand, } from "../../graphQL/Queries";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { getImgURL, replaceNullWithEmptyString } from "../../utils/Utils";
import { default_cover_900x300_filename, default_logo_360x360_filename } from "../../data/strings";
import LogoUpload from "../../components/Upload/LogoUpload";
import CoverUpload from "../../components/Upload/CoverUpload";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_!@#]{6,}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  // intro: yup.string().required("required"),
  principalName: yup.string().required("required"),
  principalLineUrl: yup.string().required("required"),
  principalPassword: yup.string().matches(passwordRegex, "must contain at least one letter and one number, and be at least six characters long"), principalLineUrl: yup.string().required("required"),

  vatNumber: yup.string().required("required"),
  brandCoinName: yup.string().required("required"),
});


export default function BrandListModal({ props }) {
  //========================== THEME ==========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //========================== INITIAL VALUES ==========================
  const [initialValues, setInitialValues] = useState({
    id: -1,
    status: "",
    statusDesc: "",
    name: "",
    intro: "",
    principalName: "",
    principaPhone: "",
    principalPassword: "",
    principalLineUrl: "",
    principalEmail: "",
    vatNumber: "",
    brandCoinName: "",
  });

  // ========================== STATES AND HANDLERS ==========================
  var btnTitle = "修改", confirmTitle = "更新", deleteTitle = "移除", banTitle = "封鎖", unbanTitle = "解封";

  const [modal, setModal] = useState(false); //open or close modal
  const toggleModal = () => {
    setModal(!modal);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [status, setStatus] = useState('disable');
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  //========================== GRAPHQL ==========================

  // ============ UPDATE BRAND ============
  const [ApolloUpdateBrand, { loading: loadingUpdate, error: errorUpdate, data: dataUpdate }] = useLazyQuery(UpdateBrand);
  // ============ REMOVE BRAND ============
  const [ApolloRemoveBrand, { loading: loadingRemove, error: errorRemove, data: dataRemove }] = useLazyQuery(RemoveBrand);
  const handleDelete = (e) => {
    var result = window.confirm("Are you sure you want to delete this brand?");
    if (result) {
      ApolloRemoveBrand({
        variables: {
          args: [
            {
              id: props.id
            }
          ]
        }
      })
    }
  };
  // ============ UNBAN BRAND ============
  const [ApolloUnBanMachine, { loading: loadingUnBan, error: errorUnBan, data: dataUnBan }] = useLazyQuery(UnbanBrand);
  const handleUnBan = (e) => {
    var result = window.confirm("Are you sure you want to unban this machine?");
    if (result) {
      ApolloUnBanMachine({
        variables: {
          args: [
            {
              id: props.id
            }
          ],
        }
      })
    }
  }

  useEffect(() => {
    if (dataUpdate) {
      window.location.reload();
    }
    if (dataRemove) {
      window.location.reload();
    }
    if (dataUnBan) {
      window.location.reload();
    }
  }, [dataUpdate, dataRemove, dataUnBan]);

  const handleFormSubmit = (values) => {
    const variables = {
      args: [
        {
          id: values.id
        }
      ],
      name: values.name,
      vatNumber: values.vatNumber,
      logo: logoFileName,
      cover: coverFileName,
      principal: {
        name: values.principalName,
        lineUrl: values.principalLineUrl,
      },
      currencyName: values.brandCoinName,
    };
    if (values.intro !== "") {
      variables.intro = values.intro;
    }
    if (values.principalEmail !== "") {
      variables.principal.email = values.principalEmail;
    }
    if (values.principalPassword !== "") {
      variables.principal.password = values.principalPassword;
    }
    if (initialValues.status !== "banned") {
      variables.statusId = status;
    }

    ApolloUpdateBrand({ variables });
  };

  // INITIAL VALUES FROM GET BRAND QUERY
  const { loading: loadingInit, error: errorInit, data: dataInit } = useQuery(GetBrand
    , {
      variables: {
        args: [
          {
            id: props.id
          }
        ],
      }
    }
  );
  useEffect(() => {
    if (dataInit) {
      const nonNullData = replaceNullWithEmptyString(dataInit.getBrand[0]);

      setInitialValues({
        id: props.id,
        status: nonNullData.status.name,
        name: nonNullData.name,
        vatNumber: nonNullData.vatNumber,
        intro: nonNullData.intro,
        principalName: nonNullData.principal.name,
        principaPhone: nonNullData.principal.phone.number,
        principalLineUrl: nonNullData.principal.lineUrl,
        principalEmail: nonNullData.principal.email,
        //password doesnt have initial value
        brandCoinName: nonNullData.currency.name,
      });

      if (nonNullData.logo !== null || (nonNullData.logo !== "null")) {
        setLogoFileName(nonNullData.logo);
      }
      if (nonNullData.cover !== null || (nonNullData.cover !== "null")) {
        setCoverFileName(nonNullData.cover);
      }
      //set status only if not banned
      if (nonNullData.status.name !== "banned") {
        setStatus(nonNullData.status.name)
      }

    }
  }, [dataInit]);

  // =========================== FILE UPLOAD ===========================
  const [logoFileName, setLogoFileName] = useState(default_logo_360x360_filename);
  const handleUploadLogoSuccess = (name) => {
    setLogoFileName(name);
  };

  const [coverFileName, setCoverFileName] = useState(default_cover_900x300_filename);
  const handleUploadCoverSucess = (name) => {
    setCoverFileName(name);
  };

  //========================== RENDER ==========================
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
                    <Box>
                      <Typography variant="h2" sx={{ textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
                        {btnTitle}
                      </Typography>

                      <Box textAlign="center" display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        {(() => {
                          if (initialValues.status === "disable") {
                            return (
                              <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem .5rem" }}>
                                停用
                              </Typography>)
                          }
                          if (initialValues.status === "banned") {
                            return (
                              <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                封鎖
                              </Typography>)
                          }
                          else {
                            return (
                              <Typography variant="h5" color={colors.greenAccent[500]} sx={{ margin: ".5rem .5rem" }}>
                                正常
                              </Typography>)
                          }
                        })()}
                      </Box>

                      {/* UPLOAD LOGO & COVER BOX */}
                      <Box display="flex" m={"1rem 0"} >
                        <Box width={"35%"}>
                          {/* UPLOAD LOGO COMPONENT */}
                          <LogoUpload handleSuccess={handleUploadLogoSuccess} imagePlaceHolder={getImgURL(logoFileName, "logo")} type={"brand"} />
                        </Box>

                        <Box width={"65%"}>
                          {/* UPLOAD COVER COMPONENET */}
                          <CoverUpload handleSuccess={handleUploadCoverSucess} imagePlaceHolder={getImgURL(coverFileName, "cover")} type={"brand"} />
                        </Box>
                      </Box>

                      <Box display={"flex"} justifyContent={"space-between"}>

                        <TextField className="modal_input_textfield"
                          fullWidth
                          variant="filled"
                          type="text"
                          label="品牌名稱"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          name="name"
                          error={!!touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                          sx={{ marginBottom: "1rem", mr: '1rem', backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="統一編號"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.vatNumber}
                          name="vatNumber"
                          error={!!touched.vatNumber && !!errors.vatNumber}
                          helperText={touched.vatNumber && errors.vatNumber}
                          sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />

                        <FormControl sx={{ minWidth: 150 }}>
                          <InputLabel id="demo-simple-select-label" >{initialValues.status}</InputLabel>
                          <Select
                            disabled={initialValues.status === "banned"}
                            sx={{ borderRadius: "10px", background: colors.primary[400] }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="status"
                            onChange={handleStatusChange}
                          >
                            <MenuItem value={"normal"}>正常</MenuItem>
                            <MenuItem value={"disable"}>停用</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        fullWidth
                        maxRows={4}
                        variant="filled"
                        type="text"
                        label="品牌簡介"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.intro}
                        name="intro"
                        error={!!touched.intro && !!errors.intro}
                        helperText={touched.intro && errors.intro}
                        sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />
                      <Box display={"flex"} justifyContent={"space-between"} >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="負責人"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.principalName}
                          name="principalName"
                          error={!!touched.principalName && !!errors.principalName}
                          helperText={touched.principalName && errors.principalName}
                          sx={{ marginBottom: "1rem", mr: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />

                        {/* PASSWORD INPUT */}
                        <FormControl fullWidth variant="filled" sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }} >
                          <InputLabel htmlFor="filled-adornment-password">負責人密碼 (不必要)</InputLabel>
                          <FilledInput
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.principalPassword}
                            name="principalPassword"
                            error={!!touched.principalPassword && !!errors.principalPassword}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <FormHelperText error={!!touched.principalPassword && !!errors.principalPassword}>
                            {touched.principalPassword && errors.principalPassword}
                          </FormHelperText>
                        </FormControl>
                      </Box>

                      <Box display={"flex"} justifyContent={"space-between"} >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="負責人Line"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.principalLineUrl}
                          name="principalLineUrl"
                          error={!!touched.principalLineUrl && !!errors.principalLineUrl}
                          helperText={touched.principalLineUrl && errors.principalLineUrl}
                          sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                        <TextField
                          disabled={true}
                          fullWidth
                          variant="filled"
                          type="text"
                          label="負責人手機"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.principaPhone}
                          name="principaPhone"
                          error={!!touched.principaPhone && !!errors.principaPhone}
                          helperText={touched.principaPhone && errors.principaPhone}
                          sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />

                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="負責人電子信箱"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.principalEmail}
                          name="principalEmail"
                          error={!!touched.principalEmail && !!errors.principalEmail}
                          helperText={touched.principalEmail && errors.principalEmail}
                          sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="品牌專屬幣名稱"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.brandCoinName}
                        name="brandCoinName"
                        error={!!touched.brandCoinName && !!errors.brandCoinName}
                        helperText={touched.brandCoinName && errors.brandCoinName}
                        sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />
                    </Box>
                    <Box display="flex" justifyContent="center" >
                      <Button onClick={handleDelete} id={values.id} variant="contained" sx={{
                        backgroundColor: colors.primary[400], minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #fff",
                        ':hover': {
                          bgcolor: colors.grey[300],
                          border: '1px solid' + colors.primary[800],
                          color: "white"
                        }
                      }}>
                        <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.primary[100] }}>
                          {deleteTitle}
                        </Typography>
                      </Button>

                      {values.status === "banned" ? (
                        <Button onClick={handleUnBan} id={values.id} variant="contained" sx={{
                          backgroundColor: colors.primary[400], minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #fff"
                        }}>
                          <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                            {unbanTitle}
                          </Typography>
                        </Button>
                      ) : (
                        <ConfirmModal props={{ type: "brand", id: props.id }} />
                      )}



                      <Button type="submit" color="success" sx={{
                        minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", background: colors.grey[100],
                        ':hover': {
                          bgcolor: colors.grey[300],
                          border: '1px solid' + colors.grey[800],
                        }
                      }}>
                        <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: colors.grey[800] }}>
                          {confirmTitle}
                        </Typography>
                      </Button>
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
