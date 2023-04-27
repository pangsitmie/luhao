import React, { useState, useEffect, useRef } from "react";
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, TextField, Typography, useTheme } from "@mui/material";
import { useLazyQuery, useMutation } from '@apollo/client'
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { CreateBrand } from "../../graphQL/Mutations";
// import { defaultCoverURL, defaultLogoURL, default_cover_900x300_filename, default_logo_360x360_filename } from "../../data/strings";
import LogoUpload from "../../components/Upload/LogoUpload";
import CoverUpload from "../../components/Upload/CoverUpload";
import { getImgURL } from "../../utils/Utils";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d_!@#]{6,}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  vatNumber: yup.string().required("required"),
  principalName: yup.string().required("required"),
  principalPassword: yup.string().required("required").matches(passwordRegex, "must contain at least one letter and one number, and be at least six characters long"), principalLineUrl: yup.string().required("required"),
  // principalEmail: yup.string().email("invalid email"),
  principalPhone: yup.string().required("required"),
  brandCoinName: yup.string().required("required"),
});


export default function CreateBrandModal() {
  const { t } = useTranslation();
  //THEME
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //========================== INITIAL VALUES ==========================
  const initialValues = {
    name: "",
    intro: "",
    vatNumber: "",

    principalName: "",
    principalPassword: "",
    principalLineUrl: "https://lin.ee/",
    principalEmail: "",
    principalPhone: "",
    brandCoinName: "",
  };

  // ========================== STATES AND HANDLERS ==========================
  var btnTitle = t("create_brand"), confirmTitle = t("confirm"), deleteTitle = t("delete"), banTitle = t("ban"), unbanTitle = t("unban");

  const [modal, setModal] = useState(false); //open or close modal
  const toggleModal = () => {
    setModal(!modal);
  };

  //  ========================== PASSWORD VISIBILITY ==========================
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // ========================== FILE UPLOAD ==========================
  const [logoFileName, setLogoFileName] = useState('');
  const handleUploadLogoSuccess = (name) => {
    setLogoFileName(name);
  };
  const [coverFileName, setCoverFileName] = useState('');
  const handleUploadCoverSucess = (name) => {
    setCoverFileName(name);
  };


  // ==================================================================


  //========================== GRAPHQL ==========================
  const [ApolloCreateBrand, { loading, error, data: brandData }] = useMutation(CreateBrand);
  useEffect(() => {
    if (brandData) {
      console.log(brandData.createBrand.id);
      window.location.reload();
    }
  }, [brandData]);



  // ========================== FUNCTIONS ==========================
  const handleFormSubmit = (values) => {
    console.log("SEND CREATE BRAND API REQUEST");

    const variables = {
      name: values.name,
      vatNumber: values.vatNumber,
      logo: logoFileName,
      cover: coverFileName,
      brandCoinName: values.brandCoinName,
      principal: {
        name: values.principalName,
        password: values.principalPassword,
        lineUrl: values.principalLineUrl,
        phone: {
          country: "tw",
          number: values.principalPhone
        }
      },
    };

    if (values.intro !== "") {
      variables.intro = values.intro;
    }
    if (values.principalEmail !== "") {
      variables.principal.email = values.principalEmail;
    }
    console.log(variables);
    ApolloCreateBrand({ variables });
  };

  // ========================== MODAL TOGGLE ==========================
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
        <Box className="modal" >
          <Box onClick={toggleModal} className="overlay"></Box>
          <Box className="modal-content" backgroundColor={colors.primary[500]}>
            <Box m="20px">
              <Typography variant="h2" sx={{ mb: "10px", textAlign: "center", fontSize: "1.4rem", fontWeight: "600", color: colors.grey[200] }}>
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

                      {/* UPLOAD LOGO & COVER BOX */}
                      <Box display="flex" m={"1rem 0"} gap={".5rem"}>
                        <Box width={"30%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                          {/* UPLOAD LOGO COMPONENT */}
                          <LogoUpload handleSuccess={handleUploadLogoSuccess} imagePlaceHolder={getImgURL(logoFileName, "logo")} type={"brand"} />
                        </Box>

                        <Box width={"70%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                          {/* UPLOAD COVER COMPONENET */}
                          <CoverUpload handleSuccess={handleUploadCoverSucess} imagePlaceHolder={getImgURL(coverFileName, "cover")} type={"brand"} />
                        </Box>
                      </Box>

                      <Box display={"flex"} justifyContent={"space-between"}>
                        <TextField className="modal_input_textfield"
                          fullWidth
                          variant="filled"
                          type="text"
                          label={t('brand_name')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          name="name"
                          required // add the required prop
                          error={!!touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                          sx={{ marginBottom: "1rem", mr: '1rem', backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label={t('vat_number')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.vatNumber}
                          name="vatNumber"
                          required // add the required prop
                          error={!!touched.vatNumber && !!errors.vatNumber}
                          helperText={touched.vatNumber && errors.vatNumber}
                          sx={{ margin: "0 0rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>

                      <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        fullWidth
                        maxRows={4}
                        variant="filled"
                        type="text"
                        label={`${t('intro')} ${t('optional')}`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.intro}
                        name="intro"
                        error={!!touched.intro && !!errors.intro}
                        helperText={touched.intro && errors.intro}
                        sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />

                      <Typography variant="h5" sx={{ textAlign: "left", margin: "1rem 0 .5rem 0", color: colors.grey[200] }}>{t('principal_name')}</Typography>


                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label={`${t('person_name')}`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.principalName}
                        name="principalName"
                        required // add the required prop
                        error={!!touched.principalName && !!errors.principalName}
                        helperText={touched.principalName && errors.principalName}
                        sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />

                      <Box display={"flex"} justifyContent={"space-between"} >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label={t('phone')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.principalPhone}
                          name="principalPhone"
                          required // add the required prop
                          error={!!touched.principalPhone && !!errors.principalPhone}
                          helperText={touched.principalPhone && errors.principalPhone}
                          sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label={t('line_url')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.principalLineUrl}
                          name="principalLineUrl"
                          required // add the required prop
                          error={!!touched.principalLineUrl && !!errors.principalLineUrl}
                          helperText={touched.principalLineUrl && errors.principalLineUrl}
                          sx={{ margin: "0rem 0rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>

                      <Box display={"flex"} justifyContent={"space-between"} >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label={`${t('email')} ${t('optional')}`}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.principalEmail}
                          name="principalEmail"
                          error={!!touched.principalEmail && !!errors.principalEmail}
                          helperText={touched.principalEmail && errors.principalEmail}
                          sx={{ margin: "0rem 1rem 1rem 0rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                        {/* PASSWORD INPUT */}
                        <FormControl
                          fullWidth variant="filled"
                          required // add the required prop
                          sx={{
                            marginBottom: "1rem",
                            backgroundColor: colors.primary[400], borderRadius: "5px"
                          }} >
                          <InputLabel htmlFor="filled-adornment-password">{t('password')}</InputLabel>
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

                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label={t('brand_coin_name')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.brandCoinName}
                        name="brandCoinName"
                        required // add the required prop
                        error={!!touched.brandCoinName && !!errors.brandCoinName}
                        helperText={touched.brandCoinName && errors.brandCoinName}
                        sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px" }}
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
