import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "../../components/Modal/modal.css";
import { tokens } from "../../theme";
import { UnbanMember } from "../../graphQL/Queries";
import { useLazyQuery } from "@apollo/client";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { default_logo_360x360_filename } from "../../data/strings";
import { useTranslation } from 'react-i18next';

import USER_IMG from "../../assets/user.png";
import Member from "../../types/member";

interface InitialValuesType {
  id: number;
  status: string;
  nickname: string;
  birthday: string;
  avatar: string;
  phone: string;
  continuousSignDays: string;
  totalSignDays: string;
  lastSignAt: string;
}


type Props = {
  props: Member;
}
const checkoutSchema = yup.object().shape({});

const UserListModal = ({ props }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [modal, setModal] = useState(false);

  var btnTitle = t("view"), modalTitle = t("details"), unbanTitle = t("unban");

  const initialValues: InitialValuesType = {
    id: 0,
    status: "",
    nickname: "",
    birthday: "",
    avatar: default_logo_360x360_filename,
    phone: "",
    continuousSignDays: "",
    totalSignDays: "",
    lastSignAt: "",
  };

  if (props != null) {
    initialValues.id = props.id;
    initialValues.status = props.status;
    initialValues.nickname = props.profile.nickname;

    initialValues.phone = props.phone.number;

    initialValues.continuousSignDays = props.career.continuousSignDays;
    initialValues.totalSignDays = props.career.totalSignDays;

    if (props.profile.avatar !== null) {
      initialValues.avatar = props.profile.avatar;
    }
    if (props.profile.birthday !== null) {
      initialValues.birthday = props.profile.birthday;
    }
    if (props.career.lastSignAt !== null) {
      initialValues.lastSignAt = props.career.lastSignAt;
    }
  }

  // GQL
  const [ApolloUnbanUser, { error: error1, data: data1 }] = useLazyQuery(UnbanMember);
  useEffect(() => {
    if (data1) {
      console.log(data1.getMember);
      window.location.reload();
    }
    if (error1) {
      console.log(error1);
    }
    else {
      console.log("NO DATA")
    }
  }, [data1, error1]);



  const handleFormSubmit = () => { };

  const handleUnBan = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const targetId = e.currentTarget.id;
    console.log(targetId);
    const result = window.confirm("Are you sure you want to Ban this user?");
    if (result) {
      ApolloUnbanUser({
        variables: {
          params: [
            {
              id: props.id,
              phone: {
                country: "tw",
                number: props.phone?.number ?? ""
              }
            }
          ],
          reason: "null"
        }
      })
    } else {
      console.log("not blocked");
    }
  };


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

      <Button onClick={toggleModal} className="btn-modal" sx={{ color: colors.primary[100], border: "1px solid #111", borderColor: colors.blueAccent[100] }}>{btnTitle}
      </Button>

      {/* CONTENT OF WHAT HAPPEN AFTER BUTTON CLICKED */}
      {modal && (
        <Box className="modal">
          <Box onClick={toggleModal} className="overlay"></Box>
          <Box className="modal-content"
            sx={{
              backgroundColor: colors.primary[500],
            }}>
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
                    <Box >
                      <Box display={"flex"} m={"1rem 0"}>
                        <Box width={"35%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                          <Typography variant="h2" sx={{ textAlign: "left", fontSize: "2rem", fontWeight: "600", color: "white", mt: "1rem" }}>
                            {modalTitle}
                          </Typography>
                          <Box textAlign="left">
                            {(() => {
                              if (initialValues.status === "disable") {
                                return (
                                  <Typography variant="h5" color={colors.primary[100]} sx={{ margin: ".5rem 0" }}>
                                    {t('disable')}
                                  </Typography>)
                              }
                              if (initialValues.status === "banned") {
                                return (
                                  <Typography variant="h5" color={colors.redAccent[500]} sx={{ margin: ".5rem 0" }}>
                                    {t('banned')}
                                  </Typography>)
                              }
                              else {
                                return (
                                  <Typography variant="h5" color={colors.greenAccent[500]} sx={{ margin: ".5rem 0" }}>
                                    {t('normal')}
                                  </Typography>)
                              }
                            })()}
                          </Box>
                        </Box>
                        <Box width={"65%"} display={"flex"} justifyContent={"flex-end"} >
                          <img
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={USER_IMG}
                            style={{ borderRadius: "50%" }}
                          />
                        </Box>
                      </Box>



                      <TextField className="modal_input_textfield"
                        disabled={true}
                        fullWidth
                        variant="filled"
                        type="text"
                        label={t('name')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.nickname}
                        name="username"
                        error={!!touched.nickname && !!errors.nickname}
                        helperText={touched.nickname && errors.nickname}
                        sx={{ margin: "0 1rem 1rem 0", backgroundColor: colors.primary[400], borderRadius: "5px", color: "black" }}
                      />
                      {/* PHONE */}
                      <TextField
                        disabled={true}
                        fullWidth
                        variant="filled"
                        type="text"
                        label={t('phone')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone}
                        name="phone"
                        error={!!touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                        sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />
                      <TextField
                        disabled={true}
                        fullWidth
                        variant="filled"
                        type="text"
                        label={t('birthday')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.birthday}
                        name="birthday"
                        error={!!touched.birthday && !!errors.birthday}
                        helperText={touched.birthday && errors.birthday}
                        sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                      />

                      <Box display={"flex"}>
                        <TextField
                          disabled={true}
                          fullWidth
                          variant="filled"
                          type="text"
                          label={t('consecutive_login_days')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.continuousSignDays}
                          name="continuousLoginDays"
                          error={!!touched.continuousSignDays && !!errors.continuousSignDays}
                          helperText={touched.continuousSignDays && errors.continuousSignDays}
                          sx={{ marginBottom: "1rem", mr: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                        <TextField
                          disabled={true}
                          fullWidth
                          variant="filled"
                          type="text"
                          label={t('total_login_days')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.totalSignDays}
                          name="totalSignDays"
                          error={!!touched.totalSignDays && !!errors.totalSignDays}
                          helperText={touched.totalSignDays && errors.totalSignDays}
                          sx={{ marginBottom: "1rem", mr: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                        <TextField
                          disabled={true}
                          fullWidth
                          variant="filled"
                          type="text"
                          label={t('last_login')}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastSignAt}
                          name="lastSignAt"
                          error={!!touched.lastSignAt && !!errors.lastSignAt}
                          helperText={touched.lastSignAt && errors.lastSignAt}
                          sx={{ marginBottom: "1rem", backgroundColor: colors.primary[400], borderRadius: "5px" }}
                        />
                      </Box>


                    </Box>
                    <Box display="flex" justifyContent="center" padding="1rem 0" >

                      {values.status === "banned" ? (
                        <Button onClick={handleUnBan} variant="contained" sx={{ minWidth: "100px", padding: ".5rem 1.5rem", margin: "0 1rem", borderRadius: "10px", border: "2px solid #fff" }}>
                          <Typography variant="h5" sx={{ textAlign: "center", fontSize: ".9rem", color: "white" }}>
                            {unbanTitle}
                          </Typography>
                        </Button>
                      ) : (
                        <ConfirmModal props={{ type: "member", id: props.id, phone: { country: "tw", number: props.phone.number } }} />
                      )}

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
  )
}

export default UserListModal